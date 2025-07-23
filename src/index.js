import "./styles.css"
import { format, getYear, getMonth, getDate, parse } from "date-fns";

document.querySelector(".add-project").addEventListener("click", showProjectModal);
document.querySelector(".confirm-project").addEventListener("click", createProject);
document.querySelector(".add-task").addEventListener("click", showTaskModal);
document.querySelector(".confirm-task").addEventListener("click", () => {
    if (currentProject) {
        createTask(currentProject);
    }
});

let projects = JSON.parse(localStorage.getItem('projects')) || [];
let currentProject = null;

if (projects.length === 0) {
    createProject();
} else {
    displayProjects();
    if (projects.length > 0) {
        currentProject = projects[0];
        displayTasks(currentProject);
    }
}

document.addEventListener("click", (e) => {
    e.stopPropagation();
    if (document.querySelector(".task-details") && !e.target.matches(".task-details-inside")) {
        let taskDetails = document.querySelector(".task-details");
        taskDetails.remove();
    }
});

function saveToLocalStorage() {
    localStorage.setItem("projects", JSON.stringify(projects));
}

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
    saveToLocalStorage();
    displayProjects();
}

function createTask(project) {
    const name = document.querySelector("#task-name").value;
    const description = document.querySelector("#task-description").value;

    let dateString = document.querySelector("#due-date").value.split("-");
    let days = dateString[0];
    let months = dateString[1];
    let years = dateString[2];
    let date;

    try {
        date = format(new Date(days, months - 1, years), "dd/MM/yyyy");
    }
    catch (err) {
        alert("Invalid time");
        return
    }

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
    saveToLocalStorage();
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

        const editIcon = document.createElement("i");
        editIcon.classList.add("fa-solid", "fa-pen", "fa-lg", "edit-icon");
        editIcon.style.color = "#113d5f";

        const check = document.createElement("input");
        check.classList.add("finished");
        check.type = "checkbox";

        if (task.finished) {
            check.checked = true;
        }
        check.addEventListener("click", (e) => {
            e.stopPropagation();
            task.finished = !task.finished;
            check.checked = task.finished;
            saveToLocalStorage();
        });

        rightTaskDiv.append(deleteButton);
        rightTaskDiv.append(editIcon);
        rightTaskDiv.append(check);

        taskDiv.addEventListener("click", (e) => {
            let previousTaskDetails = document.querySelector(".task-details");
            if (previousTaskDetails) {
                previousTaskDetails.remove();
            }
            displayTaskDetails(task);
            e.stopPropagation();
        }
        );

        deleteButton.addEventListener("click", (e) => {
            e.stopPropagation();
            removeTask(task);
        })

        editIcon.addEventListener("click", (e) => {
            e.stopPropagation();
            removeTask(task);
            editTask(task);
        });
        
        taskContainer.append(taskDiv);
    }
}

function editTask(task) {
    showTaskModal();
    document.querySelector("#task-name").value = task.name;
    document.querySelector("#task-description").value = task.description;

    const parsedDate = parse(task.date, "dd/MM/yyyy", new Date());
    const yyyy = getYear(parsedDate);
    const mm = String(getMonth(parsedDate) + 1).padStart(2, '0');
    const dd = String(getDate(parsedDate)).padStart(2, '0');
    const formattedDate = `${yyyy}-${mm}-${dd}`;

    document.querySelector("#due-date").value = formattedDate;

    const priority = task.priority;
    if (priority === "low") {
        document.querySelector("#low").checked = true;
    }
    else if (priority === "medium") {
        document.querySelector("#medium").checked = true;
    }
    else if (priority === "high") {
        document.querySelector("#high").checked = true;
    }
}

function displayTaskDetails(task) {
    const body = document.querySelector("body");

    const details = document.createElement("div");
    details.classList.add("task-details");
    details.classList.add("task-details-inside");
    
    const name = document.createElement("h1");
    name.textContent = task.name;
    name.classList.add("task-details-name");
    name.classList.add("task-details-inside");
    details.append(name);

    const date = document.createElement("h1");
    date.textContent = `Due date: ${task.date}`;
    date.classList.add("task-details-inside");
    details.append(date);

    const priority = document.createElement("h1");
    priority.textContent = `Priority: ${task.priority}`;
    priority.classList.add("task-details-inside");
    details.append(priority);

    const check = document.createElement("h1");
    if (task.finished) {
        check.textContent = "Finished ✅";
    } 
    else {
        check.textContent = "Not finished ❌";
    }
    check.classList.add("task-details-inside");
    details.append(check);

    const descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("task-details-inside");
    const descriptionTitle = document.createElement("h1");
    descriptionTitle.textContent = "Description:";
    descriptionTitle.classList.add("task-details-inside");
    const description = document.createElement("p");
    description.textContent = task.description;
    description.classList.add("desc");
    description.classList.add("task-details-inside");

    descriptionDiv.append(descriptionTitle);
    descriptionDiv.append(description);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("display-task-delete-btn");
    deleteButton.append("x");
    details.append(deleteButton);

    details.append(descriptionDiv);
    body.append(details);
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
            saveToLocalStorage();

            if (currentProject && currentProject.name === projectName) {
                currentProject = null;
                document.querySelector(".task-container").textContent = "";
            }
        }

        projectDiv.remove();

        displayProjects();
    })
}

function removeTask(activeTask) {
    const taskNamesNodes = document.querySelectorAll(".task-name");
    for (let nameNode of taskNamesNodes) {
        if (activeTask.name === nameNode.textContent) {
            const parentDiv = nameNode.closest("div");
            parentDiv.remove();
        }
    }
    let index = 0;

    for (let task of currentProject.tasks) {
        if (task.name === activeTask.name) {
            index = currentProject.tasks.indexOf(task);
            currentProject.tasks.splice(index, 1);
            saveToLocalStorage();
        }
    }
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