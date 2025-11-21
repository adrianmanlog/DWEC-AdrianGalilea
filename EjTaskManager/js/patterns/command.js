export class Command {
  execute() {}
}

export class AddTaskCommand extends Command {
  constructor(storage, task) {
    super();
    this.storage = storage;
    this.task = task;
  }
  execute() {
    this.storage.add(this.task);
  }
}

export class DeleteTaskCommand extends Command {
  constructor(storage, id) {
    super();
    this.storage = storage;
    this.id = id;
  }
  execute() {
    this.storage.delete(this.id);
  }
}

export class ToggleTaskCommand extends Command {
  constructor(storage, id) {
    super();
    this.storage = storage;
    this.id = id;
  }
  execute() {
    const tasks = this.storage.load();
    const task = tasks.find(t => t.id === this.id);
    this.storage.update(this.id, { done: !task.done });
  }
}
