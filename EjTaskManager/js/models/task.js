export class Task {
  constructor(
    id,
    title,
    description,
    priority,
    done = false,
    createdAt = new Date().toISOString()
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.done = done;
    this.createdAt = createdAt;
  }

  // Ejemplo de posible método de dominio
  toggleDone() {
    this.done = !this.done;
  }
}
