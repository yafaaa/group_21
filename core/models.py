from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from django.db.models import Q, UniqueConstraint


# User model with roles for summer camp management
class User(AbstractUser):
    ROLE_STUDENT = "STUDENT"
    ROLE_MENTOR = "MENTOR"
    ROLE_ADMIN = "ADMIN"
    ROLE_CAFE = "CAFE"
    ROLE_CHOICES = [
        (ROLE_STUDENT, "Student"),
        (ROLE_MENTOR, "Mentor"),
        (ROLE_ADMIN, "Admin"),
        (ROLE_CAFE, "Cafe Assistant"),
    ]
    
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default=ROLE_STUDENT)
    middle_name = models.CharField(max_length=150, blank=True)

    def __str__(self):
        name = self.get_full_name() or self.username
        return f"{name} ({self.get_role_display()})"
    
    def is_admin(self):
        return self.role == self.ROLE_ADMIN
    
    def is_mentor(self):
        return self.role == self.ROLE_MENTOR
    
    def is_student(self):
        return self.role == self.ROLE_STUDENT
    
    def is_cafe(self):
        return self.role == self.ROLE_CAFE
# Technical departments for the summer camp
class Department(models.Model):
    name = models.CharField(max_length=200, unique=True)
    code = models.CharField(max_length=20, blank=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return f"{self.name} ({self.code})" if self.code else self.name
# Students with dorm assignments and department memberships
class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='student_profile')
    student_id = models.CharField(max_length=50, unique=True)
    enrolled_date = models.DateField(null=True, blank=True)
    dorm = models.ForeignKey('Dorm', on_delete=models.SET_NULL, null=True, blank=True, related_name='students')
    departments = models.ManyToManyField(Department, through='StudentDepartment', related_name='students')

    def __str__(self):
        return f"{self.user.get_full_name() or self.user.username} ({self.student_id})"

    def clean(self):
        # Prevent assigning more than dorm capacity
        if self.dorm and self.dorm.is_full():
            # Check if this student is already in the dorm (for updates)
            if not (self.pk and self.dorm.students.filter(pk=self.pk).exists()):
                raise ValidationError({'dorm': f'Dorm "{self.dorm.name}" is full (capacity {self.dorm.capacity}).'})


# Mentors can manage multiple departments
class Mentor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='mentor_profile')
    title = models.CharField(max_length=100, blank=True)
    departments = models.ManyToManyField(Department, blank=True, related_name='mentors')
    phone = models.CharField(max_length=30, blank=True)

    def __str__(self):
        return f"{self.title} {self.user.get_full_name()}".strip() or self.user.username
# A through model for students and departments so we can store extra info
class StudentDepartment(models.Model):
	student = models.ForeignKey(Student, on_delete=models.CASCADE)
	department = models.ForeignKey(Department, on_delete=models.CASCADE)
	joined_on = models.DateField(null=True, blank=True)
	is_primary = models.BooleanField(default=False)

	class Meta:
		unique_together = ('student', 'department')

	def __str__(self):
		return f"{self.student} @ {self.department}"


# Attendance with meal tracking and concurrent cafe assistant support
class Attendance(models.Model):
    TYPE_MEAL = "MEAL"
    TYPE_PSYCHOLOGICAL = "PSYCHOLOGICAL"
    TYPE_PHYSICAL = "PHYSICAL"
    TYPE_CLASS = "CLASS"
    ATTENDANCE_TYPE_CHOICES = [
        (TYPE_MEAL, "Meal"),
        (TYPE_PSYCHOLOGICAL, "Psychological"),
        (TYPE_PHYSICAL, "Physical"),
        (TYPE_CLASS, "Class/Session"),
    ]

    MEAL_BREAKFAST = "BREAKFAST"
    MEAL_LUNCH = "LUNCH"
    MEAL_DINNER = "DINNER"
    MEAL_CHOICES = [
        (MEAL_BREAKFAST, "Breakfast"),
        (MEAL_LUNCH, "Lunch"),
        (MEAL_DINNER, "Dinner"),
    ]

    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='attendances')
    date = models.DateField()
    attendance_type = models.CharField(max_length=20, choices=ATTENDANCE_TYPE_CHOICES)
    meal_type = models.CharField(max_length=20, choices=MEAL_CHOICES, null=True, blank=True)
    notes = models.TextField(blank=True, default='')
    recorded_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='recorded_attendances')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        # Database constraint: one meal per meal-type per student per day
        constraints = [
            UniqueConstraint(
                fields=['student', 'date', 'meal_type'],
                condition=Q(attendance_type='MEAL'),
                name='unique_meal_per_student_per_day'
            ),
        ]

    def clean(self):
        # Meal type is required for meal attendance
        if self.attendance_type == self.TYPE_MEAL and not self.meal_type:
            raise ValidationError({'meal_type': 'Meal type is required for meal attendance.'})
        
        # Extra validation: prevent meal duplicates
        if self.attendance_type == self.TYPE_MEAL and self.meal_type:
            qs = Attendance.objects.filter(
                student=self.student, 
                date=self.date,
                attendance_type=self.TYPE_MEAL, 
                meal_type=self.meal_type
            )
            if self.pk:
                qs = qs.exclude(pk=self.pk)
            if qs.exists():
                raise ValidationError(f"{self.student} already has {self.meal_type} recorded for {self.date}.")

    def __str__(self):
        if self.attendance_type == self.TYPE_MEAL:
            return f"{self.student} - {self.meal_type} ({self.date})"
        return f"{self.student} - {self.attendance_type} ({self.date})"


# Dorms with capacity limits (4 students per dorm)
class Dorm(models.Model):
    name = models.CharField(max_length=200, unique=True)
    address = models.TextField(blank=True)
    capacity = models.PositiveIntegerField(default=4)
    manager = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='managed_dorms')

    def __str__(self):
        return f"{self.name} (capacity: {self.capacity})"

    def current_occupancy(self):
        return self.students.count()

    def is_full(self):
        return self.current_occupancy() >= self.capacity
# Simple admin-like model placeholder if you need to store extra admin info
class AdminProfile(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	notes = models.TextField(blank=True)

	def __str__(self):
		return f"Admin: {self.user.get_full_name()}"
