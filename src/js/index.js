import '../css/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
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

let projectForm = document.getElementById('projectForm')

document.getElementById('projectSubmit').addEventListener('click', (e) => {
    e.preventDefault()
    let projectName = document.getElementById('projectName').value
    if (storage.getProject(projectName)) {alert('This project already exists'); return}
    let project = new Project(projectName)
    storage.addProject(project)
    sidebar.showAllProjects(storage)
    location.reload();
})

document.getElementById('taskSubmit').addEventListener('click', (e) => {
    e.preventDefault()
    let taskButton = document.getElementById('taskButton')
    let projectName = taskButton.getAttribute('projectname')
    let taskName = document.getElementById('taskName').value
    console.log(taskName)
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
})

let projects = document.getElementsByClassName('projectFolder')

for (let project of projects) {
    let deleteButton = project.lastChild
    project.addEventListener('click', (e) => {
        if (e.target == deleteButton) {
            let projectName = project.firstChild.innerText
            sidebar.deleteProject(project)
            storage.remove(projectName)
        } else {
            sidebar.showTasksforProject(storage, e.currentTarget.firstChild.innerText)
        }
    })
}

let taskPage = document.getElementById('taskpage')

taskPage.addEventListener('click', (e) => {
    let taskContainer = document.getElementById('tasks')
    let taskButton = document.getElementById('taskButton')
    if (e.target == taskButton) {
        let projectName = e.target.getAttribute('projectName')
    }
})
