import { Task } from "../models/task.js";

export class TaskBuilder {
  constructor() {
    this.id = Date.now();
    this.title = "";
    this.description = "";
    this.priority = "normal";
    this.done = false;
    this.createdAt = new Date().toISOString();
  }

  setTitle(title) {
    this.title = title;
    return this;
  }

  setDescription(desc) {
    this.description = desc;
    return this;
  }

  setPriority(priority) {
    this.priority = priority;
    return this;
  }

  build() {
    if (!this.title) throw new Error("La tarea necesita un título");
    return new Task(this.id, this.title, this.description, this.priority, this.done, this.createdAt);
  }
}
