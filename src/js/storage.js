class Storage {
    clear() {
        localStorage.clear()
    }
    add(project) {
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
    key(index) {
        return localStorage.key(index)
    }
}

export default Storage