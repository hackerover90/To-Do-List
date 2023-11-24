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
        //this.updateProjectOrder(project)
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
    getTask(project, taskName) {
        return this.getTasks(project).find(task => task.name == taskName)
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
    taskExists(project, task) { //takes name of task rather than task object
        //returns true if task exists, false otherwise
        let taskList = this.getTasks(project)
        for (let i=0; i < taskList.length; i++) {
            if (taskList[i].name == task) {
                return true
            }
        }
        return false
    }
    removeTask(project, task) {
        let projectObj = this.getProject(project)
        let array = this.getTasks(project)
        let index = -1
        for (let i=0; i < array.length; i++) {
            if (array[i].name == task) {
                index = i
            }
        }
        if (index > -1) {
            array.splice(index, 1);
        }
        projectObj.tasks = array
        this.addProject(projectObj)
    }
    editTask(projectName, oldTaskName, taskName, taskPriority, taskDate, taskDescription) { 
        //edits task in local storage
        let array = this.getTasks(projectName)
        let projectObj = this.getProject(projectName)
        let index = -1
        for (let i=0; i < array.length; i++) {
            if (array[i].name == oldTaskName) {
                index = i
                array[i].name = taskName
                array[i].priority = taskPriority
                array[i].date = taskDate
                array[i].description = taskDescription
                break
            }
        }
        projectObj.tasks = array
        this.addProject(projectObj)
    }
}

export default Storage