let addButton = document.querySelector("#add-task-button");
let newTask = document.querySelector("#input-task");
let list = document.querySelector("#task-list");
let checkButton = document.querySelectorAll(".checkbox");
let items = document.querySelectorAll(".task");
let taskList = [];

// Puts items into list
function loadTasks() {

    // Loads tasks from localStorage
    taskList = JSON.parse(localStorage.getItem("tasks")) || [];

    // Clear list
    list.innerHTML = "";

    // Adds each item to list
    for (let i = 0; i < taskList.length; i++) {

        list.innerHTML += `
        <li class="list-item">
                <div>
                    <input type="checkbox" class="checkbox">
                    <label>
                        <span class="task">${taskList[i]}</span>
                    </label>
                </div>
                <button class="delete-btn"></button>            
        </li>
        `;

        // Updates delete button for each item
        let current_tasks = document.querySelectorAll(".delete-btn");
        for (let i = 0; i < current_tasks.length; i++) {
            current_tasks[i].onclick = function () {
                this.parentNode.remove();
                taskList.remove(i)
            }
        }

        // Updates the checkButton and items variables
        checkButton = document.querySelectorAll(".checkbox");
        items = document.querySelectorAll(".task");
    }
}

// Event for Add Task Button
addButton.addEventListener("click", () => {
    if (newTask.value.length !== 0) {
        taskList.push(newTask.value);

        // Updates localStorage with tasks
        localStorage.setItem("tasks", JSON.stringify(taskList))

        // Reloads tasks
        loadTasks()
    }
    console.log(taskList)
});

// Event for Checking off item
document.addEventListener("click", () => {
    for (let i = 0; i < checkButton.length; i++) {
        checkButton[i].addEventListener("click", () => {
            if (checkButton[i].checked) {
                items[i].classList.add("done");
            } else {
                items[i].classList.remove("done");
            }
        });
    }
})

// Initial loading of tasks
loadTasks()