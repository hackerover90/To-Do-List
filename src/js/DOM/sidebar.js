import { Project, addTasktoProject, removeTaskfromProject } from '../projects';
import Task from '../tasks';
import Storage from '../storage';
import { format } from 'date-fns'
//import 'bootstrap/dist/css/bootstrap.min.css';


function showAllProjects(storage) {
    clearProjectsfromDOM()
    let projectOrder = storage.getProjectOrder()
    for (let i = 0; i < projectOrder.length; i++) {
        let project = projectOrder[i]
        addProjecttoDOM(project)
    }
}

function showAllTasks(storage) {
    clearTasksfromDOM()
    let projectOrder = storage.getProjectOrder()
    for (let i = 0; i < projectOrder.length; i++) {
        let tasks = storage.getTasks(projectOrder[i])
        let project = storage.getProject(projectOrder[i])
        for (let j=0; j<tasks.length; j++) {
            let iconContainer = addTasktoDOM(tasks[j], j, project)
            iconContainer.removeChild(iconContainer.lastChild)
            iconContainer.removeChild(iconContainer.lastChild)
        }
    }
}

function showTasksforToday(storage) {
    clearTasksfromDOM()
    let projectOrder = storage.getProjectOrder()
    for (let i = 0; i < projectOrder.length; i++) {
        let tasks = storage.getTasks(projectOrder[i])
        let project = storage.getProject(projectOrder[i])
        let today = format(new Date, 'yyyy/MM/dd')
        for (let j = 0; j < tasks.length; j++) {
            if (tasks[j].date == today) {
                let iconContainer = addTasktoDOM(tasks[j], j, project)
                iconContainer.removeChild(iconContainer.lastChild)
                iconContainer.removeChild(iconContainer.lastChild)
            }
        }
    }
}

function showTasksforNext7Days(storage) {
    clearTasksfromDOM()
    let projectOrder = storage.getProjectOrder()
    for (let i = 0; i < projectOrder.length; i++) {
        let tasks = storage.getTasks(projectOrder[i])
        let project = storage.getProject(projectOrder[i])
        let today = format(new Date, 'yyyy/MM/dd')
        let next7days = new Date
        next7days.setDate(next7days.getDate() + 7)
        next7days = format(next7days, 'yyyy/MM/dd')
        for (let j = 0; j < tasks.length; j++) {
            if (tasks[j].date <= next7days && tasks[j].date >= today) {
                let iconContainer = addTasktoDOM(tasks[j], j, project)
                iconContainer.removeChild(iconContainer.lastChild)
                iconContainer.removeChild(iconContainer.lastChild)
            }
        }
    }
}

function showTasksforProject(storage, project) {
    clearTasksfromDOM()
    addTaskButtontoDOM(project)
    let tasks = storage.getTasks(project)
    for (let j = 0; j < tasks.length; j++) {
        addTasktoDOM(tasks[j], j, project)
    }
    addProjectHeadertoDOM(project)
}

function addProjectHeadertoDOM(project) {
    let taskPage = document.getElementById('taskpage')
    let header = document.createElement('div')
    header.setAttribute('id', 'projectHeader')
    header.innerHTML = project.name
    taskPage.prepend(header)
}

function addTaskButtontoDOM(project) {
    let button = document.getElementById('taskButton')
    let taskPage = document.getElementById('taskpage');
    let taskButton = document.createElement('div');
    let text = document.createElement('div')
    taskButton.classList.add('container', 'd-flex', 'justify-content-center')
    if (button == null) {
        taskButton.setAttribute('id', 'taskButton');
        taskButton.setAttribute('projectName', project.name);
        taskButton.setAttribute('data-bs-toggle', 'modal')
        taskButton.setAttribute('data-bs-target', '#taskModal')
        taskButton.classList.add('px-3', 'py-1', 'text-center');
        text.innerHTML = 'Add Task';
        text.setAttribute('id', 'taskButtonText')
        taskPage.appendChild(taskButton).appendChild(text)
    }
    
}

function addTasktoDOM (task, j, project) {
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
    //create task block
    let taskpageTasks = document.getElementById('tasks')
    let container = document.createElement('div')
    container.classList.add('task', 'border-bottom', 'border-secondary', 'pb-2', 'd-flex', 'justify-content-between', 'flex-wrap')
    let taskContainer = document.createElement('div')
    taskContainer.classList.add('d-flex')
    let form = document.createElement('div')
    form.classList.add('form-check')
    let formInput = document.createElement('input')
    formInput.classList.add('done', 'form-check-input')
    formInput.setAttribute('type', 'checkbox')
    formInput.setAttribute('id', ('taskDone'+j))
    let taskName = document.createElement('div')
    taskName.classList.add('taskName')
    taskName.innerHTML = task.name
    taskName.setAttribute('data-bs-toggle', 'collapse')
    let taskCollapseId = '#taskId'+j
    taskName.setAttribute('data-bs-target', taskCollapseId)
    taskName.setAttribute('daria-expanded', 'false')
    taskName.setAttribute('aria-controls', ('taskId'+j)) 
    let iconContainer = document.createElement('div')
    iconContainer.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'gap-3')
    let date = document.createElement('div')
    date.innerHTML = task.date
    let edit = document.createElement('button')
    edit.innerHTML = 'Edit'
    edit.classList.add('editTask')
    edit.setAttribute('projectName', project.name)
    edit.setAttribute('taskName', task.name)
    edit.setAttribute('data-bs-toggle', 'modal')
    edit.setAttribute('data-bs-target', '#editTaskModal')
    let deleteTask = document.createElement('button')
    deleteTask.innerHTML = 'Delete'
    deleteTask.classList.add('deleteTask')
    deleteTask.setAttribute('projectName', project.name)
    deleteTask.setAttribute('taskName', task.name)
    form.append(formInput)
    taskContainer.append(form, taskName)
    iconContainer.append(date, edit, deleteTask)
    container.append(taskContainer, iconContainer)
    taskpageTasks.append(container)

    //create dropdown card
    let card = document.createElement('div')
    card.classList.add('collapse')
    card.setAttribute('id', ('taskId'+j))
    let cardBody = document.createElement('div')
    cardBody.classList.add('card', 'card-body')
    let description = document.createElement('div')
    description.innerHTML = 'Description: '+ task.description
    let priority = document.createElement('div')
    priority.innerHTML = 'Priority: '+ task.priority
    cardBody.append(description, priority)
    card.append(cardBody)
    taskpageTasks.append(card)
    let breaks = document.createElement('br')
    taskpageTasks.append(breaks)
    return iconContainer
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
    let projectHeader = document.getElementById('projectHeader')
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
    if (projectHeader != null) {
        taskpage.removeChild(projectHeader)
    }
}

function deleteTask(taskFolder) {
    let taskContainer = document.getElementById('tasks')
    taskContainer.removeChild(taskFolder.nextElementSibling.nextElementSibling) //removes <br>
    taskContainer.removeChild(taskFolder.nextElementSibling) //removes collapsible
    taskContainer.removeChild(taskFolder) //removes container holding task
}

function editProject() {
//NOT DOM
}

function deleteProject(projectFolder) {
    clearTasksfromDOM()
    let projectInnerContainer = document.getElementById('projectInnerContainer') 
    projectInnerContainer.removeChild(projectFolder)
}

function editModal(task) {
    let name = document.getElementById('edit-task-name')
    name.setAttribute('value', task.name)
    let priority = document.getElementById(task.priority)
    priority.selected = true
    let date = document.getElementById('edit-date')
    let taskDate = new Date(task.date)
    taskDate = format(taskDate, 'yyyy-MM-dd')
    date.setAttribute('value', taskDate)
    let description = document.getElementById('edit-description')
    description.innerHTML = task.description
}

//editTask(taskName, priority, date, description) {
    //storage.getTask()
//}

export { 
    showAllProjects,
    showAllTasks,
    showTasksforToday, 
    showTasksforNext7Days,
    showTasksforProject,
    deleteProject,
    deleteTask,
    editModal
}