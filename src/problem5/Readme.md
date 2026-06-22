# Problem 5 — todo_app


## How to get the server start and running
### 1. Creating the `.env` file

Create a `.env` file in `src/problem5/todo_app` with the following variables (example):

```text
PORT=3001
MONGODB_URI=mongodb://localhost:27017/todo_db
```

The dev server loads `.env` at startup, so ensure the file exists before running `npm run dev`.

### 2. Start the MongoDB (Docker)

You can run a local MongoDB instance with Docker. From the `todo_app` folder there is a `docker-compose.yml` included. To start MongoDB:

```bash
cd src/problem5/todo_app
docker compose up -d
```

This will start a MongoDB container named `todo-mongodb` listening on the host port `27017` and create a `todo_db` database.

### 3. Start the server

1. Open a terminal and navigate to the todo app directory:

```bash
cd src/problem5/todo_app
```

2. Install dependencies (only needed first time or after changes):

```bash
npm install
```

3. Start the dev server (reads `.env`):

```bash
npm run dev
```

The server will listen on the port configured in `.env` (default `3001`).

## How to use Postman collection to test the API

1. Open Postman and import the collection file located at:

- `src/problem5/postman/todo_app.postman_collection.json`

2. Ensure the collection variable `baseUrl` is set to the running server URL, e.g.:

```
http://localhost:3001
```

3. Use the requests in the collection:

- `Create Todo` — POST `/todos` (JSON body)
- `List Todos` — GET `/todos`
- `Get Todo by ID` — GET `/todos/:id`
- `Update Todo` — PUT `/todos/:id` (JSON body)
- `Delete Todo` — DELETE `/todos/:id`

4. Example: create a todo, copy the created item's `_id`, then use `Get Todo by ID` to fetch it.

---

## How to run unit tests

Run tests with Jest from the `todo_app` folder:

```bash
cd src/problem5/todo_app
npm test
```

