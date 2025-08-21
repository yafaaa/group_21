#!/usr/bin/env python
"""
Test the absent students functionality
"""
import os
import django
import sys

# Add the project root to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'campus_site.settings')
django.setup()

from core.models import Student, Attendance
from django.utils import timezone

def test_absent_students():
    """Test that absent students are correctly identified"""
    print("🧪 TESTING ABSENT STUDENTS FUNCTIONALITY")
    print("=" * 50)
    
    today = timezone.now().date()
    
    # Get all students
    all_students = Student.objects.all()
    print(f"📊 Total students in system: {all_students.count()}")
    
    # Get students with attendance today
    students_with_attendance = Attendance.objects.filter(
        date=today
    ).values_list('student_id', flat=True).distinct()
    
    present_count = len(set(students_with_attendance))
    absent_count = all_students.count() - present_count
    
    print(f"✅ Students present today: {present_count}")
    print(f"❌ Students absent today: {absent_count}")
    
    # Show absent students
    if absent_count > 0:
        print(f"\n📋 ABSENT STUDENTS:")
        for student in all_students:
            if student.id not in students_with_attendance:
                departments = ", ".join([dept.name for dept in student.departments.all()])
                print(f"   ❌ {student.user.get_full_name()} (ID: {student.student_id})")
                if departments:
                    print(f"      Departments: {departments}")
    else:
        print(f"\n🎉 ALL STUDENTS ATTENDED TODAY!")
    
    print(f"\n🔗 View results at: http://127.0.0.1:8000/attendance/")

if __name__ == "__main__":
    try:
        test_absent_students()
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
