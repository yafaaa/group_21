#!/usr/bin/env python
"""
Demonstration Summary - Show what's available for project demonstration
"""

import os
import django
from django.utils import timezone
from datetime import date

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'campus_site.settings')
django.setup()

from core.models import Student, Attendance, Department, User, StudentDepartment

def main():
    print("🎓 PROJECT DEMONSTRATION SUMMARY")
    print("=" * 50)
    
    # Students Summary
    students = Student.objects.all()
    print(f"\n👥 STUDENTS: {students.count()} total")
    print("Sample students:")
    for student in students[:8]:
        departments = ", ".join([sd.department.code for sd in student.studentdepartment_set.all()])
        print(f"  • {student.user.get_full_name()} (ID: {student.student_id}) - {departments}")
    print(f"  ... and {students.count() - 8} more students")
    
    # Departments Summary
    departments = Department.objects.all()
    print(f"\n📚 DEPARTMENTS: {departments.count()} total")
    for dept in departments:
        student_count = Student.objects.filter(departments=dept).count()
        print(f"  • {dept.name} ({dept.code}): {student_count} students")
    
    # Attendance Summary
    attendance_records = Attendance.objects.all()
    print(f"\n📊 ATTENDANCE RECORDS: {attendance_records.count()} total")
    
    # Today's attendance
    today = date.today()
    today_attendance = Attendance.objects.filter(date=today)
    print(f"\n📅 TODAY'S ATTENDANCE ({today}):")
    for att_type, type_name in Attendance.ATTENDANCE_TYPE_CHOICES:
        present = today_attendance.filter(attendance_type=att_type).count()
        absent = students.count() - present
        percentage = (present / students.count() * 100) if students.count() > 0 else 0
        print(f"  • {type_name}: {present} present, {absent} absent ({percentage:.1f}% attendance)")
    
    # Weekly attendance trends
    print(f"\n📈 WEEKLY ATTENDANCE TRENDS:")
    for days_back in range(7):
        check_date = date.today() - timezone.timedelta(days=days_back)
        day_attendance = Attendance.objects.filter(date=check_date)
        total_possible = students.count() * 4  # 4 attendance types
        total_present = day_attendance.count()
        percentage = (total_present / total_possible * 100) if total_possible > 0 else 0
        print(f"  • {check_date}: {total_present}/{total_possible} records ({percentage:.1f}% overall)")
    
    # Users Summary
    users = User.objects.all()
    print(f"\n👤 USERS: {users.count()} total")
    for role_code, role_name in User.ROLE_CHOICES:
        count = users.filter(role=role_code).count()
        print(f"  • {role_name}: {count} users")
    
    print(f"\n🎯 DEMONSTRATION FEATURES AVAILABLE:")
    print("=" * 50)
    print("✅ Student Management:")
    print("   • 89 real student names imported")
    print("   • Students distributed across 6 departments")
    print("   • Unique student IDs generated")
    print("   • User accounts with login credentials")
    
    print("\n✅ Attendance Tracking:")
    print("   • 7 days of historical attendance data")
    print("   • 4 attendance types: Meal, Class, Physical, Psychological")
    print("   • Realistic attendance percentages (60-90%)")
    print("   • Track who's present vs absent")
    
    print("\n✅ Department Management:")
    print("   • 6 technical departments configured")
    print("   • Students can belong to multiple departments")
    print("   • Department-wise attendance reports")
    
    print("\n✅ User Roles & Permissions:")
    print("   • Admin users (full system access)")
    print("   • Mentor users (department management)")
    print("   • Student users (limited access)")
    print("   • Cafe users (meal attendance)")
    
    print("\n🚀 DEMO SCENARIOS YOU CAN SHOW:")
    print("=" * 50)
    print("1. 📝 Record daily attendance for any department")
    print("2. 📊 View attendance statistics and reports")
    print("3. 👥 See who's present/absent today")
    print("4. 📈 Track attendance trends over time")
    print("5. 🏢 Department-wise attendance breakdown")
    print("6. 🔍 Search and filter students")
    print("7. 👤 Role-based access control")
    print("8. 📱 Responsive design (mobile-friendly)")
    
    print(f"\n💡 ACCESS CREDENTIALS:")
    print("=" * 50)
    print("All students can login with:")
    print("  Username: [firstname].[lastname] (e.g., 'sadam.omer')")
    print("  Password: demo123")
    print()
    print("Sample student logins:")
    for student in students[:5]:
        username = f"{student.user.first_name.lower()}.{student.user.last_name.lower()}"
        print(f"  • {student.user.get_full_name()}: {username} / demo123")
    
    print(f"\n🎉 Your project is ready for demonstration!")
    print("Start the Django server with: python manage.py runserver")

if __name__ == "__main__":
    main()
