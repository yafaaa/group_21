#!/usr/bin/env python
"""
Test login functionality with all user roles
"""

import os
import django
import sys

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'campus_site.settings')
django.setup()

from django.contrib.auth import get_user_model
from django.test import Client
from django.urls import reverse

User = get_user_model()

def test_login_functionality():
    """Test login for all user roles"""
    print("🔐 Testing Login Functionality")
    print("=" * 40)
    
    client = Client()
    
    # Test users
    test_users = [
        ("admin_test", "admin123", "Admin"),
        ("mentor_test", "mentor123", "Mentor"), 
        ("student_test", "student123", "Student"),
        ("cafe_test", "cafe123", "Cafe Assistant")
    ]
    
    print("\n🧪 LOGIN TESTS:")
    for username, password, role in test_users:
        try:
            # Test login
            response = client.post('/login/', {
                'username': username,
                'password': password
            })
            
            if response.status_code == 302:  # Redirect means success
                print(f"✅ {role} login successful: {username}")
                
                # Test accessing dashboard after login
                if role == "Admin":
                    dashboard_response = client.get('/admin-dashboard/')
                elif role == "Mentor":
                    dashboard_response = client.get('/mentor-dashboard/')
                elif role == "Student":
                    dashboard_response = client.get('/student-dashboard/')
                elif role == "Cafe Assistant":
                    dashboard_response = client.get('/cafe-dashboard/')
                
                if dashboard_response.status_code == 200:
                    print(f"   ✅ Dashboard access successful")
                else:
                    print(f"   ❌ Dashboard access failed ({dashboard_response.status_code})")
            else:
                print(f"❌ {role} login failed: {username} (status: {response.status_code})")
                
            # Logout for next test
            client.logout()
            
        except Exception as e:
            print(f"❌ {role} login error: {str(e)}")
    
    print(f"\n🌐 TEST URLS:")
    print(f"   Login Page: http://127.0.0.1:8000/login/")
    print(f"   Registration: http://127.0.0.1:8000/register/")
    print(f"   Main Page: http://127.0.0.1:8000/")
    
    print(f"\n🔑 CREDENTIALS TO TEST MANUALLY:")
    for username, password, role in test_users:
        print(f"   {role}: {username} / {password}")

if __name__ == "__main__":
    test_login_functionality()
