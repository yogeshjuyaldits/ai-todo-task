# AI Todo CLI

A command-line AI assistant that manages todos using OpenAI and PostgreSQL. Users interact via the command prompt, and the assistant processes commands to manage tasks.

## Features
- Add, list, update, and delete todos using natural language.
- AI-powered assistance for task management.
- PostgreSQL as the database backend.
- Written in TypeScript for strong typing and maintainability.
- Dockerized PostgreSQL setup for easy deployment.


## Installation
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yogeshjuyaldits/ai-todo-task.git
cd ai-todo-cli
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the root directory:
```
OPENAI_API_KEY=your-openai-api-key
DATABASE_URL=postgres://postgres:yourpassword@localhost:5432/todo_ai
```

### 4️⃣ Run PostgreSQL using Docker
```sh
docker-compose up -d
```

### 5️⃣ Apply Database Migrations (Using Prisma or Sequelize)
```sh
npm run migrate
```

### 6️⃣ Start the AI Todo CLI
```sh
npm start
```

## Usage
Once the CLI is running, you can interact with the assistant:
```sh
> Add a new todo: "Finish writing documentation by Monday"
> List all todos
> Mark todo #2 as completed
> Delete todo #3
```


## License
MIT License. See [LICENSE](LICENSE) for details.

