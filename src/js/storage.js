class Storage {
    clear() {
        localStorage.clear()
    }
    addProject(project) {
        return localStorage.setItem(project.name, JSON.stringify(project))
    }
    remove(project) {
        localStorage.removeItem(project.name)
    }
    getProject(project) {
        return JSON.parse(localStorage.getItem(project.name))
    }
    getTasks(project) {
        return this.getProject(project).tasks
    }
    addTask(project, task) {
        this.getTasks(project).push(task)
        this.addProject(project)
    }
    key(index) {
        return localStorage.key(index)
    }
}

export default Storage