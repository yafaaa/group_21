import requests
print('Fetching /api/departments/')
try:
    r = requests.get('http://127.0.0.1:8001/api/departments/')
    print('status', r.status_code)
    print(r.text)
except Exception as e:
    print('error', e)
