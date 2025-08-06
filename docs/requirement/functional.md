# Functional Requirements

## Project Name
**INSA Talent Student Management System**

## Overview

This document outlines the core **functional requirements** of the platform. These are the actions and features the system must provide to meet the needs of administrators, mentors, and students in the INSA Talent Center ecosystem.

---

## 1. Student Account Management

- The system shall allow the administrator to **import a list of students** via file upload (e.g., CSV).
- Upon import, the system shall:
  - Automatically create an account for each student.
  - Assign a default password.
  - Flag each account as "requires password change on first login."
- The system shall allow administrators to **add individual students manually**.
- The system shall redirect new students to **change their password** upon first login.
- The system shall allow administrators to **deactivate any student account**, making the user unable to access the system.

---

## 2. Batch and Building Management

- The system shall allow the administrator to **create a new batch** of students.
- The system shall allow creation of **buildings and room structures** for a batch.
- Upon student arrival at the camp, the system shall allow the administrator to:
  - Assign students to rooms **automatically** in one click based on predefined logic.
- The system shall allow the administrator to **view, edit, or reassign** room allocations.

---

## 3. Mentor Management

- The administrator shall be able to **create mentor accounts**.
- The administrator shall be able to **assign mentors** to student batches or groups.
- Mentors shall be able to:
  - Track assigned students’ contributions.
  - Monitor individual or group progress.

---

## 4. Group Management and Communication

- The administrator shall be able to **group students** based on:
  - Technical track (e.g., AI, Web, Embedded).
  - Group size or other criteria.
- Each student group shall have:
  - A **private group chat**.
  - A **default group admin** (can be assigned or rotated).
- The system shall provide an **announcement chat** for each batch.
  - All students in the batch are added by default.
- Mentors and admins shall have access to the group chats of the students they manage.

---

## 5. Challenge and Badge System

- The administrator or mentor shall be able to **create challenges**.
- Challenges can be shared in:
  - The announcement chat.
  - Specific group chats.
- Students or student groups can **join challenges** via shared links.
- The system shall track which students completed a challenge.
- Students who pass a challenge will be **awarded a badge**, which is shown in their profile.

---

## 6. Case Management

- The administrator or mentor shall be able to **open cases** for students.
  - Case types may include:
    - Disciplinary
    - Medical
    - Other
- Each case shall include:
  - Case title
  - Description
  - Opened by
  - Status (open, resolved)
  - Date opened and resolved
- Students may be notified about certain case types, as configured.

---

## 7. Student Profile Enrichment

- Students shall be able to **onboard personal data** after first login:
  - Emergency contact (e.g., family phone number)
  - Personal background info (e.g., region, education level)
  - Track preference (e.g., Web, AI, Security)
  - Technical stack (languages/tools known)
  - Documents (e.g., ID, medical records)

---

## 8. Access and Authorization

- The system shall implement **role-based access control**:
  - Admins can perform all system operations.
  - Mentors can only access assigned batches or groups.
  - Students can only access their personal and group data.
- Deactivated users must be denied access.

---

## 9. Notifications

- The system shall notify users of:
  - New challenge announcements.
  - Group changes.
  - Case openings.
  - Room assignments.
  - Mentor assignment.

---

## 10. Audit and Tracking

- All major actions (e.g., student import, challenge creation, case management) shall be tracked and visible to admins for audit purposes.

---

## Future Considerations

- Mobile responsiveness or mobile app version.
- Real-time messaging and notifications (WebSockets or polling).
- Exportable reports for attendance, participation, and evaluation.

---
