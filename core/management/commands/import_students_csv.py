import csv
import os
import re
from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth import get_user_model
from core.models import Student, Department
from django.db import transaction

User = get_user_model()


class Command(BaseCommand):
    help = 'Import students from CSV file with auto-generated credentials'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='Path to CSV file containing student names')
        parser.add_argument(
            '--department',
            type=str,
            help='Department code to assign students to (optional)',
            default=None
        )
        parser.add_argument(
            '--dry-run',
            action='store_true',
            help='Preview what would be imported without saving to database',
        )

    def handle(self, *args, **options):
        csv_file = options['csv_file']
        department_code = options['department']
        dry_run = options['dry_run']

        # Validate file exists
        if not os.path.exists(csv_file):
            raise CommandError(f'CSV file "{csv_file}" does not exist.')

        # Get department if specified
        department = None
        if department_code:
            try:
                department = Department.objects.get(code=department_code)
            except Department.DoesNotExist:
                raise CommandError(f'Department with code "{department_code}" does not exist.')

        imported_count = 0
        skipped_count = 0
        errors = []

        self.stdout.write(f"{'DRY RUN: ' if dry_run else ''}Importing students from {csv_file}")
        if department:
            self.stdout.write(f"Default department: {department.name}")

        try:
            with open(csv_file, 'r', encoding='utf-8') as file:
                # Try to detect if first row is header
                first_line = file.readline().strip()
                file.seek(0)  # Reset file pointer
                
                reader = csv.reader(file)
                
                # Skip header if it looks like one
                if first_line.lower() in ['full name', 'name', 'student name', 'full_name']:
                    next(reader)

                with transaction.atomic():
                    for row_num, row in enumerate(reader, start=1):
                        if not row or not row[0].strip():
                            continue  # Skip empty rows

                        full_name = row[0].strip()
                        
                        try:
                            student_data = self._process_student_name(full_name)
                            
                            if dry_run:
                                self.stdout.write(
                                    f"Row {row_num}: {student_data['full_name']} -> "
                                    f"ID: {student_data['student_id']}, "
                                    f"Username: {student_data['username']}, "
                                    f"Password: {student_data['password']}"
                                )
                                imported_count += 1
                            else:
                                success = self._create_student(student_data, department)
                                if success:
                                    imported_count += 1
                                    self.stdout.write(
                                        self.style.SUCCESS(
                                            f"✓ Created: {student_data['full_name']} ({student_data['student_id']})"
                                        )
                                    )
                                else:
                                    skipped_count += 1
                                    
                        except Exception as e:
                            error_msg = f"Row {row_num} - {full_name}: {str(e)}"
                            errors.append(error_msg)
                            self.stdout.write(self.style.ERROR(f"✗ {error_msg}"))

                    if dry_run:
                        # Rollback the transaction for dry run
                        transaction.set_rollback(True)

        except Exception as e:
            raise CommandError(f'Error reading CSV file: {str(e)}')

        # Summary
        self.stdout.write("\n" + "="*50)
        self.stdout.write(f"{'DRY RUN ' if dry_run else ''}IMPORT SUMMARY:")
        self.stdout.write(f"Successfully processed: {imported_count}")
        self.stdout.write(f"Skipped (already exists): {skipped_count}")
        self.stdout.write(f"Errors: {len(errors)}")
        
        if errors:
            self.stdout.write("\nErrors encountered:")
            for error in errors:
                self.stdout.write(f"  - {error}")

    def _process_student_name(self, full_name):
        """Process a full name and generate student credentials"""
        # Clean and split the name
        name_parts = self._clean_name(full_name).split()
        
        if len(name_parts) < 2:
            raise ValueError(f"Name must have at least first and last name: {full_name}")

        first_name = name_parts[0]
        last_name = name_parts[-1]
        middle_name = ' '.join(name_parts[1:-1]) if len(name_parts) > 2 else ''

        # Generate student ID (ITC + 4 digits)
        student_id = self._generate_student_id()
        
        # Generate username (unique, based on name)
        username = self._generate_username(first_name, last_name, middle_name)
        
        # Generate password (unique, name-based)
        password = self._generate_password(first_name, last_name)

        return {
            'full_name': full_name,
            'first_name': first_name,
            'last_name': last_name,
            'middle_name': middle_name,
            'student_id': student_id,
            'username': username,
            'password': password
        }

    def _clean_name(self, name):
        """Clean and normalize name string"""
        # Remove extra whitespace and special characters
        name = re.sub(r'\s+', ' ', name.strip())
        # Remove parentheses and content inside them
        name = re.sub(r'\([^)]*\)', '', name)
        # Remove extra whitespace again
        name = re.sub(r'\s+', ' ', name.strip())
        return name

    def _generate_student_id(self):
        """Generate unique student ID starting with ITC"""
        # Find the highest existing student ID number
        existing_ids = Student.objects.filter(
            student_id__startswith='ITC'
        ).values_list('student_id', flat=True)
        
        max_num = 3000  # Starting number
        for student_id in existing_ids:
            try:
                num = int(student_id[3:])  # Extract number after 'ITC'
                max_num = max(max_num, num)
            except (ValueError, IndexError):
                continue
        
        return f"ITC{max_num + 1:04d}"

    def _generate_username(self, first_name, last_name, middle_name):
        """Generate unique username based on name"""
        # Base username: first name + first letter of last name
        base_username = f"{first_name.lower()}{last_name[0].lower()}"
        
        # Remove non-alphanumeric characters
        base_username = re.sub(r'[^a-z0-9]', '', base_username)
        
        # Ensure minimum length
        if len(base_username) < 4:
            base_username = base_username + last_name.lower()
            base_username = re.sub(r'[^a-z0-9]', '', base_username)[:8]
        
        username = base_username[:8]  # Limit to 8 characters
        
        # Make it unique by adding numbers if needed
        counter = 1
        original_username = username
        while User.objects.filter(username=username).exists():
            username = f"{original_username}{counter}"
            counter += 1
            if counter > 99:  # Safety check
                username = f"{original_username}{counter}"
                break
        
        return username

    def _generate_password(self, first_name, last_name):
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
        
        return password[:10]  # Limit to 10 characters

    def _create_student(self, student_data, department=None):
        """Create student and user records"""
        try:
            # Check if user already exists
            if User.objects.filter(username=student_data['username']).exists():
                return False  # Skip existing users
            
            # Check if student ID already exists
            if Student.objects.filter(student_id=student_data['student_id']).exists():
                # This shouldn't happen with our ID generation, but just in case
                student_data['student_id'] = self._generate_student_id()
            
            # Create user
            user = User.objects.create_user(
                username=student_data['username'],
                password=student_data['password'],
                first_name=student_data['first_name'],
                last_name=student_data['last_name'],
                role=User.ROLE_STUDENT
            )
            
            # Set middle name if provided
            if student_data['middle_name']:
                user.middle_name = student_data['middle_name']
                user.save()
            
            # Create student profile
            student = Student.objects.create(
                user=user,
                student_id=student_data['student_id']
            )
            
            # Assign to department if provided
            if department:
                from core.models import StudentDepartment
                StudentDepartment.objects.create(
                    student=student,
                    department=department
                )
            
            return True
            
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error creating student: {str(e)}"))
            return False
