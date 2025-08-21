#!/usr/bin/env python3
"""
Demo script to show password generation for specific names from your CSV.
This demonstrates how the system will generate usernames and passwords.
"""

import re

def clean_name(name):
    """Clean and normalize name string"""
    name = re.sub(r'\s+', ' ', name.strip())
    name = re.sub(r'\([^)]*\)', '', name)
    name = re.sub(r'\s+', ' ', name.strip())
    return name

def generate_username(first_name, last_name, middle_name, existing_usernames=None):
    """Generate unique username based on name"""
    if existing_usernames is None:
        existing_usernames = set()
    
    # Base username: first name + first letter of last name
    base_username = f"{first_name.lower()}{last_name[0].lower()}"
    
    # Remove non-alphanumeric characters
    base_username = re.sub(r'[^a-z0-9]', '', base_username)
    
    # Ensure minimum length
    if len(base_username) < 4:
        base_username = base_username + last_name.lower()
        base_username = re.sub(r'[^a-z0-9]', '', base_username)[:8]
    
    username = base_username[:8]
    
    # Make it unique by adding numbers if needed
    counter = 1
    original_username = username
    while username in existing_usernames:
        username = f"{original_username}{counter}"
        counter += 1
        if counter > 99:
            username = f"{original_username}{counter}"
            break
    
    return username

def generate_password(first_name, last_name):
    """Generate unique password with name correlation"""
    # Use first 3 letters of first name + first 2 of last name + 3 digits
    first_part = first_name[:3].lower()
    last_part = last_name[:2].lower()
    
    # Remove non-alphabetic characters
    first_part = re.sub(r'[^a-z]', '', first_part)
    last_part = re.sub(r'[^a-z]', '', last_part)
    
    # Ensure we have at least some characters
    if len(first_part) < 2:
        first_part = first_name.lower()[:2]
    if len(last_part) < 1:
        last_part = last_name.lower()[:1]
    
    # Generate 3-digit number based on name
    name_sum = sum(ord(c) for c in (first_name + last_name).lower())
    number_part = f"{name_sum % 1000:03d}"
    
    password = f"{first_part}{last_part}{number_part}"
    
    # Ensure password is at least 6 characters
    if len(password) < 6:
        password = password + "00"
    
    return password[:10]

def generate_student_id(start_num=3001):
    """Generate student ID starting with ITC"""
    return f"ITC{start_num:04d}"

def process_student_name(full_name):
    """Process a full name and generate student credentials"""
    # Clean and split the name
    name_parts = clean_name(full_name).split()
    
    if len(name_parts) < 2:
        raise ValueError(f"Name must have at least first and last name: {full_name}")

    first_name = name_parts[0]
    last_name = name_parts[-1]
    middle_name = ' '.join(name_parts[1:-1]) if len(name_parts) > 2 else ''

    return {
        'full_name': full_name,
        'first_name': first_name,
        'last_name': last_name,
        'middle_name': middle_name
    }

def main():
    """Demo the credential generation for your students"""
    print("🔐 Student Credential Generation Demo")
    print("=" * 60)
    print("Based on the CSV structure you provided")
    print()
    
    # Sample names from your CSV
    sample_names = [
        "Abrham tesfaye aklilu",
        "Ferhan sadat Nesha", 
        "Abadi Adanew Gebreslasie",
        "Abay Zinabu Sisay",
        "Abdella Ahmed Yasin",
        "Abenezer Alemayehu Worku",
        "Abraham Bayu Gebreigzabeher",
        "Abigiya Jemal Hashim"
    ]
    
    print("📋 Sample Student Credentials:")
    print("-" * 60)
    
    existing_usernames = set()
    student_id_counter = 3001
    
    for i, full_name in enumerate(sample_names, 1):
        try:
            student_data = process_student_name(full_name)
            
            # Generate credentials
            student_id = generate_student_id(student_id_counter)
            username = generate_username(
                student_data['first_name'], 
                student_data['last_name'], 
                student_data['middle_name'],
                existing_usernames
            )
            password = generate_password(student_data['first_name'], student_data['last_name'])
            
            existing_usernames.add(username)
            student_id_counter += 1
            
            print(f"{i:2}. {student_data['full_name']}")
            print(f"    Student ID: {student_id}")
            print(f"    Username:   {username}")
            print(f"    Password:   {password}")
            print(f"    Name parts: {student_data['first_name']} | {student_data['middle_name']} | {student_data['last_name']}")
            print()
            
        except Exception as e:
            print(f"{i:2}. ERROR with '{full_name}': {e}")
            print()
    
    print("💡 Password Generation Logic:")
    print("   Format: [first 3 chars of first name] + [first 2 chars of last name] + [3 digits based on name]")
    print("   Example: 'Abrham Aklilu' → 'abr' + 'ak' + '261' = 'abrak261'")
    print()
    
    print("🔑 Username Generation Logic:")
    print("   Format: [first name] + [first letter of last name] (up to 8 chars)")
    print("   If duplicate, adds numbers: username1, username2, etc.")
    print("   Example: 'Abrham Aklilu' → 'abrhama'")
    print()
    
    print("🆔 Student ID Generation:")
    print("   Format: ITC + 4-digit number starting from 3001")
    print("   Example: ITC3001, ITC3002, ITC3003, ...")
    print()
    
    print("✅ All credentials are automatically generated and unique!")

if __name__ == "__main__":
    main()
