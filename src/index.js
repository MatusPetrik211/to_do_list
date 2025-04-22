import "./styles.css"

document.querySelector(".add-project").addEventListener("click", showProjectModal);
document.querySelector(".confirm-project").addEventListener("click", createProject);
document.querySelector(".add-task").addEventListener("click", showTaskModal);
document.querySelector(".confirm-task").addEventListener("click", () => {
    if (currentProject) {
        createTask(currentProject);
    }
});

const projects = [];
let currentProject = null;

function createProject() {
    const tasks = [];
    const name = document.querySelector("#project-name").value;
    
    const newProject = { name, tasks};
    projects.push(newProject);

    displayProjects();
}

function createTask(project) {
    const name = document.querySelector("#task-name").value;
    const description = document.querySelector("#task-description").value;
    const date = document.querySelector("#due-date").value;
    const finished = false;
    let priority = "None";

    if (document.querySelector("input[name='priority']:checked")) {
        priority = document.querySelector("input[name='priority']:checked").value;
    }

    project.tasks.push({name, description, date, priority, finished});

    displayTasks(project);
}

function displayProjects() {
    const projectContainer = document.querySelector(".project-container");
    projectContainer.textContent = "";

    for (let project of projects) {
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project-div");

        const projectName = document.createElement("h1");
        projectName.classList.add("project-name");
        projectName.textContent = project.name;
        projectDiv.append(projectName);

        projectDiv.addEventListener("click", () => {
            currentProject = project;
            displayTasks(project);
        });

        projectContainer.append(projectDiv);
    }
}

function displayTasks(project) {
    const taskContainer = document.querySelector(".task-container");
    taskContainer.textContent = "";

    for (let task of project.tasks) {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task-div");
    
        const taskName = document.createElement("h1");
        taskName.classList.add("task-name");
        taskName.textContent = task.name;
        taskDiv.append(taskName);
    
        taskContainer.append(taskDiv);
    }
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