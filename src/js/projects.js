import Storage from "./storage"

let storage = new Storage()

class Project{
    name
    tasks = []
    constructor(name) {
        this.name = name
    }

    get name() {
        return this.name
    }

    set name(name) {
        this.name = name
    }
}

function addTasktoProject(project, task) {
    project.tasks.push(task)
    if (storage.getProject(project) != null) {
        storage.addTask(project, task)
    }
}

function removeTaskfromProject(project, task) {
    const taskIndex = project.tasks.indexOf(task);
    if (taskIndex > -1) {
        project.tasks.splice(taskIndex, 1);
        storage.addProject(project)
    }
}



export {Project, addTasktoProject, removeTaskfromProject}