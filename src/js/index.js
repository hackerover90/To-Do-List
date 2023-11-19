import '../css/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { format } from 'date-fns'
import { Project, addTasktoProject, removeTaskfromProject } from './projects';
import Task from './tasks';
import Storage from './storage';

let storage = new Storage()

let task1 = new Task('Dishes', 'High', format(new Date(), 'MM/dd/yyyy'), 'First task')
let task2 = new Task('Clean', 'Medium', format(new Date(), 'MM/dd/yyyy'), 'Second task')
let task3 = new Task('Rest', 'Low', format(new Date(), 'MM/dd/yyyy'), 'Third task')

let project1 = new Project('First Project')
let project2 = new Project('Second Project')
let project3 = new Project('Third Project')



addTasktoProject(project1, task1)
addTasktoProject(project1, task2)
addTasktoProject(project2, task3)


storage.clear()
storage.add(project1)
storage.add(project2)
storage.add(project3)
console.log(localStorage)
removeTaskfromProject(project1, task2)
console.log(project1.tasks)
console.log(localStorage)

console.log(storage.getProject(project1))