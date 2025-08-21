import requests
from bs4 import BeautifulSoup
s = requests.Session()
r = s.get('http://127.0.0.1:8001/students/add/')
print('GET form', r.status_code)
soup = BeautifulSoup(r.text, 'html.parser')
csrftoken = None
for inp in soup.find_all('input'):
    if inp.get('name')=='csrfmiddlewaretoken':
        csrftoken = inp.get('value')
        break
print('csrf token present', bool(csrftoken))
post = {
    'csrfmiddlewaretoken': csrftoken,
    'username': 'charlie',
    'first_name': 'Charlie',
    'last_name': 'Brown',
    'email': 'charlie@example.com',
    'password': 'secret',
    'student_id': 'S2001',
    'enrolled_date': '2025-08-17',
}
headers = {'Referer':'http://127.0.0.1:8001/students/add/'}
resp = s.post('http://127.0.0.1:8001/students/add/', data=post, headers=headers)
print('POST status', resp.status_code)
r2 = s.get('http://127.0.0.1:8001/students/')
print('Students page status', r2.status_code)
print(r2.text[:800])
