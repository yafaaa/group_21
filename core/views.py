from django.shortcuts import render, redirect
from django.views import generic
from django.contrib import messages
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.http import JsonResponse
from django.conf import settings
from django.urls import reverse_lazy
import csv
import io
import re
from django.contrib.auth import get_user_model
from django.db import transaction
from . import models
from . import forms

User = get_user_model()


# Role checking functions
def is_admin(user):
    return user.is_authenticated and user.role == User.ROLE_ADMIN

def is_mentor(user):
    return user.is_authenticated and user.role == User.ROLE_MENTOR

def is_student(user):
    return user.is_authenticated and user.role == User.ROLE_STUDENT

def is_cafe_staff(user):
    return user.is_authenticated and user.role == User.ROLE_CAFE

def is_admin_or_mentor(user):
    return user.is_authenticated and user.role in [User.ROLE_ADMIN, User.ROLE_MENTOR]

def can_record_attendance(user):
    """Check if user can record attendance (admin, mentor, or cafe staff)"""
    return user.is_authenticated and user.role in [User.ROLE_ADMIN, User.ROLE_MENTOR, User.ROLE_CAFE]


# Authentication Views
class CustomLoginView(generic.FormView):
    """Custom login view with role-based redirection"""
    template_name = 'core/auth/login.html'
    form_class = forms.CustomLoginForm
    
    def form_valid(self, form):
        user = form.get_user()
        if user is None:
            messages.error(self.request, 'Invalid login credentials.')
            return redirect('core:login')
            
        login(self.request, user)
        
        # Role-based redirection
        if user.role == User.ROLE_ADMIN:
            return redirect('core:admin_dashboard')
        elif user.role == User.ROLE_MENTOR:
            return redirect('core:mentor_dashboard')
        elif user.role == User.ROLE_STUDENT:
            return redirect('core:student_dashboard')
        elif user.role == User.ROLE_CAFE:
            return redirect('core:cafe_dashboard')
        else:
            return redirect('core:index')
    
    def get(self, request, *args, **kwargs):
        # Redirect if already logged in
        if request.user.is_authenticated:
            user = request.user
            # Role-based redirection for already authenticated users
            if user.role == User.ROLE_ADMIN:
                return redirect('core:admin_dashboard')
            elif user.role == User.ROLE_MENTOR:
                return redirect('core:mentor_dashboard')
            elif user.role == User.ROLE_STUDENT:
                return redirect('core:student_dashboard')
            elif user.role == User.ROLE_CAFE:
                return redirect('core:cafe_dashboard')
            else:
                return redirect('core:index')
        return super().get(request, *args, **kwargs)


class CustomLogoutView(generic.View):
    """Custom logout view"""
    def get(self, request):
        logout(request)
        messages.success(request, 'You have been logged out successfully.')
        return redirect('core:login')


class UserRegistrationView(generic.CreateView):
    """User registration view"""
    model = User
    form_class = forms.UserRegistrationForm
    template_name = 'core/auth/register.html'
    success_url = reverse_lazy('core:login')
    
    def form_valid(self, form):
        response = super().form_valid(form)
        messages.success(self.request, 'Account created successfully! You can now log in.')
        return response


# Role-based Dashboard Views
class AdminDashboardView(UserPassesTestMixin, generic.TemplateView):
    """Admin dashboard with system overview"""
    template_name = 'core/dashboards/admin_dashboard.html'
    
    def test_func(self):
        return is_admin(self.request.user)
    
    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        from django.utils import timezone
        today = timezone.now().date()
        
        # Calculate absent students for today
        all_students = models.Student.objects.select_related('user').prefetch_related('departments').all()
        students_with_attendance_today = models.Attendance.objects.filter(
            date=today
        ).values_list('student_id', flat=True).distinct()
        
        # Get absent students (limit to 10 for dashboard)
        absent_students = []
        for student in all_students:
            if student.id not in students_with_attendance_today:
                absent_students.append(student)
                if len(absent_students) >= 10:  # Limit to 10 for dashboard
                    break
        
        ctx.update({
            'total_students': models.Student.objects.count(),
            'total_mentors': models.Mentor.objects.count(),
            'total_departments': models.Department.objects.count(),
            'total_dorms': models.Dorm.objects.count(),
            'recent_absent': absent_students,  # Changed from recent_attendance to recent_absent
            'recent_students': models.Student.objects.select_related('user').order_by('-id')[:10],
            'dorm_occupancy': self._get_dorm_occupancy(),
            'meal_stats': self._get_meal_stats(),
            'date': today,
        })
        return ctx
    
    def _get_dorm_occupancy(self):
        dorms = models.Dorm.objects.all().prefetch_related('students__user')
        dorm_data = []
        for index, dorm in enumerate(dorms):
            # Generate room number starting from 100
            room_number = 100 + index
            students = [
                {
                    'name': student.user.get_full_name(),
                    'student_id': student.student_id
                }
                for student in dorm.students.all()
            ]
            dorm_data.append({
                'name': dorm.name,
                'room_number': room_number,
                'occupancy': dorm.current_occupancy(),
                'capacity': dorm.capacity,
                'is_full': dorm.is_full(),
                'students': students
            })
        return dorm_data
    
    def _get_meal_stats(self):
        from django.utils import timezone
        today = timezone.now().date()
        
        meal_stats = {}
        for meal_type, _ in models.Attendance.MEAL_CHOICES:
            count = models.Attendance.objects.filter(
                date=today,
                attendance_type=models.Attendance.TYPE_MEAL,
                meal_type=meal_type
            ).count()
            meal_stats[meal_type] = count
        
        return meal_stats


class MentorDashboardView(UserPassesTestMixin, generic.TemplateView):
    """Mentor dashboard for student management"""
    template_name = 'core/dashboards/mentor_dashboard.html'
    
    def test_func(self):
        return is_mentor(self.request.user)
    
    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        from django.utils import timezone
        today = timezone.now().date()
        
        # Get mentor's departments and students
        try:
            mentor = self.request.user.mentor_profile
            departments = mentor.departments.all()
            students = models.Student.objects.filter(departments__in=departments).distinct()
        except:
            departments = models.Department.objects.none()
            students = models.Student.objects.none()
        
        # Calculate absent students from mentor's departments
        students_with_attendance_today = models.Attendance.objects.filter(
            date=today,
            student__in=students
        ).values_list('student_id', flat=True).distinct()
        
        # Get absent students (limit to 10 for dashboard)
        absent_students = []
        for student in students.select_related('user').prefetch_related('departments'):
            if student.id not in students_with_attendance_today:
                absent_students.append(student)
                if len(absent_students) >= 10:  # Limit to 10 for dashboard
                    break
        
        ctx.update({
            'mentor_departments': departments,
            'mentor_students': students.select_related('user')[:20],
            'recent_absent': absent_students,  # Changed from recent_attendance to recent_absent
            'student_count': students.count(),
        })
        return ctx


class StudentDashboardView(UserPassesTestMixin, generic.TemplateView):
    """Student dashboard with personal information"""
    template_name = 'core/dashboards/student_dashboard.html'
    
    def test_func(self):
        return is_student(self.request.user)
    
    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        
        try:
            student = self.request.user.student_profile
            ctx.update({
                'student': student,
                'student_departments': student.departments.all(),
                'recent_attendance': student.attendances.order_by('-date')[:10],
                'dorm': student.dorm,
                'dorm_mates': student.dorm.students.exclude(id=student.id).select_related('user') if student.dorm else None,
            })
        except:
            pass
        
        return ctx


class CafeDashboardView(UserPassesTestMixin, generic.TemplateView):
    """Cafe assistant dashboard for meal management"""
    template_name = 'core/dashboards/cafe_dashboard.html'
    
    def test_func(self):
        return is_cafe_staff(self.request.user)
    
    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        from django.utils import timezone
        today = timezone.now().date()
        
        # Today's meal statistics
        meal_stats = {}
        for meal_type, meal_name in models.Attendance.MEAL_CHOICES:
            count = models.Attendance.objects.filter(
                date=today,
                attendance_type=models.Attendance.TYPE_MEAL,
                meal_type=meal_type
            ).count()
            meal_stats[meal_type] = {
                'name': meal_name,
                'count': count
            }
        
        ctx.update({
            'today_date': today,
            'meal_stats': meal_stats,
            'total_students': models.Student.objects.count(),
            'recent_meal_attendance': models.Attendance.objects.filter(
                attendance_type=models.Attendance.TYPE_MEAL,
                date=today
            ).select_related('student__user').order_by('-created_at')[:15],
        })
        return ctx


# Small, human-written views to browse the backend data without the API.
# I keep these intentionally simple so you can extend them with forms later.
class IndexView(generic.View):
	"""Redirect to login page - no public homepage"""
	
	def get(self, request, *args, **kwargs):
		# If user is authenticated, redirect to their dashboard
		if request.user.is_authenticated:
			user = request.user
			if user.role == User.ROLE_ADMIN:
				return redirect('core:admin_dashboard')
			elif user.role == User.ROLE_MENTOR:
				return redirect('core:mentor_dashboard')
			elif user.role == User.ROLE_STUDENT:
				return redirect('core:student_dashboard')
			elif user.role == User.ROLE_CAFE:
				return redirect('core:cafe_dashboard')
		
		# If not authenticated, redirect to login
		return redirect('core:login')


class DepartmentListView(LoginRequiredMixin, generic.ListView):
	model = models.Department
	template_name = 'core/departments_list.html'
	context_object_name = 'departments'


class DepartmentDetailView(LoginRequiredMixin, generic.DetailView):
	model = models.Department
	template_name = 'core/department_detail.html'
	context_object_name = 'department'


class StudentListView(UserPassesTestMixin, generic.ListView):
	model = models.Student
	template_name = 'core/students_list.html'
	context_object_name = 'students'
	queryset = models.Student.objects.select_related('user')
	
	def test_func(self):
		return can_record_attendance(self.request.user)


class MentorListView(UserPassesTestMixin, generic.ListView):
	model = models.Mentor
	template_name = 'core/mentors_list.html'
	context_object_name = 'mentors'
	queryset = models.Mentor.objects.select_related('user', 'department')
	
	def test_func(self):
		return is_admin(self.request.user)


class AttendanceListView(UserPassesTestMixin, generic.TemplateView):
	template_name = 'core/attendance_list.html'
	
	def test_func(self):
		return can_record_attendance(self.request.user)
	
	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		from django.utils import timezone
		today = timezone.now().date()
		
		# Get all students with their departments
		all_students = models.Student.objects.select_related('user').prefetch_related('departments').all()
		
		# Get students who have any attendance record today
		students_with_attendance_today = models.Attendance.objects.filter(
			date=today
		).values_list('student_id', flat=True).distinct()
		
		# Find students who did NOT attend (no attendance records today)
		absent_students = []
		for student in all_students:
			if student.id not in students_with_attendance_today:
				absent_students.append({
					'student': student,
					'date': today,
					'status': 'Absent'
				})
		
		context['absent_students'] = absent_students
		context['date'] = today
		context['total_students'] = all_students.count()
		context['absent_count'] = len(absent_students)
		context['present_count'] = len(students_with_attendance_today)
		
		return context


# Create / Update views
class DepartmentCreateView(UserPassesTestMixin, generic.CreateView):
	model = models.Department
	form_class = forms.DepartmentForm
	template_name = 'core/department_form.html'
	success_url = '/departments/'
	
	def test_func(self):
		return is_admin(self.request.user)


class DepartmentUpdateView(UserPassesTestMixin, generic.UpdateView):
	model = models.Department
	form_class = forms.DepartmentForm
	template_name = 'core/department_form.html'
	success_url = '/departments/'
	
	def test_func(self):
		return is_admin(self.request.user)


class StudentCreateView(UserPassesTestMixin, generic.CreateView):
	model = models.Student
	form_class = forms.StudentForm
	template_name = 'core/student_form.html'
	success_url = '/students/'
	
	def test_func(self):
		return is_admin_or_mentor(self.request.user)


class StudentUpdateView(UserPassesTestMixin, generic.UpdateView):
	model = models.Student
	form_class = forms.StudentForm
	template_name = 'core/student_form.html'
	success_url = '/students/'
	
	def test_func(self):
		return is_admin_or_mentor(self.request.user)


class CSVImportView(UserPassesTestMixin, generic.FormView):
	"""View for importing students from CSV files"""
	template_name = 'core/csv_import.html'
	form_class = forms.CSVImportForm
	success_url = '/csv-import/'
	
	def test_func(self):
		return is_admin(self.request.user)

	def form_valid(self, form):
		csv_file = form.cleaned_data['csv_file']
		department = form.cleaned_data['department']
		preview_only = form.cleaned_data['preview_only']

		try:
			# Process the CSV file
			results = self._process_csv_file(csv_file, department, preview_only)
			
			if preview_only:
				# Return preview data as JSON for AJAX requests
				if self.request.headers.get('Accept') == 'application/json':
					return JsonResponse({
						'success': True,
						'preview': True,
						'data': results
					})
				else:
					# Render template with preview data
					return render(self.request, self.template_name, {
						'form': form,
						'preview_results': results,
						'preview_mode': True
					})
			else:
				# Actually import the students
				success_count = results['success_count']
				error_count = results['error_count']
				
				if success_count > 0:
					messages.success(
						self.request,
						f'Successfully imported {success_count} students.'
					)
				if error_count > 0:
					messages.warning(
						self.request,
						f'{error_count} students could not be imported (see details below).'
					)
				
				return render(self.request, self.template_name, {
					'form': forms.CSVImportForm(),  # Fresh form
					'import_results': results,
					'preview_mode': False
				})

		except Exception as e:
			messages.error(self.request, f'Error processing CSV file: {str(e)}')
			return self.form_invalid(form)

	def _process_csv_file(self, csv_file, department, preview_only):
		"""Process the uploaded CSV file and return results"""
		# Read CSV content
		csv_content = csv_file.read().decode('utf-8-sig')  # Handle BOM if present
		csv_reader = csv.reader(io.StringIO(csv_content))
		
		results = {
			'students': [],
			'errors': [],
			'success_count': 0,
			'error_count': 0,
			'preview_mode': preview_only
		}

		# Skip header if it looks like one
		first_row = None
		try:
			first_row = next(csv_reader)
			if first_row and first_row[0].lower().strip() in ['full name', 'name', 'student name', 'full_name']:
				pass  # Skip header row
			else:
				# Process first row as data
				csv_reader = csv.reader(io.StringIO(csv_content))  # Reset reader
		except StopIteration:
			pass

		row_num = 0
		if not preview_only:
			# Use transaction for actual imports
			with transaction.atomic():
				for row in csv_reader:
					row_num += 1
					if not row or not row[0].strip():
						continue
					
					self._process_row(row, row_num, department, preview_only, results)
		else:
			# No transaction needed for preview
			for row in csv_reader:
				row_num += 1
				if not row or not row[0].strip():
					continue
				
				self._process_row(row, row_num, department, preview_only, results)

		return results

	def _process_row(self, row, row_num, department, preview_only, results):
		"""Process a single CSV row"""
		full_name = row[0].strip()
		
		try:
			student_data = self._process_student_name(full_name)
			
			if preview_only:
				# Add to preview results
				results['students'].append({
					'row_num': row_num,
					'full_name': student_data['full_name'],
					'student_id': student_data['student_id'],
					'username': student_data['username'],
					'password': student_data['password'],
					'first_name': student_data['first_name'],
					'last_name': student_data['last_name'],
					'middle_name': student_data['middle_name'],
					'department': department.name if department else 'None',
					'status': 'Ready to import'
				})
				results['success_count'] += 1
			else:
				# Actually create the student
				success = self._create_student(student_data, department)
				if success:
					results['students'].append({
						'row_num': row_num,
						'full_name': student_data['full_name'],
						'student_id': student_data['student_id'],
						'username': student_data['username'],
						'status': 'Successfully created'
					})
					results['success_count'] += 1
				else:
					results['errors'].append({
						'row_num': row_num,
						'full_name': full_name,
						'error': 'Username already exists'
					})
					results['error_count'] += 1
					
		except Exception as e:
			results['errors'].append({
				'row_num': row_num,
				'full_name': full_name,
				'error': str(e)
			})
			results['error_count'] += 1

	def _process_student_name(self, full_name):
		"""Process a full name and generate student credentials (same as management command)"""
		# Clean and split the name
		name_parts = self._clean_name(full_name).split()
		
		if len(name_parts) < 2:
			raise ValueError(f"Name must have at least first and last name")

		first_name = name_parts[0]
		last_name = name_parts[-1]
		middle_name = ' '.join(name_parts[1:-1]) if len(name_parts) > 2 else ''

		# Generate student ID (ITC + 4 digits)
		student_id = self._generate_student_id()
		
		# Generate username (unique, based on name)
		username = self._generate_username(first_name, last_name, middle_name)
		
		# Generate password (unique, name-based)
		password = self._generate_password(first_name, last_name)

		return {
			'full_name': full_name,
			'first_name': first_name,
			'last_name': last_name,
			'middle_name': middle_name,
			'student_id': student_id,
			'username': username,
			'password': password
		}

	def _clean_name(self, name):
		"""Clean and normalize name string"""
		name = re.sub(r'\s+', ' ', name.strip())
		name = re.sub(r'\([^)]*\)', '', name)
		name = re.sub(r'\s+', ' ', name.strip())
		return name

	def _generate_student_id(self):
		"""Generate unique student ID starting with ITC"""
		existing_ids = models.Student.objects.filter(
			student_id__startswith='ITC'
		).values_list('student_id', flat=True)
		
		max_num = 3000
		for student_id in existing_ids:
			try:
				num = int(student_id[3:])
				max_num = max(max_num, num)
			except (ValueError, IndexError):
				continue
		
		return f"ITC{max_num + 1:04d}"

	def _generate_username(self, first_name, last_name, middle_name):
		"""Generate unique username based on name"""
		base_username = f"{first_name.lower()}{last_name[0].lower()}"
		base_username = re.sub(r'[^a-z0-9]', '', base_username)
		
		if len(base_username) < 4:
			base_username = base_username + last_name.lower()
			base_username = re.sub(r'[^a-z0-9]', '', base_username)[:8]
		
		username = base_username[:8]
		
		counter = 1
		original_username = username
		while User.objects.filter(username=username).exists():
			username = f"{original_username}{counter}"
			counter += 1
			if counter > 99:
				username = f"{original_username}{counter}"
				break
		
		return username

	def _generate_password(self, first_name, last_name):
		"""Generate unique password with name correlation"""
		first_part = first_name[:3].lower()
		last_part = last_name[:2].lower()
		
		first_part = re.sub(r'[^a-z]', '', first_part)
		last_part = re.sub(r'[^a-z]', '', last_part)
		
		if len(first_part) < 2:
			first_part = first_name.lower()[:2]
		if len(last_part) < 1:
			last_part = last_name.lower()[:1]
		
		name_sum = sum(ord(c) for c in (first_name + last_name).lower())
		number_part = f"{name_sum % 1000:03d}"
		
		password = f"{first_part}{last_part}{number_part}"
		
		if len(password) < 6:
			password = password + "00"
		
		return password[:10]

	def _create_student(self, student_data, department=None):
		"""Create student and user records"""
		try:
			# Check if user already exists
			if User.objects.filter(username=student_data['username']).exists():
				return False
			
			# Check if student ID already exists
			if models.Student.objects.filter(student_id=student_data['student_id']).exists():
				student_data['student_id'] = self._generate_student_id()
			
			# Create user
			user = User.objects.create_user(
				username=student_data['username'],
				password=student_data['password'],
				first_name=student_data['first_name'],
				last_name=student_data['last_name'],
				role=User.ROLE_STUDENT
			)
			
			if student_data['middle_name']:
				user.middle_name = student_data['middle_name']
				user.save()
			
			# Create student profile
			student = models.Student.objects.create(
				user=user,
				student_id=student_data['student_id']
			)
			
			# Assign to department if provided
			if department:
				models.StudentDepartment.objects.create(
					student=student,
					department=department
				)
			
			return True
			
		except Exception:
			return False


class AttendanceRecordView(UserPassesTestMixin, generic.TemplateView):
	template_name = 'core/attendance_record.html'
	
	def test_func(self):
		return can_record_attendance(self.request.user)
	
	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		from django.utils import timezone
		today = timezone.now().date()
		
		# Get department filter from URL parameter
		department_id = self.request.GET.get('department')
		selected_department = None
		
		# Get all departments
		departments = models.Department.objects.all().order_by('name')
		
		# Filter students by department if specified
		if department_id:
			try:
				selected_department = models.Department.objects.get(id=department_id)
				students = models.Student.objects.filter(
					departments=selected_department
				).select_related('user').distinct()
			except models.Department.DoesNotExist:
				students = models.Student.objects.select_related('user').all()
		else:
			# Get all students if no department filter
			students = models.Student.objects.select_related('user').all()
		
		# Define which attendance types to show based on selected department
		if selected_department:
			if selected_department.code in ['PHYSICAL']:
				# Physical department only records physical attendance
				attendance_types = [models.Attendance.TYPE_PHYSICAL]
				type_labels = [(models.Attendance.TYPE_PHYSICAL, 'Physical Activities')]
			elif selected_department.code in ['PSYCHOLOGICAL']:
				# Psychological department only records psychological attendance
				attendance_types = [models.Attendance.TYPE_PSYCHOLOGICAL]
				type_labels = [(models.Attendance.TYPE_PSYCHOLOGICAL, 'Psychological Support')]
			else:
				# Technical departments (EMBED, CYBER, AERO, DEV) record class attendance
				attendance_types = [models.Attendance.TYPE_CLASS]
				type_labels = [(models.Attendance.TYPE_CLASS, f'{selected_department.name} Class')]
		else:
			# Show all types when no department is selected (shouldn't happen with new UI)
			attendance_types = [
				models.Attendance.TYPE_PHYSICAL,
				models.Attendance.TYPE_PSYCHOLOGICAL,
				models.Attendance.TYPE_CLASS,
			]
			type_labels = [
				(models.Attendance.TYPE_PHYSICAL, 'Physical'),
				(models.Attendance.TYPE_PSYCHOLOGICAL, 'Psychological'),
				(models.Attendance.TYPE_CLASS, 'Technical/Class'),
			]
		
		# Get today's attendance records for these types
		today_attendance = {}
		for att_type in attendance_types:
			attendance_records = models.Attendance.objects.filter(
				date=today,
				attendance_type=att_type
			).values_list('student_id', flat=True)
			today_attendance[att_type] = list(attendance_records)
		
		# Prepare student data with attendance status for each type
		student_data = []
		for student in students:
			student_attendance = {}
			for att_type in attendance_types:
				student_attendance[att_type] = student.id in today_attendance[att_type]
			
			student_data.append({
				'student': student,
				'attendance': student_attendance
			})
		
		context.update({
			'students': student_data,
			'date': today,
			'departments': departments,
			'selected_department': selected_department,
			'attendance_types': type_labels
		})
		return context
	
	def post(self, request, *args, **kwargs):
		from django.utils import timezone
		from django.http import JsonResponse
		
		today = timezone.now().date()
		
		# Process each attendance type
		attendance_types = [
			models.Attendance.TYPE_PHYSICAL,
			models.Attendance.TYPE_PSYCHOLOGICAL,
			models.Attendance.TYPE_CLASS,
		]
		
		for att_type in attendance_types:
			# Clear today's attendance for this type
			models.Attendance.objects.filter(
				date=today,
				attendance_type=att_type
			).delete()
			
			# Get attendance data for this type
			attendance_data = request.POST.getlist(f'attendance_{att_type}')
			
			# Create new attendance records for present students
			for student_id in attendance_data:
				try:
					student = models.Student.objects.get(id=student_id)
					models.Attendance.objects.create(
						student=student,
						date=today,
						attendance_type=att_type,
						recorded_by=request.user,
						notes=f"Recorded by {request.user.get_full_name()}"
					)
				except models.Student.DoesNotExist:
					continue
		
		if request.headers.get('Content-Type') == 'application/json':
			return JsonResponse({'success': True})
		
		return self.get(request, *args, **kwargs)


class MealAttendanceView(UserPassesTestMixin, generic.TemplateView):
	"""Meal attendance recording view for cafe staff"""
	template_name = 'core/meal_attendance.html'
	
	def test_func(self):
		return can_record_attendance(self.request.user)
	
	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		from django.utils import timezone
		today = timezone.now().date()
		
		# Get department filter from URL parameter
		department_id = self.request.GET.get('department')
		selected_department = None
		
		# Get all departments
		departments = models.Department.objects.all().order_by('name')
		
		# Filter students by department if specified
		if department_id:
			try:
				selected_department = models.Department.objects.get(id=department_id)
				students = models.Student.objects.filter(
					departments=selected_department
				).select_related('user').distinct()
			except models.Department.DoesNotExist:
				students = models.Student.objects.select_related('user').all()
		else:
			# Get all students if no department filter
			students = models.Student.objects.select_related('user').all()
		
		# Get today's meal attendance records
		today_meal_attendance = {}
		for meal_type, _ in models.Attendance.MEAL_CHOICES:
			attendance_records = models.Attendance.objects.filter(
				date=today,
				attendance_type=models.Attendance.TYPE_MEAL,
				meal_type=meal_type
			).values_list('student_id', flat=True)
			today_meal_attendance[meal_type] = list(attendance_records)
		
		# Prepare student data with meal attendance status
		student_data = []
		for student in students:
			student_meals = {}
			for meal_type, _ in models.Attendance.MEAL_CHOICES:
				student_meals[meal_type] = student.id in today_meal_attendance[meal_type]
			
			student_data.append({
				'student': student,
				'meals': student_meals
			})
		
		context.update({
			'students': student_data,
			'date': today,
			'departments': departments,
			'selected_department': selected_department,
			'meal_types': models.Attendance.MEAL_CHOICES,
		})
		return context
	
	def post(self, request, *args, **kwargs):
		from django.utils import timezone
		from django.http import JsonResponse
		
		today = timezone.now().date()
		action = request.POST.get('action')
		
		if action in ['mark_present', 'mark_absent']:
			student_id = request.POST.get('student_id')
			meal_type = request.POST.get('meal_type')
			
			if student_id and meal_type:
				try:
					student = models.Student.objects.get(id=student_id)
					
					if action == 'mark_present':
						attendance, created = models.Attendance.objects.get_or_create(
							student=student,
							date=today,
							attendance_type=models.Attendance.TYPE_MEAL,
							meal_type=meal_type,
							defaults={'recorded_by': request.user}
						)
						if not created:
							attendance.recorded_by = request.user
							attendance.save()
					else:  # mark_absent
						models.Attendance.objects.filter(
							student=student,
							date=today,
							attendance_type=models.Attendance.TYPE_MEAL,
							meal_type=meal_type
						).delete()
				except models.Student.DoesNotExist:
					pass
		
		elif action in ['bulk_breakfast', 'bulk_lunch', 'bulk_dinner']:
			meal_type = action.split('_')[1].upper()
			student_ids = request.POST.getlist('student_ids[]')
			
			for student_id in student_ids:
				try:
					student = models.Student.objects.get(id=student_id)
					attendance, created = models.Attendance.objects.get_or_create(
						student=student,
						date=today,
						attendance_type=models.Attendance.TYPE_MEAL,
						meal_type=meal_type,
						defaults={'recorded_by': request.user}
					)
					if not created:
						attendance.recorded_by = request.user
						attendance.save()
				except models.Student.DoesNotExist:
					continue
		
		# Always return JSON for AJAX requests
		if request.headers.get('X-Requested-With') == 'XMLHttpRequest' or 'action' in request.POST:
			return JsonResponse({'success': True})
		
		return self.get(request, *args, **kwargs)

