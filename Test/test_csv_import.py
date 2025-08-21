#!/usr/bin/env python3
"""
Test script for CSV import functionality.
This script creates a sample CSV file and tests both the management command and web interface.
"""

import os
import sys
import django

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'campus_site.settings')
django.setup()

import csv
import requests
from io import StringIO
from django.core.management import call_command
from core.models import Student, User, Department

def create_sample_csv():
    """Create a sample CSV file with test student names"""
    sample_names = [
        "Full Name",  # Header
        "Abrham Tesfaye Aklilu",
        "Ferhan Sadat Nesha", 
        "Abadi Adanew Gebreslasie",
        "Abay Zinabu Sisay",
        "Abdella Ahmed Yasin",
        "Michael Johnson Smith",
        "Sarah Elizabeth Wilson",
        "Ahmed Hassan Ali",
        "Maria Garcia Rodriguez",
        "David Chen Wang"
    ]
    
    csv_file_path = "sample_students.csv"
    with open(csv_file_path, 'w', newline='', encoding='utf-8') as file:
        for name in sample_names:
            file.write(name + "\n")
    
    print(f"✅ Created sample CSV file: {csv_file_path}")
    return csv_file_path

def test_management_command(csv_file_path):
    """Test the Django management command for CSV import"""
    print("\n🔧 Testing Management Command...")
    print("=" * 50)
    
    # Test dry run first
    print("1. Testing dry run preview:")
    try:
        call_command('import_students_csv', csv_file_path, '--dry-run')
        print("✅ Dry run completed successfully!")
    except Exception as e:
        print(f"❌ Dry run failed: {e}")
        return False
    
    # Get initial student count
    initial_count = Student.objects.count()
    print(f"\n2. Initial student count: {initial_count}")
    
    # Test actual import
    print("3. Testing actual import:")
    try:
        call_command('import_students_csv', csv_file_path)
        print("✅ Import completed successfully!")
    except Exception as e:
        print(f"❌ Import failed: {e}")
        return False
    
    # Check results
    final_count = Student.objects.count()
    imported_count = final_count - initial_count
    print(f"✅ Imported {imported_count} students (Total: {final_count})")
    
    # Show some imported students
    print("\n📋 Sample imported students:")
    recent_students = Student.objects.order_by('-id')[:5]
    for student in recent_students:
        print(f"  - {student.user.get_full_name()} | ID: {student.student_id} | Username: {student.user.username}")
    
    return True

def test_web_interface():
    """Test the web interface for CSV import"""
    print("\n🌐 Testing Web Interface...")
    print("=" * 50)
    
    try:
        # Check if the server is running
        response = requests.get('http://localhost:8000/csv-import/', timeout=5)
        
        if response.status_code == 200:
            print("✅ CSV import page is accessible")
            print("✅ Web interface is ready for testing")
            print("📝 To test manually:")
            print("   1. Visit: http://localhost:8000/csv-import/")
            print("   2. Upload the sample_students.csv file")
            print("   3. Preview the import")
            print("   4. Confirm the import")
        else:
            print(f"⚠️ CSV import page returned status {response.status_code}")
            
    except requests.exceptions.RequestException as e:
        print("⚠️ Web server not running or not accessible")
        print("💡 To test the web interface:")
        print("   1. Start the server: python manage.py runserver")
        print("   2. Visit: http://localhost:8000/csv-import/")
        print("   3. Upload the sample_students.csv file")

def show_password_examples():
    """Show examples of generated passwords for reference"""
    print("\n🔐 Password Generation Examples:")
    print("=" * 50)
    
    # Get some recently created students
    recent_students = Student.objects.order_by('-id')[:3]
    
    if recent_students:
        print("📝 Recent students with their generated credentials:")
        for student in recent_students:
            # Note: We can't show actual passwords as they're hashed
            # But we can show the pattern
            name = student.user.get_full_name()
            username = student.user.username
            print(f"  Name: {name}")
            print(f"  Student ID: {student.student_id}")
            print(f"  Username: {username}")
            print(f"  Password: [Generated based on name - format: first3chars+last2chars+numbers]")
            print()
    else:
        print("No students found. Import some students first.")

def cleanup_test_data():
    """Optionally cleanup test data"""
    print("\n🧹 Cleanup Options:")
    print("=" * 50)
    
    test_students = Student.objects.filter(student_id__startswith='ITC3')
    count = test_students.count()
    
    if count > 0:
        print(f"Found {count} test students with IDs starting with ITC3")
        response = input("Do you want to delete them? (y/N): ").strip().lower()
        
        if response == 'y':
            # Delete users (which will cascade to students)
            user_ids = test_students.values_list('user_id', flat=True)
            User.objects.filter(id__in=user_ids).delete()
            print(f"✅ Deleted {count} test students")
        else:
            print("Test data kept.")
    else:
        print("No test students found to cleanup.")

def main():
    """Main test function"""
    print("🧪 CSV Import Testing Script")
    print("=" * 50)
    
    # Create sample CSV file
    csv_file_path = create_sample_csv()
    
    # Test management command
    success = test_management_command(csv_file_path)
    
    if success:
        # Test web interface availability
        test_web_interface()
        
        # Show password examples
        show_password_examples()
        
        # Offer cleanup
        cleanup_test_data()
    
    # Cleanup CSV file
    if os.path.exists(csv_file_path):
        os.remove(csv_file_path)
        print(f"\n🗑️ Cleaned up CSV file: {csv_file_path}")
    
    print("\n✅ Testing completed!")
    print("\n📚 CSV Import Features Available:")
    print("  1. Management Command: python manage.py import_students_csv <file.csv>")
    print("  2. Web Interface: http://localhost:8000/csv-import/")
    print("  3. Automatic ID generation: ITC3001, ITC3002, ...")
    print("  4. Smart username generation based on names")
    print("  5. Secure password generation with name correlation")

if __name__ == "__main__":
    main()
