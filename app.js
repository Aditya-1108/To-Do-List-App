let currentUser = null;
let userTasks = {};

function login() {
  const username = document.getElementById("usernameInput").value.trim();
  if (username === "") {
    alert("Please enter a username");
    return;
  }

  currentUser = username;
  document.getElementById("userDisplay").textContent = currentUser;
  document.getElementById("loginSection").style.display = "none";
  document.getElementById("appSection").style.display = "block";

  loadTasks();
}

function logout() {
  saveTasks();
  currentUser = null;
  document.getElementById("usernameInput").value = "";
  document.getElementById("loginSection").style.display = "block";
  document.getElementById("appSection").style.display = "none";
  document.getElementById("taskList").innerHTML = "";
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  if (!userTasks[currentUser]) {
    userTasks[currentUser] = [];
  }

  userTasks[currentUser].push({ text: taskText, done: false });
  taskInput.value = "";
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  const tasks = userTasks[currentUser] || [];
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.done ? "done" : "";

    const taskText = document.createTextNode(task.text);
    li.appendChild(taskText);

    const doneBtn = document.createElement("button");
    doneBtn.textContent = task.done ? "Undo" : "Done";
    doneBtn.onclick = () => toggleTask(index);
    li.appendChild(doneBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => deleteTask(index);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}

function toggleTask(index) {
  const task = userTasks[currentUser][index];
  task.done = !task.done;
  renderTasks();
}

function deleteTask(index) {
  userTasks[currentUser].splice(index, 1);
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("userTasks", JSON.stringify(userTasks));
}

function loadTasks() {
  const saved = localStorage.getItem("userTasks");
  if (saved) {
    userTasks = JSON.parse(saved);
  }
  renderTasks();
}

window.onload = loadTasks;
