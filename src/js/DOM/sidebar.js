import { Project, addTasktoProject, removeTaskfromProject } from '../projects';
import Task from '../tasks';
import Storage from '../storage';
import { format } from 'date-fns'
import 'bootstrap/dist/css/bootstrap.min.css';


function showAllProjects(storage) {
    clearProjectsfromDOM()
    let projectOrder = storage.getProjectOrder()
    for (let i = 0; i < projectOrder.length; i++) {
        let project = projectOrder[i]
        addProjecttoDOM(project)
    }
}

function showAllTasks(storage) {
    for (let i = 0; i < storage.length(); i++) {
        let tasks = storage.getTasks((storage.key(i)))
        for (let j = 0; j < tasks.length; j++) {
            console.log(tasks[j])
        }
    }
}

function showTasksforToday(storage) {
    for (let i = 0; i < storage.length(); i++) {
        let tasks = storage.getTasks((storage.key(i)))
        for (let j = 0; j < tasks.length; j++) {
            let today = format(new Date, 'yyyy/MM/dd')
            if (tasks[j].date == today) {
                console.log(tasks[j])
            }
        }
    }
}

function showTasksforNext7Days(storage) {
    for (let i = 0; i < storage.length(); i++) {
        let tasks = storage.getTasks((storage.key(i)))
        for (let j = 0; j < tasks.length; j++) {
            let next7days = new Date
            next7days.setDate(next7days.getDate() + 7)
            next7days = format(next7days, 'yyyy/MM/dd')
            console.log(tasks[j].date, next7days)
            if (tasks[j].date < next7days) {
                console.log(tasks[j])
            }
        }
    }
}

function showTasksforProject(storage, project) {
    clearTasksfromDOM()
    addTaskButtontoDOM(project)
    let tasks = storage.getTasks(project)
    for (let j = 0; j < tasks.length; j++) {
        addTasktoDOM(tasks[j], project)
    }
}

function addTaskButtontoDOM(project) {
    let button = document.getElementById('taskButton')
    let taskPage = document.getElementById('taskpage');
    let taskButton = document.createElement('div');
    if (button == null) {
        taskButton.setAttribute('id', 'taskButton');
        taskButton.setAttribute('projectName', project);
        taskButton.setAttribute('data-bs-toggle', 'modal')
        taskButton.setAttribute('data-bs-target', '#taskModal')
        taskButton.classList.add('m-2', 'px-2', 'py-1', 'text-center');
        taskButton.innerHTML = 'Add Task';
        taskPage.append(taskButton)
    }
    
}

function addTasktoDOM (task, projectName) {
    //collapsible card, card shows checkbox, task name, date, edit logo, delete logo
    //data-attribute with task index in project array
    /*<div class="border-bottom border-secondary pb-2 d-flex justify-content-between">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                        <div id="info">Ahlie</div>
                    </div>
                    <div class="d-flex justify-content-between">
                        <div>Date</div>
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                </div>
                */
    let taskpageTasks = document.getElementById('tasks')
    let container = document.createElement('div')
    container.classList.add('border-bottom', 'border-secondary', 'pb-2', 'd-flex', 'justify-content-between')
    let taskContainer = document.createElement('div')
    let form = document.createElement('div')
    form.classList.add('form-check')
    let formInput = document.createElement('input')
    formInput.classList.add('form-check-input')
    formInput.setAttribute('type', 'checkbox')
    formInput.setAttribute('id', 'taskDone')
    let taskName = document.createElement('div')
    taskName.setAttribute('id', 'taskName')
    taskName.innerHTML = task.name 
    let iconContainer = document.createElement('div')
    iconContainer.classList.add('d-flex', 'justify-content-between')
    let date = document.createElement('div')
    date.innerHTML = task.date
    let edit = document.createElement('button')
    edit.innerHTML = 'Edit'
    let deleteTask = document.createElement('button')
    deleteTask.innerHTML = 'Delete'
    form.append(formInput)
    taskContainer.append(form, taskName)
    iconContainer.append(date, edit, deleteTask)
    taskpageTasks.append(taskContainer, iconContainer)
}

function addProjecttoDOM(project) {
    let container = document.getElementById('projectInnerContainer')
    let newProject = document.createElement('div')
    let projectIconName = document.createElement('div')
    projectIconName.innerHTML = project
    projectIconName.classList.add('sidePanelProjectName')
    const deleteProject = document.createElement('button')
    deleteProject.setAttribute('type', 'button')
    deleteProject.classList.add('deleteProjectButton', 'btn-close')
    newProject.classList.add('projectFolder', 'd-flex', 'justify-content-between')
    newProject.append(projectIconName, deleteProject)
    container.appendChild(newProject)
}

function clearProjectsfromDOM() {
    let container = document.getElementById('projectContainer')
    let buttonContainer = document.getElementById('btn-container')
    container.removeChild(document.getElementById('projectInnerContainer'))
    let innerContainer = document.createElement('div')
    innerContainer.setAttribute('id', 'projectInnerContainer')
    innerContainer.classList.add('container')
    container.insertBefore(innerContainer, buttonContainer)
}

function clearTasksfromDOM() {
    let taskpage = document.getElementById('taskpage')
    let taskpageTasks = document.getElementById('tasks')
    let taskButton = document.getElementById('taskButton')
    if (taskpageTasks != null) {
        taskpage.removeChild(taskpageTasks)
        taskpageTasks = document.createElement('div')
        taskpageTasks.classList.add('container', 'pt-3')
        taskpageTasks.setAttribute('id', 'tasks')
        taskpage.prepend(taskpageTasks)
    } else {
        taskpageTasks = document.createElement('div')
        taskpageTasks.classList.add('container', 'pt-3')
        taskpageTasks.setAttribute('id', 'tasks')
        taskpage.prepend(taskpageTasks) 
    }
    if (taskButton != null) {taskpage.removeChild(taskButton)} //check if element exists in DOM
}

function editTask() {
//not DOM
}

function deleteTask() {

}

function editProject() {
//NOT DOM
}

function deleteProject(projectFolder) {
    let projectInnerContainer = document.getElementById('projectInnerContainer') 
    let projectFolders = projectFolder
    projectInnerContainer.removeChild(projectFolders)
}

export { 
    showAllProjects,
    showAllTasks, 
    showTasksforToday, 
    showTasksforNext7Days,
    showTasksforProject,
    deleteProject
}