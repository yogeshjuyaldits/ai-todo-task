import { Command } from "commander";
import { addTodo, listTodos, updateTodo, deleteTodo } from "./services/todoService";
import { processCommand } from "./services/openaiService";

const program = new Command();

program
  .command("add <task>")
  .description("Add a new todo")
  .action(async (task) => {
    await addTodo(task);
    console.log(`✅ Task added: "${task}"`);
  });

program
  .command("list")
  .description("List all todos")
  .action(async () => {
    const todos = await listTodos();
    todos.forEach((todo) => console.log(`${todo.id}: ${todo.task} [${todo.completed ? "✔" : "❌"}]`));
  });

program
  .command("update <id> <status>")
  .description("Update a todo status (true/false)")
  .action(async (id, status) => {
    await updateTodo(Number(id), status === "true");
    console.log(`🔄 Task ${id} updated`);
  });

program
  .command("delete <id>")
  .description("Delete a todo")
  .action(async (id) => {
    await deleteTodo(Number(id));
    console.log(`🗑 Task ${id} deleted`);
  });

program
  .command("ai <command>")
  .description("Ask AI to interpret your command")
  .action(async (command) => {
    const result = await processCommand(command);
    console.log(`🤖 AI Suggestion: ${result}`);
  });

program.parse(process.argv);
