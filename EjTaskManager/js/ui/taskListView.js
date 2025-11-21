import { DOMFacade } from "../patterns/facade.js";

export class TaskListView {
  constructor(container) {
    this.container = container;
  }

  update(tasks) {
    DOMFacade.renderTasks(tasks, this.container);
  }
}
