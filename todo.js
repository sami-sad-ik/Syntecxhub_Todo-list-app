let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const loadTasks = () => {
  const container = document.getElementById("listContainer");
  container.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.innerHTML = `
        <div class="flex justify-start items-center gap-2">
            <input type="checkbox" ${
              task.completed ? "checked" : ""
            } class="completedTask appearance-none w-4 h-4 border-2 border-gray-500 rounded-full cursor-pointer transition-all
                    duration-200 checked:bg-red-600 checked:border-red-600 relative" />
            <p class="task-list flex-1 ${task.completed ? "completed" : ""}">${
      task.text
    }</p>
            <button class="hover:text-red-500 transition-colors duration-150">
                <i class="fa-regular fa-circle-xmark"></i>
            </button>
        </div>
    `;
    const checkbox = taskDiv.querySelector(".completedTask");
    const taskText = taskDiv.querySelector(".task-list");
    checkbox.addEventListener("change", () => {
      tasks[index].completed = checkbox.checked;
      if (checkbox.checked) {
        taskText.classList.add("completed");
      } else taskText.classList.remove("completed");
      localStorage.setItem("tasks", JSON.stringify(tasks));
    });

    container.appendChild(taskDiv);
    const deleteButton = taskDiv.querySelector("button");
    deleteButton.addEventListener("click", () => {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      loadTasks();
    });
  });
};

document.addEventListener("DOMContentLoaded", loadTasks);

const addTask = () => {
  const taskText = document.getElementById("todoInput").value.trim();
  if (!taskText) return;
  const content = { text: taskText, completed: false };
  tasks.push(content);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
};
