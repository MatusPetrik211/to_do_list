import "./styles.css"

document.querySelector(".add-project").addEventListener("click", showProjectModal);
document.querySelector(".confirm-project").addEventListener("click", displayProjects);
document.querySelector(".add-task").addEventListener("click", showTaskModal);
document.querySelector(".confirm-task").addEventListener("click", displayTasks);

function createProject() {
    const tasks = [];
    const name = document.querySelector("#project-name").value;
    
    const addTask = function(task) {
        tasks.push(task);
    }

    return {name, addTask}
}

function createTask() {
    const name = document.querySelector("#task-name").value;
    const description = document.querySelector("#task-description").value;
    const date = document.querySelector("#due-date").value;

    let priority = "None";
    if (document.querySelector("input[name='priority']:checked")) {
        priority = document.querySelector("input[name='priority']:checked").value;
    }

    const finished = false;

    return {name, description, date, priority, finished}
}

function displayProjects(name) {
    const project = createProject();

    const projectContainer = document.querySelector(".project-container");
    const projectDiv = document.createElement("div");
    projectDiv.classList.add("project-div");

    const projectName = document.createElement("h1");
    projectName.classList.add("project-name");
    projectName.textContent = project.name;
    projectDiv.append(projectName);


    projectContainer.append(projectDiv);
}

function displayTasks() {
    const task = createTask();

    const taskContainer = document.querySelector(".task-container");
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task-div");

    const taskName = document.createElement("h1");
    taskName.classList.add("task-name");
    taskName.textContent = task.name;
    taskDiv.append(taskName);


    taskContainer.append(taskDiv);
}

function showProjectModal() {
    const modal = document.querySelector(".project-modal");
    const form = document.querySelector(".project-form");

    form.reset();
    modal.showModal();
}

function showTaskModal() {
    const modal = document.querySelector(".task-modal");
    const form = document.querySelector(".task-form");

    form.reset();
    modal.showModal();
}
