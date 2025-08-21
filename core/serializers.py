from rest_framework import serializers
from . import models


# Simple serializers that expose common fields. Kept intentionally plain so
# you can extend them quickly.
class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Department
        fields = ['id', 'name', 'code', 'description']


class UserSmallSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ['id', 'username', 'first_name', 'last_name', 'role']


class DormSerializer(serializers.ModelSerializer):
    current_occupancy = serializers.ReadOnlyField()
    is_full = serializers.ReadOnlyField()
    
    class Meta:
        model = models.Dorm
        fields = ['id', 'name', 'address', 'capacity', 'current_occupancy', 'is_full']


class StudentSerializer(serializers.ModelSerializer):
    user = UserSmallSerializer(read_only=True)
    dorm = DormSerializer(read_only=True)

    class Meta:
        model = models.Student
        fields = ['id', 'student_id', 'enrolled_date', 'user', 'dorm']


class MentorSerializer(serializers.ModelSerializer):
    user = UserSmallSerializer(read_only=True)
    departments = DepartmentSerializer(many=True, read_only=True)

    class Meta:
        model = models.Mentor
        fields = ['id', 'title', 'phone', 'user', 'departments']


class AttendanceSerializer(serializers.ModelSerializer):
    student = StudentSerializer(read_only=True)
    student_id = serializers.IntegerField(write_only=True)
    recorded_by = UserSmallSerializer(read_only=True)

    class Meta:
        model = models.Attendance
        fields = ['id', 'student', 'student_id', 'date', 'attendance_type', 'meal_type', 'notes', 'recorded_by', 'created_at']
        
    def validate(self, data):
        # If it's a meal, ensure the student doesn't already have the same meal on that day
        if data.get('attendance_type') == models.Attendance.TYPE_MEAL:
            student_id = data.get('student_id')
            date = data.get('date')
            meal_type = data.get('meal_type')
            
            if not meal_type:
                raise serializers.ValidationError({'meal_type': 'Meal type is required for meal attendance.'})
                
            if models.Attendance.objects.filter(
                student_id=student_id, 
                date=date,
                attendance_type=models.Attendance.TYPE_MEAL,
                meal_type=meal_type
            ).exists():
                raise serializers.ValidationError("Student already has this meal registered for that date.")
        return data

    def create(self, validated_data):
        student_id = validated_data.pop('student_id')
        validated_data['student_id'] = student_id
        # Set recorded_by to the current user if available
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            validated_data['recorded_by'] = request.user
        return super().create(validated_data)
