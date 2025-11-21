import { Task } from "../models/task.js";

export class ExternalTaskAdapter {
  static adapt(apiTask) {
    return new Task(
      apiTask.uid,
      apiTask.text,
      apiTask.details,
      apiTask.level === "high_priority" ? "high" : "normal",
      apiTask.status === "finished",
      new Date().toISOString()
    );
  }
}
