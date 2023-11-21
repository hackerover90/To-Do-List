import Storage from "./storage"

let storage = new Storage()

class Project{
    name
    tasks = []
    //PROJECT NAMES MUST BE DIFFERENT
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
    //DELETE TASK SIMULTANEOUSLY IN PROJECT AND INBOX
    const taskIndex = project.tasks.indexOf(task);
    if (taskIndex > -1) { // only splice array when item is found
        project.tasks.splice(taskIndex, 1); // 2nd parameter means remove one item only
        storage.addProject(project)
    }
}



export {Project, addTasktoProject, removeTaskfromProject}