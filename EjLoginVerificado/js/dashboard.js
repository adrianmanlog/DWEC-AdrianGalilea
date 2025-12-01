import { GuardarDatos } from "../guardarDatos.js";
import { DomFacade } from "./patterns/DomFacade.js";

const userStorage = new GuardarDatos(localStorage, "users");

// Observer implementation
const dashboardObserver = {
  update: function (users) {
    const searchInput = document.getElementById("userSearch");
    const filterText = searchInput ? searchInput.value : "";
    renderUserTable(users, filterText);
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }

  DomFacade.setText("userName", currentUser.name);
  document.getElementById("logoutBtn").addEventListener("click", logout);

  if (currentUser.role === "admin") {
    showAdminView();
  } else {
    showUserView(currentUser);
  }

  // Modal close logic
  window.onclick = function (event) {
    const modal = document.getElementById("editModal");
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  document
    .getElementById("editForm")
    .addEventListener("submit", handleEditSubmit);
});

function showUserView(user) {
  document.getElementById("userView").style.display = "block";
  DomFacade.setText("profileName", user.name);
  DomFacade.setText("profileEmail", user.email);
  DomFacade.setText("profileRole", user.role);

  const editBtn = document.getElementById("editProfileBtn");
  if (editBtn) {
    // Remove old listeners to avoid duplicates if called multiple times
    const newBtn = editBtn.cloneNode(true);
    editBtn.parentNode.replaceChild(newBtn, editBtn);
    newBtn.addEventListener("click", () => openEditModal(user.id));
  }
}

function showAdminView() {
  document.getElementById("adminView").style.display = "block";

  // Subscribe to changes
  userStorage.subscribe(dashboardObserver);

  // Initial render
  renderUserTable(userStorage.load());

  // Add search listener
  const searchInput = document.getElementById("userSearch");
  searchInput.addEventListener("input", (e) => {
    renderUserTable(userStorage.load(), e.target.value);
  });
}

function renderUserTable(users, filterText = "") {
  const tbodySelector = "#usersTable tbody";
  DomFacade.clearElement(tbodySelector);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(filterText.toLowerCase()) ||
      user.email.toLowerCase().includes(filterText.toLowerCase())
  );

  if (filteredUsers.length === 0) {
    const tr = DomFacade.createElement("tr");
    tr.innerHTML =
      '<td colspan="4" style="text-align: center; color: #666;">No se encontraron usuarios</td>';
    DomFacade.appendChild(tbodySelector, tr);
    return;
  }

  filteredUsers.forEach((user) => {
    const tr = DomFacade.renderUserRow(user);
    DomFacade.appendChild(tbodySelector, tr);
  });

  // Add event listeners to buttons
  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", () => openEditModal(btn.dataset.id));
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => deleteUser(btn.dataset.id));
  });
}

function openEditModal(id) {
  const users = userStorage.load();
  const user = users.find((u) => u.id === id);
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  
  if (user) {
    document.getElementById("editId").value = user.id;
    document.getElementById("editName").value = user.name;
    document.getElementById("editEmail").value = user.email;
    
    const roleSelect = document.getElementById("editRole");
    roleSelect.value = user.role;
    
    // Disable role selection if not admin
    if (currentUser.role !== "admin") {
      roleSelect.disabled = true;
    } else {
      roleSelect.disabled = false;
    }

    document.getElementById("editModal").style.display = "flex";
  }
}

function handleEditSubmit(e) {
  e.preventDefault();
  const id = document.getElementById("editId").value;
  const name = document.getElementById("editName").value;
  const email = document.getElementById("editEmail").value;
  let role = document.getElementById("editRole").value;

  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  // Security check: If not admin, force role to remain unchanged (or use existing user role)
  if (currentUser.role !== "admin") {
     const users = userStorage.load();
     const existingUser = users.find(u => u.id === id);
     if (existingUser) {
         role = existingUser.role; // Ignore form value
     }
  }

  const success = userStorage.update(id, { name, email, role });
  if (success) {
    document.getElementById("editModal").style.display = "none";
    // renderUserTable is called automatically via Observer!

    // If user edited themselves (admin or normal), update session and view
    if (currentUser.id === id) {
      const updatedUser = { ...currentUser, name, email, role };
      sessionStorage.setItem("currentUser", JSON.stringify(updatedUser));
      DomFacade.setText("userName", name);
      
      // If in user view, update the display immediately
      if (document.getElementById("userView").style.display !== "none") {
          showUserView(updatedUser);
      }
    }
  }
}

function deleteUser(id) {
  if (confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (currentUser.id === id) {
      alert("No puedes eliminar tu propia cuenta.");
      return;
    }
    userStorage.delete(id);
    // renderUserTable is called automatically via Observer!
  }
}

function logout() {
  sessionStorage.removeItem("currentUser");
  window.location.href = "login.html";
}
