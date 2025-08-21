from django.core.management.base import BaseCommand
from core.models import Department


class Command(BaseCommand):
    help = 'Seed the four technical departments for the summer camp'

    def handle(self, *args, **options):
        departments = [
            {
                'name': 'Embedded and Robotics',
                'code': 'EMBED',
                'description': 'Programming embedded systems, building robots, and IoT projects'
            },
            {
                'name': 'Cyber Security',
                'code': 'CYBER',
                'description': 'Network security, ethical hacking, and digital forensics'
            },
            {
                'name': 'Aerospace',
                'code': 'AERO',
                'description': 'Drone technology, flight systems, and space exploration'
            },
            {
                'name': 'Development',
                'code': 'DEV',
                'description': 'Software development, web applications, and mobile apps'
            }
        ]

        created_count = 0
        for dept_data in departments:
            dept, created = Department.objects.get_or_create(
                name=dept_data['name'],
                defaults={
                    'code': dept_data['code'],
                    'description': dept_data['description']
                }
            )
            if created:
                created_count += 1
                self.stdout.write(
                    self.style.SUCCESS(f'Created department: {dept.name}')
                )
            else:
                self.stdout.write(f'Department already exists: {dept.name}')

        self.stdout.write(
            self.style.SUCCESS(f'Successfully processed {len(departments)} departments ({created_count} created)')
        )
