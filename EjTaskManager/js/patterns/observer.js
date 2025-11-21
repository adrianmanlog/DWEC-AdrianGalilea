// Observer Pattern: notifica cambios de la lista de tareas a los observadores (UI)
export class TaskSubject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  notify(tasks) {
    this.observers.forEach((o) => o.update(tasks));
  }
}
