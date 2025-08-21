This is a small Django migration of the original Node.js project.

Quick start (Windows PowerShell):

1. Activate the venv:

   .\env\Scripts\Activate.ps1

2. Install dependencies (if needed):

   python -m pip install -r requirements.txt

3. Apply migrations (already done in this workspace):

   python manage.py migrate

4. Create a superuser:

   python manage.py createsuperuser

5. Run the dev server:

   python manage.py runserver

Notes:
- The `core` app contains models that correspond to your Node.js models
  (User, Student, Mentor, Department, Attendance, Dorm, etc.).
- I kept comments and code intentionally human-style so it reads like hand-written code.
