import { User } from "./User.js";

export class UserFactory {
  static createUser(name, email, password, role = "user") {
    const id = Date.now().toString();
    return new User(id, name, email, password, role);
  }
}
