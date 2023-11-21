class Storage {

    constructor() {
        if (localStorage.getItem('') == null) {
            localStorage.setItem('', JSON.stringify([]))
        } 
    }
    
    clear() {
        localStorage.clear()
    }
    getProjectOrder() {
        return JSON.parse(localStorage.getItem(''))
    }
    updateProjectOrder(project) {
        let newOrderArr = JSON.parse(localStorage.getItem(''))
        newOrderArr.push(project.name)
        localStorage.setItem('', JSON.stringify(newOrderArr))
    }
    addProject(project) {
        this.updateProjectOrder(project)
        return localStorage.setItem(project.name, JSON.stringify(project))
    }
    remove(project) { //takes name of project and removes it from local storage and the array that holds local storage order
        localStorage.removeItem(project)
        //Below code removes project from array in local storage that holds project order
        let newOrderArr = JSON.parse(localStorage.getItem(''))
        const index = newOrderArr.indexOf(project)
        if (index > -1) {newOrderArr.splice(index, 1)}
        localStorage.setItem('', JSON.stringify(newOrderArr))
    }
    getProject(project) {
        if (typeof project === 'object') {
            return JSON.parse(localStorage.getItem(project.name))
        } else {
            return JSON.parse(localStorage.getItem(project)) 
        }       
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
    length() {
        let length = localStorage.length
        return length
    }
}

export default Storage