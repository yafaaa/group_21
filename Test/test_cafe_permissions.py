#!/usr/bin/env python
"""
Test cafe staff permissions after fixes
"""
import os
import django
import sys

# Add the project root to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'campus_site.settings')
django.setup()

from django.contrib.auth import get_user_model
from django.test import Client

def test_cafe_permissions():
    """Test that cafe staff can access the fixed views"""
    print("🧪 TESTING CAFE STAFF PERMISSIONS")
    print("=" * 50)
    
    User = get_user_model()
    
    # Get cafe user
    try:
        cafe_user = User.objects.get(username='cafe_test')
        print(f"✅ Found cafe user: {cafe_user.username} ({cafe_user.get_full_name()})")
        print(f"   Role: {cafe_user.role}")
    except User.DoesNotExist:
        print("❌ Cafe user not found!")
        return
    
    # Create test client and login
    client = Client()
    login_success = client.login(username='cafe_test', password='cafe123')
    
    if not login_success:
        print("❌ Failed to login as cafe user!")
        return
    
    print("✅ Successfully logged in as cafe user")
    
    # Test URLs that should now be accessible
    test_urls = [
        ('/attendance/', 'Attendance List'),
        ('/students/', 'Student List'),
        ('/attendance/meal/', 'Meal Attendance'),
        ('/cafe-dashboard/', 'Cafe Dashboard'),
    ]
    
    print(f"\n📋 TESTING URL ACCESS:")
    for url, name in test_urls:
        try:
            response = client.get(url)
            if response.status_code == 200:
                print(f"   ✅ {name}: {url} → 200 OK")
            elif response.status_code == 302:
                print(f"   🔄 {name}: {url} → 302 Redirect")
            elif response.status_code == 403:
                print(f"   ❌ {name}: {url} → 403 FORBIDDEN")
            else:
                print(f"   ⚠️  {name}: {url} → {response.status_code}")
        except Exception as e:
            print(f"   💥 {name}: {url} → Error: {e}")
    
    print(f"\n🎯 SUMMARY:")
    print("   ✅ Cafe staff should now have access to:")
    print("      - View attendance records")
    print("      - View student list") 
    print("      - Record meal attendance")
    print("      - Access cafe dashboard")
    
    print(f"\n🔐 CREDENTIALS FOR TESTING:")
    print("   Username: cafe_test")
    print("   Password: cafe123")
    print("   URL: http://127.0.0.1:8000/login/")

if __name__ == "__main__":
    try:
        test_cafe_permissions()
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
