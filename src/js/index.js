import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css'

// Import our custom CSS
//import '../scss/styles.scss'

//Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
import { format } from 'date-fns'
import { Project, addTasktoProject, removeTaskfromProject } from './projects';
import Task from './tasks';
import Storage from './storage';
import * as sidebar from './DOM/sidebar'


let storage = new Storage()
//storage.clear()
sidebar.showAllProjects(storage)

//let projectForm = document.getElementById('projectForm')

document.getElementById('projectSubmit').addEventListener('click', (e) => {
    e.preventDefault()
    let projectName = document.getElementById('projectName').value
    if (storage.getProject(projectName)) {alert('This project already exists'); return}
    let project = new Project(projectName)
    storage.addProject(project)
    storage.updateProjectOrder(project)
    sidebar.showAllProjects(storage)
    location.reload();
})

document.getElementById('taskSubmit').addEventListener('click', (e) => {
    e.preventDefault()
    let taskButton = document.getElementById('taskButton')
    let projectName = taskButton.getAttribute('projectname')
    let taskName = document.getElementById('task-name').value
    let taskPriority = document.getElementById('priority').value
    let taskDate = document.getElementById('date').value
    if (taskDate == '') {alert('Not a valid date'); return}
    taskDate = new Date(taskDate)
    taskDate.setDate(taskDate.getDate() + 1)
    taskDate = format(taskDate, 'yyyy/MM/dd')
    let taskDescription = document.getElementById('description').value
    let task = new Task(taskName, taskPriority, taskDate, taskDescription)
    let currentProject = storage.getProject(projectName)
    addTasktoProject(currentProject, task)
    sidebar.showTasksforProject(storage, currentProject)

    
    let form = document.getElementById('taskForm')
    form.reset()
})

let projects = document.getElementsByClassName('projectFolder')

for (let project of projects) {
    let deleteButton = project.lastChild
    project.addEventListener('click', (e) => {
        for (let project of projects) {
            project.style.background = ''
        }
        if (e.target == deleteButton) {
            let projectName = project.firstChild.innerText
            sidebar.deleteProject(project)
            storage.remove(projectName)
        } else {
            let projectName = e.currentTarget.firstChild.innerText
            let currentProject = storage.getProject(projectName)
            let g  = e.currentTarget
            g.style.background = 'rgba(69, 69, 69, 0.8)'
            sidebar.showTasksforProject(storage, currentProject)
        }
    })
}

/*
let taskPage = document.getElementById('taskpage')

taskPage.addEventListener('click', (e) => {
    let taskContainer = document.getElementById('tasks')
    let taskButton = document.getElementById('taskButton')
    if (e.target == taskButton) {
        let projectName = e.target.getAttribute('projectName')
    }
})
*/
