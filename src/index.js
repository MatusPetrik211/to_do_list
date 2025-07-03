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

createProject();
displayProjects();

function createProject() {
    const tasks = [];
    const name = document.querySelector("#project-name").value ? document.querySelector("#project-name").value : "default project";
    
    if (checkSameNames(name, projects)) {
        if (name == "default project") {
            return
        }
        alert("There's already a project with that name. Try another one.");
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

    if (name.trim() == "" || date == "" || priority == "None") {
        return
    }

    if (checkSameNames(name, project.tasks)) {
        alert("There's already a task with that name. Try another one.");
        return
    }

    project.tasks.push({name, description, date, priority, finished});
    console.log(currentProject);

    displayTasks(project);
}

function displayProjects() {
    const projectContainer = document.querySelector(".project-container");
    projectContainer.textContent = "";

    for (let project of projects) {
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project-div");

        if (project === currentProject) {
            projectDiv.style.backgroundColor = "#3d7fac";
        }

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button-project");

        deleteButton.append("x");

        const projectName = document.createElement("h1");
        projectName.classList.add("project-name");
        projectName.textContent = project.name;

        projectDiv.append(projectName);
        projectDiv.append(deleteButton);

        removeProject(deleteButton);

        projectDiv.addEventListener("click", () => {
            const projectDivs = document.querySelectorAll(".project-div");
            setDivsToNormalColors(projectDivs);

            currentProject = project;
            projectDiv.style.backgroundColor = "#3d7fac";

            displayTasks(project);
        });

        projectContainer.append(projectDiv);
    }
}

function displayTasks(project) {
    const taskContainer = document.querySelector(".task-container");
    taskContainer.textContent = "";

    for (const task of project.tasks) {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task-div");

        if (task.priority == "low") {
            taskDiv.style.borderColor = "#3cc900";
        }
        else if (task.priority == "medium") {
            taskDiv.style.borderColor = "#ffb921";
        }
        else if (task.priority == "high") {
            taskDiv.style.borderColor = "#c91e00";
        }
    
        const taskName = document.createElement("h1");
        taskName.classList.add("task-name");
        taskName.textContent = task.name;
        taskDiv.append(taskName);

        const rightTaskDiv = document.createElement("div");
        rightTaskDiv.height = "200px";
        taskDiv.append(rightTaskDiv);
        rightTaskDiv.classList.add("right-task-div")

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button-task");
        deleteButton.append("x");

        const check = document.createElement("input");
        check.classList.add("finished");
        check.type = "checkbox";

        rightTaskDiv.append(check);
        rightTaskDiv.append(deleteButton);
    
        taskContainer.append(taskDiv);

        removeTask(deleteButton);
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

function removeProject(deleteButton) {
    deleteButton.addEventListener("click", (e) => {
        e.stopPropagation();

        const projectDiv = deleteButton.parentElement;
        const projectName = projectDiv.querySelector(".project-name").textContent;
        let index = 0;

        for (let project of projects) {
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

        projectDiv.remove();

        displayProjects();
    })
}

function removeTask(deleteButton) {
    deleteButton.addEventListener("click", (e) => {
        e.stopPropagation();

        const taskDiv = deleteButton.parentElement;
        const taskName = taskDiv.querySelector(".task-name").textContent;
        let index = 0;


        for (let task of currentProject.tasks) {
            if (task.name === taskName){
                index = currentProject.tasks.indexOf(task);
            } 
        }
        
        if (index > -1) {
            currentProject.tasks.splice(index, 1);
        }

        console.log(currentProject.tasks);

        taskDiv.remove();

        displayTasks(currentProject);
    })
}

function checkSameNames(newName, arr) {
    const nameList = arr.map(element => element.name);
    for (const name of nameList) {
        if (newName === name) {
            return true
        }
    }
    return false
}

function setDivsToNormalColors(divs) {
    divs.forEach(div => {
        div.style.backgroundColor = "#4897cb";
    });
}