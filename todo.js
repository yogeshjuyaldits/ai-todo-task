"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const pg_1 = require("pg");
const openai_1 = __importDefault(require("openai"));
const readline_sync_1 = __importDefault(require("readline-sync"));
// PostgreSQL connection
const pool = new pg_1.Pool({
    user: "postgres",
    host: "localhost",
    database: "todo_ai",
    password: "yourpassword",
    port: 5432,
});
// OpenAI API setup
const openai = new openai_1.default({ apiKey: process.env.OPENAI_API_KEY });
function addTask() {
    return __awaiter(this, void 0, void 0, function* () {
        const title = readline_sync_1.default.question("Enter task title: ");
        const description = readline_sync_1.default.question("Enter task description: ");
        yield pool.query("INSERT INTO todos (title, description) VALUES ($1, $2)", [title, description]);
        console.log("✅ Task added!");
    });
}
function listTasks() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield pool.query("SELECT id, title, completed FROM todos");
        console.table(result.rows);
    });
}
function completeTask() {
    return __awaiter(this, void 0, void 0, function* () {
        const id = readline_sync_1.default.questionInt("Enter task ID to mark as completed: ");
        yield pool.query("UPDATE todos SET completed = TRUE WHERE id = $1", [id]);
        console.log("✅ Task marked as completed!");
    });
}
function deleteTask() {
    return __awaiter(this, void 0, void 0, function* () {
        const id = readline_sync_1.default.questionInt("Enter task ID to delete: ");
        yield pool.query("DELETE FROM todos WHERE id = $1", [id]);
        console.log("🗑️ Task deleted!");
    });
}
function getTaskSummary() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield pool.query("SELECT title, completed FROM todos");
        const tasks = result.rows;
        if (tasks.length === 0) {
            console.log("No tasks available.");
            return;
        }
        const taskText = tasks.map(t => `- ${t.title} (${t.completed ? "Done" : "Pending"})`).join("\n");
        const aiResponse = yield openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "user", content: `Summarize these tasks:\n${taskText}` }],
        });
        console.log("\n🤖 AI Summary:\n", aiResponse.choices[0].message.content);
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("\n📌 AI To-Do CLI\n=================");
        console.log("1. Add Task");
        console.log("2. List Tasks");
        console.log("3. Complete Task");
        console.log("4. Delete Task");
        console.log("5. Get AI Summary");
        console.log("6. Exit\n");
        const choice = readline_sync_1.default.question("Select an option: ");
        switch (choice) {
            case "1":
                yield addTask();
                break;
            case "2":
                yield listTasks();
                break;
            case "3":
                yield completeTask();
                break;
            case "4":
                yield deleteTask();
                break;
            case "5":
                yield getTaskSummary();
                break;
            case "6":
                console.log("👋 Exiting...");
                process.exit();
            default:
                console.log("❌ Invalid option. Try again.");
        }
        main(); // Loop back
    });
}
main();
