# realtime-todo-task-management-app-nestjs-and-angular
*Please Remember that this is a hobby project and done in the freetime*

## Requirements
1. Docker

## How to run the Project & additional Docker Commands
1. Run all services: `docker-compose up`

Additional Docker Commands:
1. Rebuild all Images (also run e.g. if you have a new dependency): `docker-compose build --no-cache`
2. Run services with rebuild: `docker-compose up -d --build api frontend postgres postgres_admin`
3. Remove all images: `docker rmi -f $(docker images -a -q)`
4. Remove all containers: `docker rm -vf $(docker ps -a -q)`
5. Remove all Volumes: `docker-compose down -v`
6. Clear all `docker system prune -a --volumes`


## Troubleshooting
1. If your container says for backend: 'Can not find Module: "XXX"' then `cd  todo-api` and `npm run build`

## Setup steps in detail

###
TODO: Health check with NestJS Terminus  
TODO: Health check with Terminus for Database

### Docker & Docker-Compose (Database)
1. Create a "docker-compose.yml" file at the top level of the project
2. Add a "postgres" database service, so that NestJS can connect to it

### [Video 1] NestJS Backend API
1. Install the NestJS cli globally `npm install -g @nestjs/cli`
2. Create the NestJS backend api `nest new todo-api --skip-git`
3. Make sure that all dependencies are installed: `cd todo-api` and `npm install`
4. Run the project and try to connect to the api via Postman `npm run start:dev`
5. Generate all needed modules
   1. Auth Module: `nest generate module auth`
   2. Todo Module: `nest generate module todo`
   3. All Modules should now be generated and also be imported into the main module
6. Generate the User Resource (inside the User Module)
   1. Create the plain User Resource (Module, Controller, Service, Entity and DTO (Domain Transfer Object)) with  
      `cd /src/user` and then `nest generate resource user`
   2. Move the generated Classes to new folders, for example the service into a "services" folder in the user module
7. Set a global prefix to your NestJS api, so that everything is served under the base path "/api"
   1. Open the main.ts and add `app.setGlobalPrefix('api');` accordingly
8. Add Typeorm and the connection to the database
   1. Add access to environment variables via `npm i --save @nestjs/config`
   2. Add the `ConfigModule.forRoot({isGlobal: true})` to the imports of our "app.module"
   3. Add the Typeorm Packages and the Postgres ("pg") packages via `npm install --save @nestjs/typeorm typeorm pg`
   4. Add the Typeorm Module with the configurations ``
9. Create a "Dockerfile" so that the api can be started via docker-compose as a service

### [Video 2] Angular Frontend
1. Install the Angular CLI globally `npm install -g @angular/cli`
2. Create the Angular Frontend with `ng new angular-frontend`
3. Make sure to install all deps: `cd angular-frontend` and `npm install`
4. Set Up our main modules
   1. Create Public Module (here we handle Register and Login of the users): `ng generate module public`
   2. Create Private Module (handles Stuff after login, jwt protected): `ng generate module private`
3. Create dir `/models` and dir `/services`
4. Create a Service to get a value from the todo-api: `ng generate service test` and modify the return from the backend as Json
5. Create a proxy.conf to proxy all requests when running `ng serve` for `/api` against  
   our in container todo-api under `http://api:3000` & add it to our angular.json
6. Add a Dockerfile & then add the service to our docker-compose file
7. Fix the start script in the angular package.json to run inside a container to `"start": "ng serve --host=0.0.0.0 --port 4200 --poll 2000"`  
   Explanation: https://stackoverflow.com/questions/46778868/ng-serve-not-working-in-docker-container
   The "--poll 2000" is needed to get hot reload working
   Other solution could be to use for ex. nginx

### [Video 3] NestJS User Api (Register and Login)
To be able to later build our Realtime Todo Api, we always need to know who the user is and what roles/rights does he has.
For this we provide Endpoints for Login and Register.
The Login Endpoint will return a JWT, which will then be attached to every request against the backend and it should always be validated.

1. Read the Docs about Authentication: https://docs.nestjs.com/security/authentication
2. Install the dependencies via: `npm install --save @nestjs/passport passport passport-jwt passport-local bcrypt @nestjs/jwt`
3. Create the Jwt Strategy under path `/auth/strategies/jwt.strategy.ts` (read more in the docs at 1.)
4. Create the Auth Service under path `/auth/services/auth.service.ts`
5. Create a Guard under path `/auth/guards/jwt.guard.ts`
6. Update imports/providers/... for the AuthModule (make sure to export the authService, so we can use it in other modules)
7. Make sure to add the environment variable for the JWT_SECRET to the docker-compose file
8. Import the AuthModule into the UserModule
9. Create the User Entity & the User Interface
10. Install the package class-validator to check our dto values `npm i --save class-validator class-transformer`
11. Make sure to enable the class validation in main.js by adding: `app.useGlobalPipes(new ValidationPipe());`
12. Create the dtos for login and register
13. Create the login and register Endpoints and Service Functions
14. Run the Api with docker and test it with Postman

### [Video 4] Angular Login & Register Component & Connect with Api

1. Install Angular Material: `ng add @angular/material`
2. Remove old TestService
3. Create Diretories in `angular-frontend/src/app/public`: `/validators`, `/components`, `/services`
4. Create a `public-routing.module.ts` for all routes in our public module
5. Create a `public.private-module.interfaces.ts` for our interfaces
5. Create the components `LoginComponent` and `RegisterComponent` via the cli with the command `ng generate component login` and `ng generate component register`
6. Update the "public-routing.module.ts" and the "app-routing.module.ts"
7. Create the Service `UserService` to make the login and register requests against the api `ng generate service user`
8. Add the login and register functions to the UserService
9. Import the `MatCardModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule` in the PublicModule
10. Import the `MatSnackbarModule` in the AppModule
11. Create the html, scss and logic for the LoginComponent
12. Cretate the html, scss and logic for the RegisterComponent

### [Video 5] Nest.js Websockets with Socket.io, Authentication Middleware & testing with Postman

1. Read the docs: https://docs.nestjs.com/websockets/gateways
2. Install necessary deps: `npm i --save @nestjs/websockets @nestjs/platform-socket.io socket.io`
3. Create file `/todo-api/auth.middleware.ts`
4. Implement the middleware there to authenticate the user who is making a request
5. Add the UserService to the Exports from the user.module
6. Here you can read more about lifecycles: https://docs.nestjs.com/faq/request-lifecycle#summary
6. Add the Middleware Consumer to the `app.module.ts` (on top level of our application)
7. Generate a Websocket Gateway via `cd /todo-api/src/todo` - `nest generate gateway todo`
8. Import UserModule and AuthModule to TodoModule
9. Test the gateway with postman

### [Video 6] Angular - add Jwt Auth handling (with Socket.io & normal http Api)
1. Read what the "@auth0/angular-jwt" package does: https://www.npmjs.com/package/@auth0/angular-jwt?activeTab=readme
2. Then install it: `cd angular-frontend` `npm i @auth0/angular-jwt`
4. Update Angular (https://update.angular.io/?v=14.0-15.0) to work with recent package version: `ng update @angular/core@15 @angular/cli@15` and `ng update @angular/material@15`
5. Remove all legacy imports after the angular update
5. Then install it `cd angular-frontend` `npm install socket.io-client`
6. Add "JwtModule" to Imports from "@auth0/angular-jwt" in "app.module.ts"
7. Make sure to save the jwt from the response of our login request (user.service.ts - login())
8. Add a "getLoggedInUser()" to our user.service to get the user from the jwt
9. Add a "dashboardComponent" to our private module, `cd .\angular-frontend\src\app\private\` & `mkdir components` & `cd components` & `ng g c dashboard`
9. Add a "PrivateRoutingModule" to our routing module & import it in our "private.module"
10. Update the "app-routing.module" and lazy load the private Module
11. Update our "login.component" to navigate to the dashboard after login
12. NestJS, allow cors in our gateway for our angular requests & update the Auth handling (postman will then not work anymore, because no support for auth so far - to work you have to use a raw connection and send the auth token along)
12. Add a "todoService" to our private Module `cd .\angular-frontend\src\app\private\` & `mkdir services` & `cd services` & `ng g s todo`
13. Call our function from the dashboard onInit and see if everything works

### [Video 7] Angular - Init ToDo List with Drag and Drop
1. Create a Card Component, `cd .\angular-frontend\src\app\private\components\` `ng g c card`
2. Create an `private-module.interfaces.ts` file in our private module and create a `TodoItem` interface
3. Add DragDropModule to the imports of our `privateModule`
4. Implement the example from https://material.angular.io/cdk/drag-drop/examples
5. Rename CSS Classes
6. Create TestData with the TodoItem interface, eg.g. 'testData: TodoItem[] = [....]'
7. Update Styles and Html

### [Video 8] NestJS/Angular - handle Todos with Websocket Connection
1. Create a todo interface file in the todo module `src/todo/todo.private-module.interfaces.ts`
2. Create the Todo Interface
3. Create a folder entities in our todo module `cd src/todo` `mkdir entities`
4. Create a file todo.entity.ts `cd entities` `touch todo.entity.ts`
5. Create the todo.entity.ts
6. Create the todo.service to handle the todos and save them in the database
6. Create a interface for the connection against our service in our `todo.private-module.interfaces.ts` and also add a `connected-user.entity.ts`
   to handle the connections of a user, so that we can send push messages
7. Add a `connection.service.ts` to implement the logic for handling and saving our connections
8. Save the connection to our database when a user connects against our gateway (in our gateway.handleConnection)
9. Add the gateway.onHandleDisconnect
10. Add in our Angular frontend a listener to the 'todos' event with socket.io
11. Add a setup Service in Nestjs to add some todos on startup to our database
12. Check that when we connect with our Frontend against the gateway, that we print the Todos for the 'todos' event to our console

### [Video 9] Angular - create Todos /w Reactive Form & Dialog
1. Create new Component `ng g c create-todo` in our Angular Project &
   don't forget ro reference it in the imports of the private module
2. Add ElementRef for the `create-todo.component` to our dashboard, as well as a button to open the ref
3. Create FormGroup in 'create-todo.component'
4. Create form in template für 'create-todo.component'
5. Log out Form onSubmit()
6. Rename `interfaces.ts` to `private-module.interfaces.ts` and create also
   a const file `private-module.consts.ts` and refactor a bit

### [Video 10] NestJS & Angular - handle Events & messages for Todos
#### Handle Todo Create
1. NestJS: Listen @SubscribeMessage('addTodoItem') Event and create a todoItem if the Event is received
   1. Add Listener in todo.gateway.ts
   2. Add save Function to our todo.service.ts
   3. Add findAll() function to connection.service.ts
   4. Distribute the createdTodoItem to all connected Clients/users
2. Angular
   1. Add a saveTodo() method to our todo.service.ts and emit an event matching to our todo.gateway
   2. Call this saveTodo() when we hit save in our create-todo.component
   3. Add a listener to the 'addedTodo' Event so we can catch new Todos and subscribe to it in our dashboard
   4. Add a behaviorSubject to our todo.service, so that we can subscribe in our dashboard to our items
   5. Then in our dashboard component fix some stuff, for example how to filter the items
#### Handle Todo Update
1. NestJS:
   1. Add Listener in todo.gateway.ts and emit the updatedTodo after update to all clients
   2. Add update Function in todo.service.ts
2. Angular:
   1. Add a listener to our todo.service.ts
   2. Add a function to send a todoUpdate to our api
   3. call the todo.service.ts in our dashboard.component, so that we receive updates from our api
   4. call the updateTodo from our service after our drop() function in the dashboard.component