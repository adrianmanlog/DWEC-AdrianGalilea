export class GuardarDatos {
  constructor(storage, key) {
    this.storage = storage;
    this.key = key;
  }

  load() {
    const data = this.storage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }

  save(array) {
    this.storage.setItem(this.key, JSON.stringify(array));
  }

  add(task) {
    const tasks = this.load();
    tasks.push(task);
    this.save(tasks);
  }

  update(id, newData) {
    const tasks = this.load();
    const index = tasks.findIndex((t) => t.id === id);
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...newData };
      this.save(tasks);
      return true;
    }
    return false;
  }

  delete(id) {
    const tasks = this.load().filter((t) => t.id !== id);
    this.save(tasks);
  }

  clear() {
    this.save([]);
  }
}
