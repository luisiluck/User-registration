# User Registration & Email Verification System

## Overview

This system allows users to register with their email and password, and requires email verification to activate the account. It follows a service-oriented architecture and includes event-driven communication via Kafka.

## Services

- **User Service**: Handles user registration, validation, persistence, and emits events for further processing.
- **Email Service**: Listens for user registration events and sends verification emails to users.
- **Audit Service**: Subscribes to key events (e.g., registration, verification) and logs them for traceability and compliance purposes.
> Use Cases
![use cases](/src/usecases.png)

## Workflow

1. A user submits their registration details.
2. If valid, the `User Service` creates a new unverified user and emits a `user.registered.event`.
3. The `Email Service` receives this event and sends a verification email containing a token and send a `email.dispatched.event`.
4. The user clicks the verification link or submits the token manually.
5. The `User Service` validates the token and, if valid, updates the user's status to "verified", emitting a `user.verified.event`.
6. The `Audit Service` logs the registration, verification and email dispatching as `user.registered.audit`, `user.updated.audit` and `user.verification.request.audit`.
> User registration sequence
![sequence diagram](src/sequence.jpg)

## Technologies

- **Node.js** for backend services
- **Express** for HTTP server
- **Apache Kafka** for asynchronous event-based communication
- **Docker** for containerization

# BDD Toolchain for Microservices Project

This project follows the **Behavior-Driven Development (BDD)** methodology. Below is a proposed toolchain for implementing automated tests covering:
- HTTP API interactions
- Kafka-based messaging

# Test Strategy

## Overview

This section outlines the strategy for ensuring quality and reliability across the services in this system. The architecture involves multiple services communicating over HTTP and Kafka. We will apply a Behavior-Driven Development (BDD) approach supported by automated testing across different levels.

---

## Objectives

- Validate functional requirements
- Ensure reliable communication between services via HTTP and Kafka
- Automate tests at different layers (unit, integration, end-to-end)
- Detect regressions early via CI pipelines
- Maintain traceability and reproducibility of test results


---

## Test Levels

| Level             | Scope                                      | Tools / Frameworks                  |
|------------------|--------------------------------------------|-------------------------------------|
| Unit Testing      | Individual functions, classes, modules     | Jest / Mocha / Chai                 |
| Integration       | Interaction between internal components    | Cucumber.js, Supertest, KafkaJS, In-memory DBs   |
| End-to-End (E2E)  | Full user scenarios across services        | Cucumber.js, Docker Compose, REST, Kafka |
| Regression        | Ensure new features don't break existing   | Automated suite via CI              |

---

## 🔁 Test Lifecycle

1. **Test Planning**  
   Define scope, scenarios, responsibilities

2. **Test Design**  
   Write Gherkin feature files, test cases, and setup mocks

3. **Test Implementation**  
   Develop automated tests, prepare test data

4. **Test Execution**  
   Run tests in local dev and CI/CD pipelines

5. **Test Reporting**  
   Generate reports (HTML, JSON) and publish artifacts

6. **Defect Management**  
   Log bugs in issue tracker, link to failing tests

---

## Testing Tools

| Purpose            | Tool                                     |
|--------------------|------------------------------------------|
| BDD Framework      | Cucumber.js                              |
| API Testing        | Supertest, Postman, Insomnia             |
| Messaging (Kafka)  | KafkaJS, Testcontainers                  |
| Test Data Setup    | Faker.js, MongoDB Seeding, Mock Servers  |
| Assertion / Mocking| Chai, Sinon, nock                        |
| Reporting          | Mochawesome, Cucumber HTML Reporter      |
| CI/CD Integration  | GitHub Actions, Docker                   |

---

## 🔐 Environment Strategy

| Environment      | Purpose                         | Characteristics                     |
|------------------|----------------------------------|-------------------------------------|
| Local Dev        | Developer testing               | Full-stack with mocks, Docker-based |
| CI (Ephemeral)   | Automated regression checks     | Containerized, isolated, stateless  |

---

## 📦 Test Data Management

- Use seed scripts for predictable test environments
- Mask or anonymize production data for safe usage
- Support dynamic data generation using libraries like `faker.js`

---

## 🔔 HTTP Testing (SuperTest)

- Tests validate:
  - Request and response structure
  - Persistance
  - Alternative flows
- Use Supertest to virtualize http calls

---

## 🔔 Event-Driven Testing (Kafka)

- Consumer and Producer tests validate:
  - Event structure
  - Topic delivery
  - Side effects and idempotency
- Use Kafka mocks or embedded Kafka during tests

---

## ✅ Definition of Done

Each feature is considered **done** when:

- [ ] It has at least one BDD scenario in Gherkin
- [ ] Unit and integration tests are implemented
- [ ] The feature passes all E2E tests in CI
- [ ] Events are validated and published/subscribed correctly
- [ ] Test reports are generated and published

---

## 📊 Reporting & Coverage

- Generate test reports for:
  - Unit: `nyc`, `mochawesome`
  - Integration/E2E: `cucumber-html-reporter`
- Code coverage threshold: **≥ 80%**
- Automated tests effort (Mike Cohn 2009)
  - Unit test: 50%
  - Integration test: 30%
  - E2E test: 20%
- Reports published as artifacts.

---

## 🚀 CI/CD Integration

All tests are executed in CI pipelines on:

- Push to `release` or `main` branches
- Pull Request events
- Nightly regression runs

Stages:

1. Checkout Code
2. Build & Lint
3. Run Unit Tests
4. Spin up Services via Docker
5. Run Integration + E2E Tests
6. Publish Reports

---

## 📌 Risks & Mitigation

| Risk                        | Mitigation Strategy                     |
|-----------------------------|------------------------------------------|
| Flaky E2E Tests             | Use retries, stable test data            |
| Kafka Message Duplication   | Ensure idempotency and deduplication     |
| Long Test Times             | Run tests in parallel, isolate services  |

---

## 📍 References

- [Cucumber.js Documentation](https://github.com/cucumber/cucumber-js)
- [KafkaJS Documentation](https://kafka.js.org/)
- [GitHub Actions Docs](https://docs.github.com/en/actions)

---