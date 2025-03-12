import "./styles.css"

document.querySelector(".confirm-project").addEventListener("click", displayProjects);
document.querySelector(".add-project").addEventListener("click", showProjectModal);

function createProject() {
    const tasks = [];
    let name = document.querySelector("#project-name").value;
    
    const addTask = function(task) {
        tasks.push(task);
    }

    return {name, addTask};
}

function createTask(title, description, priority, check) {
    return { title, description, priority, check };
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


    projectContainer.appendChild(projectDiv);
}

function showProjectModal() {
    const modal = document.querySelector(".project-modal");
    const form = document.querySelector(".project-form");

    form.reset();
    modal.showModal();
}
