import "./styles.css"

document.querySelector(".confirm-project").addEventListener("click", displayProject);

function createProject() {
    const tasks = [];
    let name = document.querySelector("#project-name").value;
    
    const addTask = function(task) {
        tasks.push(task);
    }

    return {name, addTask};
}

function displayProject(name) {
    const project = createProject();

    const projectsContainer = document.query
    const projectDiv = document.createElement("div");
    
    
}

displayProject();

function createTask(title, description, priority, check) {
    return { title, description, priority, check };
}

document.querySelector(".add-project").addEventListener("click", showProjectModal);

function showProjectModal() {
    const modal = document.querySelector(".project-modal");
    const form = document.querySelector(".project-form");

    form.reset();
    modal.showModal();
}
