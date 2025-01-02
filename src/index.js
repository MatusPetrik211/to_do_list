import "./styles.css"

function createProject(name) {
    return { name };
}

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

console.log("hello");