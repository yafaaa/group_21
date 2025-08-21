#!/usr/bin/env python
"""
Test script for the Role-Based Authentication System
This script tests the authentication functionality and role-based access control.
"""

import os
import django
import sys

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'campus_site.settings')
django.setup()

from django.contrib.auth import get_user_model
from core.models import Student, Department

User = get_user_model()

def test_authentication_system():
    """Test the complete authentication system"""
    print("🔧 Testing Role-Based Authentication System")
    print("=" * 50)
    
    # Test 1: Create test users for each role
    print("\n1️⃣ Creating test users for each role...")
    
    # Create a department first
    dept, created = Department.objects.get_or_create(
        name="Computer Science",
        defaults={"description": "Computer Science Department"}
    )
    
    # Create Admin user
    admin_user, created = User.objects.get_or_create(
        username="admin_test",
        defaults={
            "email": "admin@example.com",
            "first_name": "Admin",
            "last_name": "User",
            "role": "ADMIN"
        }
    )
    if created:
        admin_user.set_password("admin123")
        admin_user.save()
        print(f"✅ Created Admin user: {admin_user.username}")
    else:
        print(f"📋 Admin user already exists: {admin_user.username}")
    
    # Create Mentor user
    mentor_user, created = User.objects.get_or_create(
        username="mentor_test",
        defaults={
            "email": "mentor@example.com",
            "first_name": "Mentor",
            "last_name": "User",
            "role": "MENTOR"
        }
    )
    if created:
        mentor_user.set_password("mentor123")
        mentor_user.save()
        print(f"✅ Created Mentor user: {mentor_user.username}")
    else:
        print(f"📋 Mentor user already exists: {mentor_user.username}")
    
    # Create Student user with Student profile
    student_user, created = User.objects.get_or_create(
        username="student_test",
        defaults={
            "email": "student@example.com",
            "first_name": "Student",
            "last_name": "User",
            "role": "STUDENT"
        }
    )
    if created:
        student_user.set_password("student123")
        student_user.save()
        
        # Create Student profile
        student_profile, created = Student.objects.get_or_create(
            user=student_user,
            defaults={
                "student_id": "STU001",
                "enrolled_date": "2024-01-01",
                "dorm": None,  # Will assign to a dorm later if needed
            }
        )
        print(f"✅ Created Student user: {student_user.username} with profile")
    else:
        print(f"📋 Student user already exists: {student_user.username}")
    
    # Create Cafe user
    cafe_user, created = User.objects.get_or_create(
        username="cafe_test",
        defaults={
            "email": "cafe@example.com",
            "first_name": "Cafe",
            "last_name": "Assistant",
            "role": "CAFE"
        }
    )
    if created:
        cafe_user.set_password("cafe123")
        cafe_user.save()
        print(f"✅ Created Cafe user: {cafe_user.username}")
    else:
        print(f"📋 Cafe user already exists: {cafe_user.username}")
    
    # Test 2: Verify role assignments
    print("\n2️⃣ Verifying role assignments...")
    print(f"Admin role: {admin_user.role} - {admin_user.get_role_display()}")
    print(f"Mentor role: {mentor_user.role} - {mentor_user.get_role_display()}")
    print(f"Student role: {student_user.role} - {student_user.get_role_display()}")
    print(f"Cafe role: {cafe_user.role} - {cafe_user.get_role_display()}")
    
    # Test 3: Test role checking functions
    print("\n3️⃣ Testing role checking functions...")
    print(f"Admin is_admin: {admin_user.is_admin()}")
    print(f"Mentor is_mentor: {mentor_user.is_mentor()}")
    print(f"Student is_student: {student_user.is_student()}")
    print(f"Cafe is_cafe: {cafe_user.is_cafe()}")
    
    # Test 4: Display authentication credentials
    print("\n4️⃣ Test Login Credentials:")
    print("=" * 30)
    print("🛡️  ADMIN LOGIN:")
    print(f"   Username: admin_test")
    print(f"   Password: admin123")
    print(f"   Dashboard: http://127.0.0.1:8000/admin-dashboard/")
    
    print("\n👨‍🏫 MENTOR LOGIN:")
    print(f"   Username: mentor_test")
    print(f"   Password: mentor123")
    print(f"   Dashboard: http://127.0.0.1:8000/mentor-dashboard/")
    
    print("\n👨‍🎓 STUDENT LOGIN:")
    print(f"   Username: student_test")
    print(f"   Password: student123")
    print(f"   Student ID: STU001")
    print(f"   Dashboard: http://127.0.0.1:8000/student-dashboard/")
    
    print("\n🍽️  CAFE LOGIN:")
    print(f"   Username: cafe_test")
    print(f"   Password: cafe123")
    print(f"   Dashboard: http://127.0.0.1:8000/cafe-dashboard/")
    
    # Test 5: System URLs
    print("\n5️⃣ System URLs to Test:")
    print("=" * 30)
    print("🏠 Main Page: http://127.0.0.1:8000/")
    print("🔐 Login: http://127.0.0.1:8000/login/")
    print("📝 Register: http://127.0.0.1:8000/register/")
    print("📁 CSV Import: http://127.0.0.1:8000/csv-import/")
    print("👥 Students List: http://127.0.0.1:8000/students/")
    print("🏛️  Departments: http://127.0.0.1:8000/departments/")
    
    print("\n✅ Authentication system test completed!")
    print("\n🚀 Next steps:")
    print("1. Visit http://127.0.0.1:8000/ to see the updated homepage")
    print("2. Test login with different user roles")
    print("3. Verify role-based dashboard access")
    print("4. Test the CSV import functionality")
    print("5. Check permission-based content visibility")

if __name__ == "__main__":
    test_authentication_system()
