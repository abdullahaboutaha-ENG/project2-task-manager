const taskList = document.getElementById("taskList");
const taskForm = document.getElementById("taskForm");
function loadTasks() {
    taskList.innerHTML = "";
    fetch("http://localhost:3000/api")
        .then(res => res.json())
        .then(data => {
            data.forEach(task => {
                const li = document.createElement("li");
                li.textContent = `${task.title} | Priority: ${task.priority} | Completed: ${task.completed}`;
                const btn = document.createElement("button");
                btn.textContent = "Delete";
                btn.onclick = () => {
                    fetch(`http://localhost:3000/api/${task.id}`, {
                        method: "DELETE"
                    })
                    .then(() => loadTasks());
                };
                li.appendChild(btn);
                taskList.appendChild(li);
            });
        });
}
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const priority = parseInt(document.getElementById("priority").value);
  fetch("http://localhost:3000/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title, priority })
  })
    .then(res => res.json())
    .then(() => {
      taskForm.reset();
      loadTasks();
    });
});
loadTasks();
    