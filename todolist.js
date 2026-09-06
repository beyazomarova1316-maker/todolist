const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function showTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.text;
        span.className = "task";

        if (task.completed) {
            span.classList.add("completed");
        }

        span.addEventListener("click", function() {
            task.completed = !task.completed;

            localStorage.setItem("tasks", JSON.stringify(tasks));

            showTasks();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Sil";
        deleteBtn.className = "delete";

        deleteBtn.addEventListener("click", function() {
            tasks.splice(index, 1);

            localStorage.setItem("tasks", JSON.stringify(tasks));

            showTasks();
        });

        li.append(span, deleteBtn);
        taskList.append(li);
    });
}

addBtn.addEventListener("click", function() {
    const text = taskInput.value.trim();

    if (text === "") {
        return;
    }

    const newTask = {
        text: text,
        completed: false
    };

    tasks.push(newTask);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";

    showTasks();
});

showTasks();