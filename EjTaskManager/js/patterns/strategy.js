export class FilterStrategy {
  filter(tasks) { return tasks; }
}

export class PriorityFilter extends FilterStrategy {
  constructor(priority) { super(); this.priority = priority; }
  filter(tasks) { return tasks.filter(t => t.priority === this.priority); }
}

export class DoneFilter extends FilterStrategy {
  constructor(done) { super(); this.done = done; }
  filter(tasks) { return tasks.filter(t => t.done === this.done); }
}

export class AllFilter extends FilterStrategy {
  filter(tasks) { return tasks; }
}
