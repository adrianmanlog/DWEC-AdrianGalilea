export class DomFacade {
  static setText(id, text) {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = text;
    }
  }

  static clearElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
      element.innerHTML = "";
    }
  }

  static createElement(tag, content = "", attributes = {}) {
    const element = document.createElement(tag);
    if (content) {
      element.innerHTML = content;
    }
    for (const [key, value] of Object.entries(attributes)) {
      element.setAttribute(key, value);
    }
    return element;
  }

  static appendChild(parentSelector, element) {
    const parent = document.querySelector(parentSelector);
    if (parent) {
      parent.appendChild(element);
    }
  }

  static renderUserRow(user) {
    const tr = this.createElement("tr");
    tr.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>
                <button class="action-btn edit-btn" data-id="${user.id}">Editar</button>
                <button class="action-btn delete-btn" data-id="${user.id}">Eliminar</button>
            </td>
        `;
    return tr;
  }
}
