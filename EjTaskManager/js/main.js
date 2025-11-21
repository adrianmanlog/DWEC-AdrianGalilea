import { TaskFactory } from "./patterns/factory.js";
import { TaskSubject } from "./patterns/observer.js";
import { GuardarDatos } from "./storage/guardarDatos.js";
import { TaskListView } from "./ui/taskListView.js";
import { DOMFacade } from "./patterns/facade.js";
import { TaskBuilder } from "./patterns/builder.js";
import { ExternalTaskAdapter } from "./patterns/adapter.js";
import { 
  AllFilter, 
  PriorityFilter, 
  DoneFilter 
} from "./patterns/strategy.js";
import { 
  AddTaskCommand,
  DeleteTaskCommand,
  ToggleTaskCommand 
} from "./patterns/command.js";

// --- Inicialización ---
const storage = new GuardarDatos(localStorage, "tasks");
const subject = new TaskSubject();
const taskListContainer = document.getElementById("task-list");
const form = document.getElementById("task-form");

// --- Observador UI ---
const taskListView = new TaskListView(taskListContainer);
subject.subscribe(taskListView);

// --- Estado inicial ---
let tasks = storage.load();
subject.notify(tasks);

// --- Eventos ---
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = e.target.title.value.trim();
  const description = e.target.description.value.trim();
  const priority = e.target.priority.value;

  const newTask = TaskFactory.create({ title, description, priority });
  storage.add(newTask);

  tasks = storage.load();
  subject.notify(tasks);
  DOMFacade.clearInputs(form);
});

taskListContainer.addEventListener("click", (e) => {
  const id = Number(e.target.dataset.id);
  if (e.target.dataset.action === "delete") {
    storage.delete(id);
  } else if (e.target.dataset.action === "toggle") {
    const task = storage.load().find((t) => t.id === id);
    storage.update(id, { done: !task.done });
  }
  tasks = storage.load();
  subject.notify(tasks);
});
/*
Ejemplo de uso del Builder Pattern para crear una tarea:

const builder = new TaskBuilder();
const newTask = builder
    .setTitle(title)
    .setDescription(description)
    .setPriority(priority)
    .build();


Ejemplo de uso del addapter pattern para adaptar una API externa:
const external = {
  uid: 11,
  text: "Tarea externa",
  details: "Detalles",
  level: "high_priority",
  status: "finished"
};

const adaptedTask = ExternalTaskAdapter.adapt(external);
storage.add(adaptedTask);
subject.notify(storage.load());

// Ejemplo de uso del patrón strategy para filtrar tareas:
let filter = new AllFilter();

Cambiar de filtro:
filter = new PriorityFilter("high");
const filteredTasks = filter.filter(storage.load());
subject.notify(filteredTasks);

// Ejemplo de uso del patrón command para agregar una tarea:
new AddTaskCommand(storage, newTask).execute();
subject.notify(storage.load());

// Ejemplo de uso del patrón state para alternar el estado de una tarea:
const task = storage.load().find(t => t.id === someId);
task.toggle();
storage.update(task.id, task);
subject.notify(storage.load());


*/