fetch("http://localhost:3000/api")
 .then(res => res.json())
 .then(data => {
   const taskList = document.getElementById("taskList");
   data.forEach(task => {
     const li = document.createElement("li");
     li.textContent = `${task.title} | Priority: ${task.priority} | Completed: ${task.completed}`;
     taskList.appendChild(li);
   });
 });
 