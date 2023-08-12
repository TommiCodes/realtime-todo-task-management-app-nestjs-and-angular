# Video 03 - NestJS Login and Registration Endpoints (JWT and Password hashing)

Video Link: https://youtu.be/PYwXs2lqqAE

## Prerequisites:
- Angular Cli
- NestJS Cli
- npm
- docker
- NodeJS

## Story:
To build our TODO Api later correctly we always need to know who the user is and which roles/rights does he has.
For this we provide Endpoints for Login and Register.
The Login Endpoint will return a JWT, which we then can attach to every request against our backend.
The JWT Token should then be always validated.

## Acceptance Criteria:
1. (finished) Endpoints for User Registration and Login exists
2. (finished) The password will be stored as a hash in the database
3. (finished) Endpoints can be used with Postman
