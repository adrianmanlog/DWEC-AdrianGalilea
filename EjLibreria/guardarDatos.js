export class guardarDatos {
  constructor(storage, key) {
    this.storage = storage; // Puede ser localStorage o sessionStorage
    this.key = key; // Nombre de la clave donde se guardan los libros
  }

  // Cargar array desde storage
  load() {
    const data = this.storage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }

  // Guardar array al storage
  save(array) {
    this.storage.setItem(this.key, JSON.stringify(array));
  }

  // Agregar un libro
  add(libro) {
    const libros = this.load();
    libros.push(libro);
    this.save(libros);
  }

  // Mostrar todos los libros
  showAll() {
    console.log(this.load());
  }

  // Vaciar todos los libros
  clear() {
    this.save([]);
  }

  // Actualizar un libro por id
  update(nombre, nuevoLibro) {
    const libros = this.load();
    const index = libros.findIndex((l) => l.nombre === nombre);

    if (index !== -1) {
      libros[index] = { ...libros[index], ...nuevoLibro };
      this.save(libros);
      return true; // Actualizado
    }

    return false; // No encontrado
  }

  // Eliminar un libro por nombre
  delete(nombre) {
    const libros = this.load();
    const nuevosLibros = libros.filter((l) => l.nombre !== nombre);

    if (nuevosLibros.length !== libros.length) {
      this.save(nuevosLibros);
      return true; // Eliminado
    }

    return false; // No encontrado
  }
}
