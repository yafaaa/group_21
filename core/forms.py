from django import forms
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth import authenticate
from . import models


class CustomLoginForm(AuthenticationForm):
    """Custom login form with better styling and role-based features"""
    username = forms.CharField(
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Username or Student ID'
        })
    )
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={
            'class': 'form-control',
            'placeholder': 'Password'
        })
    )
    
    def clean_username(self):
        username = self.cleaned_data.get('username')
        
        # Allow login with student ID (ITC3001 format)
        if username and username.startswith('ITC'):
            try:
                student = models.Student.objects.get(student_id=username)
                return student.user.username
            except models.Student.DoesNotExist:
                pass
        
        return username


class UserRegistrationForm(UserCreationForm):
    """Form for registering new users with role selection"""
    first_name = forms.CharField(max_length=150, required=True)
    last_name = forms.CharField(max_length=150, required=True)
    email = forms.EmailField(required=True)
    middle_name = forms.CharField(max_length=150, required=False)
    role = forms.ChoiceField(
        choices=models.User.ROLE_CHOICES,
        initial=models.User.ROLE_STUDENT
    )
    
    class Meta:
        model = models.User
        fields = ('username', 'first_name', 'last_name', 'middle_name', 'email', 'role', 'password1', 'password2')
    
    def save(self, commit=True):
        user = super().save(commit=False)
        user.first_name = self.cleaned_data['first_name']
        user.last_name = self.cleaned_data['last_name']
        user.email = self.cleaned_data['email']
        user.middle_name = self.cleaned_data['middle_name']
        user.role = self.cleaned_data['role']
        
        if commit:
            user.save()
            
            # Create role-specific profile
            if user.role == models.User.ROLE_STUDENT:
                # Generate student ID if not provided
                student_id = self._generate_student_id()
                models.Student.objects.create(user=user, student_id=student_id)
            elif user.role == models.User.ROLE_ADMIN:
                models.AdminProfile.objects.create(user=user)
        
        return user
    
    def _generate_student_id(self):
        """Generate unique student ID"""
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


# Simple ModelForms so the UI can create and update objects quickly.
class DepartmentForm(forms.ModelForm):
    class Meta:
        model = models.Department
        fields = ['name', 'code', 'description']


class StudentForm(forms.ModelForm):
    # nested user fields so a student and its user can be created together
    username = forms.CharField(required=True)
    first_name = forms.CharField(required=False)
    last_name = forms.CharField(required=False)
    email = forms.EmailField(required=False)
    password = forms.CharField(required=False, widget=forms.PasswordInput)

    class Meta:
        model = models.Student
        # hide raw FK selection; we'll manage the user in save()
        fields = ['student_id', 'enrolled_date']

    def __init__(self, *args, **kwargs):
        # allow passing an instance with a user to prepopulate nested fields
        instance = kwargs.get('instance', None)
        super().__init__(*args, **kwargs)
        if instance and instance.user_id:
            self.fields['username'].initial = instance.user.username
            self.fields['first_name'].initial = instance.user.first_name
            self.fields['last_name'].initial = instance.user.last_name
            self.fields['email'].initial = instance.user.email

    def save(self, commit=True):
        # create/update linked User then save Student
        data = self.cleaned_data
        User = models.User

        # find existing user by username or create new
        username = data.get('username')
        user = None
        if self.instance and self.instance.user_id:
            user = self.instance.user
            user.username = username
        else:
            try:
                user = User.objects.get(username=username)
            except User.DoesNotExist:
                user = User(username=username)

        # update user fields
        user.first_name = data.get('first_name', '')
        user.last_name = data.get('last_name', '')
        user.email = data.get('email', '')
        password = data.get('password')
        if password:
            user.set_password(password)

        if commit:
            user.save()

        # attach user to student instance and save student
        student = super().save(commit=False)
        student.user = user
        if commit:
            student.save()
        return student


class CSVImportForm(forms.Form):
    """Form for uploading and importing student data from CSV files"""
    csv_file = forms.FileField(
        label='CSV File',
        help_text='Upload a CSV file with student names (one name per row)',
        widget=forms.FileInput(attrs={'accept': '.csv'})
    )
    department = forms.ModelChoiceField(
        queryset=models.Department.objects.all(),
        required=False,
        empty_label='-- No default department --',
        help_text='Optional: Assign all imported students to this department'
    )
    preview_only = forms.BooleanField(
        required=False,
        initial=True,
        label='Preview only (don\'t save to database)',
        help_text='Check this to preview the import without actually creating students'
    )

    def clean_csv_file(self):
        csv_file = self.cleaned_data['csv_file']
        
        # Check file size (max 5MB)
        if csv_file.size > 5 * 1024 * 1024:
            raise forms.ValidationError('File size must be less than 5MB.')
        
        # Check file extension
        if not csv_file.name.lower().endswith('.csv'):
            raise forms.ValidationError('File must have .csv extension.')
        
        return csv_file
