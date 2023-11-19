import Storage from "./storage"

let storage = new Storage()

class Project{
    name
    tasks = []
    //make sure project names are different
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
}

function removeTaskfromProject(project, task) {
    const taskIndex = project.tasks.indexOf(task);
    if (taskIndex > -1) { // only splice array when item is found
        project.tasks.splice(taskIndex, 1); // 2nd parameter means remove one item only
        storage.add(project)
    }
}


export {Project, addTasktoProject, removeTaskfromProject}