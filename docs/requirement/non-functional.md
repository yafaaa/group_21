# Non-Functional Requirements

This document outlines the key system-wide quality attributes that the INSA Talent Student Management System must meet.

---

## 1. Security (High Priority)

- The system shall enforce **strong password policies** for all users.
- The system shall use **HTTPS** for all client-server communication.
- The system shall implement **role-based access control (RBAC)** to restrict access to resources.
- All sensitive data (e.g., passwords) shall be **encrypted at rest** and **in transit**.
- The system shall provide **audit logging** for critical operations (e.g., student deletion, challenge assignment).
- The system shall guard against **common vulnerabilities** such as:
  - SQL injection
  - Cross-site scripting (XSS)
  - Broken authentication
  - Insecure deserialization

---

## 2. Latency and Performance

- The system shall return **90% of all API responses within 300ms** under normal load.
- Student login and password change operations shall complete within **500ms**.
- The system shall be **optimized for low-latency responses** even at the cost of strong consistency (eventual consistency acceptable).
- Room assignment and challenge creation operations shall be **asynchronous** or **queued if needed** to avoid frontend blocking.

---

## 3. Availability > Consistency

- The system shall prioritize **high availability** and **graceful failure** over strict data consistency.
- In case of a partial failure (e.g., group chat down), other modules (e.g., login, profile access) must remain operational.
- Retry logic and fallback mechanisms shall be implemented for all critical services.

---

## 4. Reliability

- The system shall ensure **99.9% uptime** during active periods (daytime operation).
- All challenge participation and case data must be **persisted and recoverable** even during failure events.
- Backups of all critical data (student profiles, challenge history, cases) must be taken **at least once per day**.

---

## 5. Decoupling and Maintainability

- The system shall be designed as a **loosely coupled set of modules** (e.g., user management, challenge management, chat).
- Each module shall:
  - Have a well-defined API contract
  - Be testable in isolation
  - Allow independent deployment if needed
- Code shall follow **clean architecture principles** (controller, service, repository separation).
- Logs and errors must be centralized for easier monitoring and debugging.

---

## 6. Accessibility and Usability

- The system shall be usable on standard desktop and laptop devices (mobile optional at this stage).
- All system notifications and actions must be **visually clear** and follow consistent UI/UX patterns.
- Critical flows like login, password reset, and challenge submission shall be **tested for usability**.

---

## 7. Documentation

- System documentation (requirements, API contracts, architecture diagrams) shall be stored in version-controlled markdown files and kept up to date.
- API docs shall be automatically generated using **Swagger** based on the implemented endpoints.

---

## Out of Scope (For Now)

- Horizontal scalability (multi-server architecture)
- Real-time performance monitoring or auto-scaling
- Multi-language or multi-tenant support