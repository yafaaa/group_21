from rest_framework import viewsets
from rest_framework import permissions
from . import models, serializers


# Minimal, readable viewsets. They allow list/retrieve/create by default.
class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = models.Department.objects.all()
    serializer_class = serializers.DepartmentSerializer
    permission_classes = [permissions.AllowAny]


class StudentViewSet(viewsets.ModelViewSet):
    queryset = models.Student.objects.select_related('user').all()
    serializer_class = serializers.StudentSerializer
    permission_classes = [permissions.AllowAny]


class MentorViewSet(viewsets.ModelViewSet):
    queryset = models.Mentor.objects.select_related('user').prefetch_related('departments').all()
    serializer_class = serializers.MentorSerializer
    permission_classes = [permissions.AllowAny]


class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = models.Attendance.objects.select_related('student__user').all()
    serializer_class = serializers.AttendanceSerializer
    permission_classes = [permissions.AllowAny]
