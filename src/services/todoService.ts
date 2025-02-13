import Todo from "../db/models/todo";

export async function addTodo(task: string) {
  return await Todo.create({ task });
}

export async function listTodos() {
  return await Todo.findAll();
}

export async function updateTodo(id: number, completed: boolean) {
  return await Todo.update({ completed }, { where: { id } });
}

export async function deleteTodo(id: number) {
  return await Todo.destroy({ where: { id } });
}
