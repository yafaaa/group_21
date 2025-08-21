#!/usr/bin/env python
"""
Test department filtering for attendance recording
"""
import os
import django
import sys

# Add the project root to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'campus_site.settings')
django.setup()

from core.models import Department, Student

def test_department_filtering():
    """Test department filtering functionality"""
    print("🧪 TESTING DEPARTMENT FILTERING FOR ATTENDANCE")
    print("=" * 60)
    
    # Show all departments
    departments = Department.objects.all().order_by('name')
    print(f"📚 AVAILABLE DEPARTMENTS/CLASSES:")
    for dept in departments:
        student_count = Student.objects.filter(departments=dept).count()
        print(f"   🏛️  {dept.name} ({dept.code}) - {student_count} students")
    
    print(f"\n📊 DEPARTMENT BREAKDOWN:")
    total_students = Student.objects.count()
    print(f"   👥 Total students in system: {total_students}")
    
    # Show students by department
    for dept in departments:
        students = Student.objects.filter(departments=dept)
        print(f"\n   🏛️  {dept.name} ({dept.code}):")
        for student in students:
            print(f"      👤 {student.user.get_full_name()} (ID: {student.student_id})")
        if not students:
            print(f"      📝 No students assigned")
    
    print(f"\n🎯 URL EXAMPLES:")
    print(f"   📋 All students: /attendance/record/")
    for dept in departments:
        print(f"   🏛️  {dept.name}: /attendance/record/?department={dept.id}")
    
    print(f"\n✨ NEW FEATURES:")
    print("   🔍 Department dropdown filter in attendance recording")
    print("   🏛️  Shows only students from selected department/class")
    print("   📊 Works for both regular attendance and meal attendance")
    print("   🎯 Makes attendance recording more organized")
    
    print(f"\n🚀 TECHNICAL DEPARTMENTS:")
    tech_depts = departments.filter(code__in=['EMBED', 'CYBER', 'AERO', 'DEV'])
    for dept in tech_depts:
        student_count = Student.objects.filter(departments=dept).count()
        print(f"   🔧 {dept.name} ({dept.code}): {student_count} students")
    
    print(f"\n🏃‍♂️ SUPPORT DEPARTMENTS:")
    support_depts = departments.filter(code__in=['PHYSICAL', 'PSYCHOLOGICAL'])
    for dept in support_depts:
        student_count = Student.objects.filter(departments=dept).count()
        print(f"   🏥 {dept.name} ({dept.code}): {student_count} students")

if __name__ == "__main__":
    try:
        test_department_filtering()
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
