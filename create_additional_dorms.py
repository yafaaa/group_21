#!/usr/bin/env python
"""
Script to create additional dorms and assign remaining students
"""

import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'campus_site.settings')
django.setup()

from core.models import Student, Dorm
from django.db import transaction

def main():
    print("🏠 Creating additional dorms for remaining students...")
    
    # Get remaining unassigned students
    remaining_students = list(Student.objects.filter(dorm__isnull=True))
    print(f"Found {len(remaining_students)} unassigned students")
    
    if not remaining_students:
        print("All students are already assigned to dorms!")
        return
    
    # Calculate how many additional dorms we need (4 students per dorm)
    additional_dorms_needed = (len(remaining_students) + 3) // 4  # Round up
    print(f"Need {additional_dorms_needed} additional dorms")
    
    # Greek letter names for new dorms
    new_dorm_names = [
        "Xi Residence", "Omicron Hall", "Pi Lodge", "Rho Complex", 
        "Sigma Tower", "Tau Gardens", "Upsilon Center", "Phi House",
        "Chi Residence", "Psi Hall", "Omega Lodge"
    ]
    
    with transaction.atomic():
        # Create additional dorms
        new_dorms = []
        for i in range(additional_dorms_needed):
            if i < len(new_dorm_names):
                dorm_name = new_dorm_names[i]
            else:
                dorm_name = f"Room {100 + 18 + i}"  # Continue numbering from existing rooms
            
            dorm = Dorm.objects.create(
                name=dorm_name,
                capacity=4
            )
            new_dorms.append(dorm)
            print(f"✅ Created {dorm.name} with capacity 4")
        
        # Assign students to new dorms
        student_index = 0
        assigned_count = 0
        
        for dorm in new_dorms:
            for _ in range(dorm.capacity):
                if student_index >= len(remaining_students):
                    break
                
                student = remaining_students[student_index]
                student.dorm = dorm
                student.save()
                
                print(f"✅ Assigned {student.user.get_full_name()} (ID: {student.student_id}) to {dorm.name}")
                assigned_count += 1
                student_index += 1
            
            if student_index >= len(remaining_students):
                break
    
    print(f"\n🎉 Additional dorm assignment completed!")
    print(f"   ✅ Created: {len(new_dorms)} new dorms")
    print(f"   ✅ Assigned: {assigned_count} students")
    
    # Final verification
    total_students = Student.objects.count()
    assigned_students = Student.objects.filter(dorm__isnull=False).count()
    unassigned_students = total_students - assigned_students
    
    print(f"\n📊 Final Status:")
    print(f"   Total students: {total_students}")
    print(f"   Assigned to dorms: {assigned_students}")
    print(f"   Still unassigned: {unassigned_students}")
    
    print(f"\n🏠 All dorms now:")
    all_dorms = Dorm.objects.all()
    for dorm in all_dorms:
        student_count = dorm.students.count()
        print(f"   {dorm.name}: {student_count}/{dorm.capacity} students")

if __name__ == "__main__":
    main()
