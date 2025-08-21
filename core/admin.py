from django.contrib import admin
from . import models


# Keep registrations explicit so the admin UI is clear and easy to read.
admin.site.register(models.User)
admin.site.register(models.Department)
admin.site.register(models.Student)
admin.site.register(models.Mentor)
admin.site.register(models.StudentDepartment)
admin.site.register(models.Attendance)
admin.site.register(models.Dorm)
admin.site.register(models.AdminProfile)
