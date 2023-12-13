# VinylHub_Frontend

[Frontend Specific Documentation]

## Initial Set Up

The easiest way to set everything up is to use the following `compose.yml` specification from the parent's folder:

```
services:

  frontend:
    container_name: vinylhub-frontend
    build: ./VinylHub_Frontend
    command: npm run dev
    volumes:
      - ./VinylHub_Frontend/VinylHub:/frontend
      - /frontend/node_modules
    ports:
      - "5173:5173"
    depends_on:
      - backend
    links:
      - backend

  backend:
    container_name: vinylhub-backend
    build: ./VinylHub_Backend
    environment:
      POSTGRES_USER: owner-of-the-database
      POSTGRES_PASSWORD: password-for-the-owner
    command: bash -c "rm -f ./tmp/pids/* && bundle exec rails s -p 3333 -b 0.0.0.0"
    volumes:
      - ./VinylHub_Backend:/backend
    ports:
      - "3333:3333"
    depends_on:
      - db
    links:
      - db

  # PostgreSQL database
  db:
    container_name: vinylhub-db
    image: postgres:15.4
    environment:
      POSTGRES_USER: owner-of-the-database
      POSTGRES_PASSWORD: password-for-the-owner
      POSTGRES_DB: vinylhub-dev
    volumes:
      - vinylhubdata:/var/lib/postgresql/data

volumes:
  vinylhubdata:
```

Be sure to change the compose env variables, and to match the expected file hierarchy tree:

```
  VinylHub               <--- the parent folder
  |- VinylHub_Frontend   <--- the frontend repo
  |- VinylHub_Backend    <--- the backend repo
  |- compose.yml         <--- this compose file
```

To build all three images, run `docker compose build --no-cache` from the parent folder.

> Note: before building it, ensure to remove any local installation of `node_modules` from the frontend image folder.

All three services - frontend, backend and PostgreSQL DB - can all be run at once with `docker compose up`.

Once the containers are up and running, the frontend service will be accessible from `localhost:5173` port, 
and the backend server API from the `localhost:3333` port (useful for testing purposes, e.g. Postman).

## Useful Commands for Development 

### Frontend

It's advisable to install and update packages from within the frontend container, to ensure that we are always using the same npm version and system specifications.
Then, the changes in the _node_modules_ folder will be propagated back to our local folder with a bind mount.

First, access the running container:
````
docker exec -it vinylhub-frontend /bin/sh
````

once inside, install or update the packages as usual:
```
npm i package-name
```
### Backend

The all-in-one command to access the backend container:
````
docker exec -it vinylhub-backend /bin/bash
````

Within it, you can execute all the typical rails commands to access the console, generate stuff, run tests, etc.

Examples:

- To access the Rails console: `rails -c`
- To run all the tests (ensuring a consistent test database): `rails db:test:prepare && rails test`

A more direct way to access the database is to use the psql client within the postgres container:
```
docker exec -it vinylhub-db psql -d database-name -U owner-of-the-database 
```


## Database
after run the docker if you found that your Database is empty, then execute these commands in the docker container of frontend:

If the Database is not created: 

```
rails db:create  
```
then set the migrations
```
rails db:migrate
```

finally, fill the database with data
```
rails db:seed
```

## Frontend tools

### Pinia

The Pinia library dependency is already included in the ***package.json*** file.

Check the ***package.json*** file, if the Pinia dependency is not in the file

run this command in docker frontend terminal:

```
npm install pinia
```

otherwise run:

```
npm install
```

the both command should be useful to install pinia library.

### Vitest

Vitest is a tool of Vite to create unit test for frontend. As we use the Pinia for our variables and functions, we use the Vitest to create tests for Pinia store.

The same as Pinia library, the Vitest dependency is already included in the ***package.json***.

Then, if the Vitest dependency is in the **package.json**,

run this command in docker frontend terminal:

```
npm install -D vitest
```

otherwise run:

```
npm install
```

to run all the tests use this command:

```
npm run test
```