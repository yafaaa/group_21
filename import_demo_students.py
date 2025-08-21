#!/usr/bin/env python
"""
Script to import demo students for project demonstration
"""

import os
import django
from django.utils import timezone
from datetime import date
import random

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'campus_site.settings')
django.setup()

from core.models import User, Student, Department, StudentDepartment

# List of student names to import
STUDENT_NAMES = [
    "Sadam Abdulaziz Omer",
    "Salem Yoseph Abate",
    "Samuel Atnafu Kebede",
    "Samuel Asmare Adane",
    "Samuel Dejen Mulu",
    "Samuel Negasa",
    "Samuel Negasa Mitiku",
    "Samuel Tilahun Debebe",
    "Sara Abera Tefera",
    "Saron Miruts Kassaye",
    "Sartu Daniel Kifle",
    "Sebrina Mohammed Abdulkadir",
    "Sefefe Dagne Abebe",
    "Seid Ahmed Hassen",
    "Seid Muhidin Ali",
    "Selam Kiflay Tekle",
    "Selamawit Fikru Assefa",
    "Selamawit Mekbib Mindaye",
    "Selamawit Yemane Tsegay",
    "Selome Gebergiorgis Fitwi",
    "Sena Birhanu Tufa",
    "Sena Dufera Bekele",
    "Seniya Sultan Jemal",
    "Shahon Gezahegne Gebre",
    "Shanbel Mohammed Ali",
    "Sifin Teshal",
    "Siket Terefe Zeleke",
    "Sinaf Debeli Belina",
    "Solomon Belay Mengesha",
    "Solomon Dawit Sadeta",
    "SOLYANA AYELE MEKONEN",
    "Sophonias Amsale Wube",
    "Stephen Pakateng Chaplain",
    "Surafel Alemu Belachew",
    "Surafiel Beyene Agegnehu",
    "Suud Abrar Gelan",
    "Talaksew Agegnehu Misganaw",
    "Teklay Negasi Amare",
    "TEMESGEN ABDISSA HERPA",
    "Temesgen Melaku Walelign",
    "Tesfahun Kere Gela",
    "Tesfanesh Asefa Tsofo",
    "Tesfatsion Gudeta",
    "Tesfatsion Gudeta Qalbessa",
    "Tesnim Abdurahman jemal",
    "Tewelde Gebre Asefa",
    "Tewodros Beshah Yifru",
    "Tilahun goitom Gebremedhin",
    "Tinsae Teferi Tilahun",
    "Titi Libargachew Demlie",
    "Tsedeke Techane Molla",
    "Tsedeniya Fiseha Woldemichael",
    "Tsegay Assefa Kidane",
    "Urji Eyasu Mijena",
    "USMAN MOHAMMEDNUR ABA JIHAD",
    "Victoria Getachew Asfaw",
    "Webi Getahun Inika",
    "Weldamlak Ayenew Endalew",
    "Werke Ayalew Gebreyohannes",
    "Werknew Mesfn Wibet",
    "William Medhanye Tesfay",
    "WONDIMAGEGN SHALA BOGALE",
    "Yadel Negede Gebeyhu",
    "Yafet Abiyot Alemu",
    "Yafet Gidey Abraha",
    "Yafet Michael Lakew",
    "Yafet Tesfaye Yelima",
    "Yafet Yilma Gebremariyam",
    "Yared Berhanu Bodena",
    "Yared Tekle Gebremeskel",
    "Yared Teklegiorgis Birhane",
    "Yasmin Anwar Adem",
    "Yassir Hamza Yassin",
    "Yeab Gashawbeza Ayalew",
    "Yeabisra Kefene Gerbaba",
    "Yeabsira Abdela Aydiko",
    "Yeabsira Getachew Goshu",
    "YEABSIRA MIHRET MARYIHUN",
    "Yeabsra Hailemariam Biressaw",
    "Yehabesha Freheiwot Wolde",
    "Yehualeshet Temesgen Petros",
    "Yesundink Enyew Mamo",
    "Yilkal Bewuketu Takele",
    "Yohannes Biruk Demeke",
    "yohannes Habtamu Bayissa",
    "Yohannes Solomon Kebede",
    "yohannes yifru degife",
    "Yohannis Bekele Bacha",
    "Yonas Birhanu Heyi",
]

def create_username(full_name):
    """Create a unique username from full name"""
    # Remove extra spaces and convert to lowercase
    name_parts = full_name.strip().split()
    
    # Take first name and last name
    if len(name_parts) >= 2:
        username = f"{name_parts[0].lower()}.{name_parts[-1].lower()}"
    else:
        username = name_parts[0].lower()
    
    # Remove any non-alphanumeric characters except dots
    username = ''.join(c for c in username if c.isalnum() or c == '.')
    
    # Ensure uniqueness
    base_username = username
    counter = 1
    while User.objects.filter(username=username).exists():
        username = f"{base_username}{counter}"
        counter += 1
    
    return username

def create_student_id(full_name, index):
    """Create a unique student ID"""
    # Use ITC + three digit number
    student_id = f"ITC{index+1:03d}"
    
    # Ensure uniqueness
    base_id = student_id
    counter = 1
    while Student.objects.filter(student_id=student_id).exists():
        student_id = f"ITC{index+1:03d}_{counter}"
        counter += 1
    
    return student_id

def parse_name(full_name):
    """Parse full name into first, middle, last"""
    name_parts = full_name.strip().split()
    
    if len(name_parts) == 1:
        return name_parts[0], "", ""
    elif len(name_parts) == 2:
        return name_parts[0], "", name_parts[1]
    else:
        return name_parts[0], " ".join(name_parts[1:-1]), name_parts[-1]

def main():
    print("🎓 Starting import of demo students...")
    
    # Get all departments for random assignment
    departments = list(Department.objects.all())
    if not departments:
        print("❌ No departments found! Please create departments first.")
        return
    
    print(f"📚 Found {len(departments)} departments:")
    for dept in departments:
        print(f"   - {dept.name} ({dept.code})")
    
    created_count = 0
    skipped_count = 0
    
    for index, full_name in enumerate(STUDENT_NAMES):
        try:
            # Parse the name
            first_name, middle_name, last_name = parse_name(full_name)
            
            # Create username
            username = create_username(full_name)
            
            # Check if user already exists
            if User.objects.filter(username=username).exists():
                print(f"⚠️  User {username} already exists, skipping...")
                skipped_count += 1
                continue
            
            # Create User
            user = User.objects.create_user(
                username=username,
                first_name=first_name,
                middle_name=middle_name,
                last_name=last_name,
                email=f"{username}@summercamp.edu",
                role=User.ROLE_STUDENT,
                password="demo123"  # Simple password for demo
            )
            
            # Create Student
            student_id = create_student_id(full_name, index)
            student = Student.objects.create(
                user=user,
                student_id=student_id,
                enrolled_date=date.today()
            )
            
            # Assign to 1-2 random departments
            num_departments = random.randint(1, 2)
            selected_departments = random.sample(departments, num_departments)
            
            for i, dept in enumerate(selected_departments):
                StudentDepartment.objects.create(
                    student=student,
                    department=dept,
                    joined_on=date.today(),
                    is_primary=(i == 0)  # First department is primary
                )
            
            dept_names = ", ".join([d.code for d in selected_departments])
            print(f"✅ Created: {full_name} (ID: {student_id}) - Departments: {dept_names}")
            created_count += 1
            
        except Exception as e:
            print(f"❌ Error creating {full_name}: {str(e)}")
            continue
    
    print(f"\n🎉 Import completed!")
    print(f"   ✅ Created: {created_count} students")
    print(f"   ⚠️  Skipped: {skipped_count} students")
    print(f"   📊 Total in database: {Student.objects.count()} students")
    
    # Show department distribution
    print(f"\n📈 Department Distribution:")
    for dept in departments:
        count = Student.objects.filter(departments=dept).count()
        print(f"   {dept.name}: {count} students")

if __name__ == "__main__":
    main()
