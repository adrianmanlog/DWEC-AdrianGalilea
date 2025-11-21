// Facade Pattern: simplifica el manejo del DOM
export class DOMFacade {
  static renderTasks(tasks, container) {
    container.innerHTML = "";

    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.className = `task ${task.done ? "done" : ""}`;
      li.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <span class="priority ${task.priority}">${task.priority}</span>
        <button data-action="toggle" data-id="${task.id}">✔️</button>
        <button data-action="delete" data-id="${task.id}">🗑️</button>
      `;
      container.appendChild(li);
    });
  }

  static clearInputs(form) {
    form.reset();
  }
}
