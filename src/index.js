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

    if (name.trim() == "") {
        return
    }
    
    const newProject = {name, tasks};
    currentProject = newProject;
    displayTasks(currentProject);

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

    if (name.trim() == "" || date == "") {
        return
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

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button-project");

        deleteButton.append("x");

        const projectName = document.createElement("h1");
        projectName.classList.add("project-name");
        projectName.textContent = project.name;

        projectDiv.append(projectName);
        projectDiv.append(deleteButton);

        removeParentElement(deleteButton);

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

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button-task");
        deleteButton.append("x");
        taskDiv.append(deleteButton);
    
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

function removeParentElement(deleteButton) {
    deleteButton.addEventListener("click", (e) => {
        e.stopPropagation();

        const parent = deleteButton.parentElement;
        const projectName = parent.querySelector(".project-name").textContent;
        const index = 0;

        for (let project in projects) {
            if (project.name === projectName){
                index = projects.indexOf(project);
            } 
        }
        
        if (index > -1) {
            projects.splice(index, 1);

            if (currentProject && currentProject.name === projectName) {
                currentProject = null;
                document.querySelector(".task-container").textContent = "";
            }
        }

        parent.remove();

        displayProjects();
    })
}