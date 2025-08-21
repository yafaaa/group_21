#!/usr/bin/env python
"""
Script to distribute students among dorm rooms
"""

import os
import django
import random

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'campus_site.settings')
django.setup()

from core.models import Student, Dorm
from django.db import transaction

def main():
    print("🏠 Distributing students among dorm rooms...")
    
    # Get all students and dorms
    students = list(Student.objects.filter(dorm__isnull=True))  # Only unassigned students
    dorms = list(Dorm.objects.all())
    
    print(f"Found {len(students)} unassigned students")
    print(f"Found {len(dorms)} dorms")
    
    if not students:
        print("No unassigned students found!")
        return
    
    if not dorms:
        print("No dorms found!")
        return
    
    # Calculate total capacity
    total_capacity = sum(dorm.capacity for dorm in dorms)
    print(f"Total dorm capacity: {total_capacity}")
    
    if len(students) > total_capacity:
        print(f"⚠️ Warning: More students ({len(students)}) than dorm capacity ({total_capacity})")
    
    # Shuffle students for random distribution
    random.shuffle(students)
    
    assigned_count = 0
    
    with transaction.atomic():
        student_index = 0
        
        for dorm in dorms:
            # Fill each dorm to capacity or until we run out of students
            for _ in range(dorm.capacity):
                if student_index >= len(students):
                    break
                
                student = students[student_index]
                student.dorm = dorm
                student.save()
                
                print(f"✅ Assigned {student.user.get_full_name()} (ID: {student.student_id}) to {dorm.name}")
                assigned_count += 1
                student_index += 1
            
            if student_index >= len(students):
                break
    
    # Show final distribution
    print(f"\n🎉 Assignment completed!")
    print(f"   ✅ Assigned: {assigned_count} students")
    print(f"   📊 Remaining unassigned: {len(students) - assigned_count} students")
    
    print(f"\n🏠 Final Dorm Distribution:")
    for dorm in dorms:
        student_count = dorm.students.count()
        print(f"   {dorm.name}: {student_count}/{dorm.capacity} students")
        if student_count > 0:
            # Show first few students in each dorm
            dorm_students = dorm.students.all()[:2]
            for student in dorm_students:
                print(f"     - {student.user.get_full_name()} ({student.student_id})")
            if student_count > 2:
                print(f"     ... and {student_count - 2} more")

if __name__ == "__main__":
    main()
