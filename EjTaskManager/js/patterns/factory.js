import { Task } from "../models/task.js";

// Factory Pattern: crea instancias de Task de forma centralizada y validada
export class TaskFactory {
  static create({ title, description, priority }) {
    if (!title) throw new Error("El título es obligatorio");

    const id = Date.now();
    const createdAt = new Date().toISOString();
    return new Task(
      id,
      title,
      description,
      priority || "normal",
      false,
      createdAt
    );
  }
}
