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
    if (projectName == '') {alert('Project must have a name'); return}
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
    if (storage.taskExists(projectName, taskName) == true) {
        alert('Task already exists in this project')
        return
    }
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


document.getElementById('taskpage').addEventListener('click', (e) => {
    let taskContainer = document.getElementById('tasks')
    let editButtons = document.getElementsByClassName('editTask')
    let deleteButtons = document.getElementsByClassName('deleteTask')
    let checkboxes = document.querySelectorAll('input[type=checkbox]')
    for (let button of editButtons) {
        if (e.target == button) {
            let projectName = e.target.getAttribute('projectName')
            let taskName = e.target.getAttribute('taskName')
            let task = storage.getTask(projectName, taskName)
            sidebar.editModal(task)
            document.getElementById("editTaskSubmit").addEventListener('click', (e) => {
                e.preventDefault()
                let newTaskName = document.getElementById('edit-task-name').value
                let newTaskPriority = document.getElementById('edit-priority').value
                let newTaskDate = document.getElementById('edit-date').value
                if (newTaskDate == '') {alert('Not a valid date'); return}
                newTaskDate = new Date(newTaskDate)
                newTaskDate.setDate(newTaskDate.getDate() + 1)
                newTaskDate = format(newTaskDate, 'yyyy/MM/dd')
                let newTaskDescription = document.getElementById('edit-description').value
                //sidebar.editTask(taskName, taskPriority, taskDate, taskDescription)
                storage.editTask(projectName, taskName, newTaskName, newTaskPriority, newTaskDate, newTaskDescription)
                let currentProject = storage.getProject(projectName)
                //addTasktoProject(currentProject, task)
                sidebar.showTasksforProject(storage, currentProject)
            
                
                let form = document.getElementById('editTaskForm')
                form.reset()
            })
        }
    }
    for (let button of deleteButtons) {
        if (e.target == button) {
            let projectName = e.target.getAttribute('projectName')
            let taskName = e.target.getAttribute('taskName')
            let taskFolder = button.parentElement.parentElement
            storage.removeTask(projectName, taskName)
            sidebar.deleteTask(taskFolder)
        }
    }
    for (let i=0; i<checkboxes.length; i++) {
        checkboxes[i].addEventListener('change', (e) => {
            let task = checkboxes[i].parentElement.parentElement.parentElement
            let taskName = task.firstChild.lastChild
            let taskDate = task.lastChild.firstChild
            if (checkboxes[i].checked == false) {
                taskName.style.setProperty('text-decoration', 'none')
                taskDate.style.setProperty('text-decoration', 'none')
            } else {
                taskName.style.setProperty('text-decoration', 'line-through')
                taskDate.style.setProperty('text-decoration', 'line-through')
            }
        })
    }
})


let defaultProjects = document.getElementsByClassName('default-project-name')
let inbox = defaultProjects[0]
let today = defaultProjects[1]
let week = defaultProjects[2]
for (let project of defaultProjects) {
    project.addEventListener('click', (e) => {
        if (e.target == inbox) {
            sidebar.showAllTasks(storage)
        } else if (e.target == today) {
            sidebar.showTasksforToday(storage)
        } else if (e.target == week) {
            sidebar.showTasksforNext7Days(storage)
        }
    })
}