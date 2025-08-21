import requests
import json
from datetime import date

# Test concurrent meal management by multiple cafe assistants
session = requests.Session()

# Test data for meal attendance
test_student_id = "S1001"  # Assuming this exists
test_date = str(date.today())

print("Testing meal attendance constraints...")

# Try to register breakfast for the same student
meal_data = {
    "student": 1,  # Assuming student ID 1 exists
    "date": test_date,
    "attendance_type": "MEAL",
    "meal_type": "BREAKFAST",
    "notes": "First breakfast attempt"
}

# First request should succeed
try:
    r1 = session.post('http://127.0.0.1:8001/api/attendance/', 
                     data=meal_data, 
                     headers={'Content-Type': 'application/x-www-form-urlencoded'})
    print(f"First breakfast registration: {r1.status_code}")
    if r1.status_code >= 400:
        print(f"Error: {r1.text}")
except Exception as e:
    print(f"Request failed: {e}")

# Second request with same meal should fail due to constraint
meal_data["notes"] = "Duplicate breakfast attempt"
try:
    r2 = session.post('http://127.0.0.1:8001/api/attendance/', 
                     data=meal_data,
                     headers={'Content-Type': 'application/x-www-form-urlencoded'})
    print(f"Duplicate breakfast registration: {r2.status_code}")
    if r2.status_code >= 400:
        print(f"Expected error (good): {r2.text[:200]}")
except Exception as e:
    print(f"Request failed: {e}")

print("Test completed!")
