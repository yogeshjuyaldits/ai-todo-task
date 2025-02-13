import "dotenv/config";
import { Pool } from "pg";
import OpenAI from "openai";
import readline from "readline-sync";

// PostgreSQL connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "todo_ai",
  password: "yourpassword",
  port: 5432,
});

// OpenAI API setup
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

async function addTask(): Promise<void> {
  const title = readline.question("Enter task title: ");
  const description = readline.question("Enter task description: ");
  await pool.query("INSERT INTO todos (title, description) VALUES ($1, $2)", [title, description]);
  console.log("✅ Task added!");
}

async function listTasks(): Promise<void> {
  const result = await pool.query("SELECT id, title, completed FROM todos");
  console.table(result.rows);
}

async function completeTask(): Promise<void> {
  const id = readline.questionInt("Enter task ID to mark as completed: ");
  await pool.query("UPDATE todos SET completed = TRUE WHERE id = $1", [id]);
  console.log("Task marked as completed!");
}

async function deleteTask(): Promise<void> {
  const id = readline.questionInt("Enter task ID to delete: ");
  await pool.query("DELETE FROM todos WHERE id = $1", [id]);
  console.log("Task deleted!");
}

async function getTaskSummary(): Promise<void> {
  const result = await pool.query("SELECT title, completed FROM todos");
  const tasks: Task[] = result.rows;

  if (tasks.length === 0) {
    console.log("No tasks available.");
    return;
  }

  const taskText = tasks.map(t => `- ${t.title} (${t.completed ? "Done" : "Pending"})`).join("\n");

  const aiResponse = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: `Summarize these tasks:\n${taskText}` }],
  });

  console.log("\n🤖 AI Summary:\n", aiResponse.choices[0].message.content);
}

async function main(): Promise<void> {
  console.log("\n📌 AI To-Do CLI\n=================");
  console.log("1. Add Task");
  console.log("2. List Tasks");
  console.log("3. Complete Task");
  console.log("4. Delete Task");
  console.log("5. Get AI Summary");
  console.log("6. Exit\n");

  const choice = readline.question("Select an option: ");

  switch (choice) {
    case "1":
      await addTask();
      break;
    case "2":
      await listTasks();
      break;
    case "3":
      await completeTask();
      break;
    case "4":
      await deleteTask();
      break;
    case "5":
      await getTaskSummary();
      break;
    case "6":
      console.log("👋 Exiting...");
      process.exit();
    default:
      console.log("Invalid option. Try again.");
  }

  main(); // Loop back
}

main();
