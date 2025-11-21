export class GuardarDatos {
  constructor(storage, key) {
    this.storage = storage;
    this.key = key;
  }

  load() {
    const data = this.storage.getItem(this.key);
    return data ? JSON.parse(data) : null;
  }

  save(data) {
    this.storage.setItem(this.key, JSON.stringify(data));
  }

  clear() {
    this.storage.removeItem(this.key);
  }
}
