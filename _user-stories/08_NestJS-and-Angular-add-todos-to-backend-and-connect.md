# Video 08 - NestJS and Angular -- Add Todo Entity & Connect w/ FE

Video Link: https://youtu.be/lWllBdKUzwQ

## Prerequisites:
- Angular Cli
- NestJS Cli
- npm
- docker
- NodeJS

## Story:
This time we want to handle the todos in our backend. For this we need our Todo Entity, 
so we can store the todos in our database.
We also want to improve our websockets handling, e.g. save the connection of our user to the database,
so we can later send him a message/event when an other user is making changes in the todo list.

## Acceptance Criteria:
1. (finished) Todos can be stored in the database
2. (finished) Setup some todos on app Startup (Backend)
3. (finished) Send the todos to our Frontend (to a user) when the user connects against our gateway
