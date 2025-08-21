from django.urls import path
from . import views

app_name = 'core'

urlpatterns = [
    # Authentication URLs
    path('login/', views.CustomLoginView.as_view(), name='login'),
    path('logout/', views.CustomLogoutView.as_view(), name='logout'),
    # Note: User registration removed - admins create accounts via CSV import or admin interface
    
    # Dashboard URLs
    path('admin-dashboard/', views.AdminDashboardView.as_view(), name='admin_dashboard'),
    path('mentor-dashboard/', views.MentorDashboardView.as_view(), name='mentor_dashboard'),
    path('student-dashboard/', views.StudentDashboardView.as_view(), name='student_dashboard'),
    path('cafe-dashboard/', views.CafeDashboardView.as_view(), name='cafe_dashboard'),
    
    # Main app URLs
    path('', views.IndexView.as_view(), name='index'),
    path('departments/', views.DepartmentListView.as_view(), name='departments_list'),
    path('departments/add/', views.DepartmentCreateView.as_view(), name='department_add'),
    path('departments/<int:pk>/', views.DepartmentDetailView.as_view(), name='department_detail'),
    path('departments/<int:pk>/edit/', views.DepartmentUpdateView.as_view(), name='department_edit'),
    path('students/', views.StudentListView.as_view(), name='students_list'),
    path('students/add/', views.StudentCreateView.as_view(), name='student_add'),
    path('students/<int:pk>/edit/', views.StudentUpdateView.as_view(), name='student_edit'),
    path('csv-import/', views.CSVImportView.as_view(), name='csv_import'),
    path('mentors/', views.MentorListView.as_view(), name='mentors_list'),
    path('attendance/', views.AttendanceListView.as_view(), name='attendance_list'),
    path('attendance/record/', views.AttendanceRecordView.as_view(), name='attendance_record'),
    path('attendance/meal/', views.MealAttendanceView.as_view(), name='meal_attendance'),
]
