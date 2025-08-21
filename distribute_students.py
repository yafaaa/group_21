#!/usr/bin/env python
"""
Distribute students across the technical departments
"""
import os
import django
import sys

# Add the project root to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'campus_site.settings')
django.setup()

from core.models import Student, Department, StudentDepartment

def distribute_students():
    """Distribute students across technical departments"""
    print("👥 Distributing Students Across Technical Departments...")
    
    # Get technical departments
    technical_depts = Department.objects.filter(code__in=['EMBED', 'CYBER', 'AERO', 'DEV']).order_by('code')
    students = Student.objects.all()
    
    if not students.exists():
        print("   ⚠️ No students found to distribute")
        return
    
    print(f"   📊 Distributing {students.count()} students across {technical_depts.count()} departments")
    
    # Clear existing department assignments
    StudentDepartment.objects.filter(student__in=students).delete()
    
    # Distribute students evenly across departments
    dept_list = list(technical_depts)
    dept_assignments = {}
    
    for i, student in enumerate(students):
        # Assign to departments in round-robin fashion
        dept = dept_list[i % len(dept_list)]
        
        StudentDepartment.objects.create(
            student=student,
            department=dept
        )
        
        if dept.code not in dept_assignments:
            dept_assignments[dept.code] = []
        dept_assignments[dept.code].append(student)
        
        print(f"   👤 {student.user.get_full_name()} → {dept.name} ({dept.code})")
    
    print(f"\n📊 FINAL DISTRIBUTION:")
    for dept in technical_depts:
        student_count = StudentDepartment.objects.filter(department=dept).count()
        print(f"   🏛️ {dept.name} ({dept.code}): {student_count} students")
    
    print(f"\n✅ Student distribution completed!")

if __name__ == "__main__":
    try:
        distribute_students()
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
