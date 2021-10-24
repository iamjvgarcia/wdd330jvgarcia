import StorageHelper from './ls.js';
import Task from './task.js';

export default class TaskList {
    constructor(name = 'todo') {
        this.ls = new StorageHelper();
        this.name = name;
        let templist = JSON.parse(this.ls.load(this.name));
        this.list = [];
        templist?.forEach(x => {
            this.list.push(new Task(x.content,x.id,x.completed));
        })
        this.renderList();
    }
    addTask(content) {
        let task = new Task(content = content);
        this.list.push(task);
        document.getElementById('taskList').appendChild(task.createElement(this.save.bind(this), this.removeTask.bind(this)));
        this.save();
    }
    removeTask(task) {
        const index = this.list.indexOf(task);
        if (index > -1) {
            this.list.splice(index, 1);
        }
        this.renderList();
        this.save();
    }
    save() {
        this.ls.save(this.name, JSON.stringify(this.list));
        this.updateNumRemaining();
    }
    numUncompleted() {
        let count = 0;
        this.list.forEach(x => count += x.completed ? 0 : 1);
        return count;
    }
    renderList(filters = ""){
        let container = document.getElementById("taskList");
        container.textContent="";
        if (this.list) {
            this.list.forEach(x => {
                switch (filters) {
                    case "ACTIVE":
                        if (!x.completed) container.appendChild(x.createElement(this.save.bind(this), this.removeTask.bind(this)));
                        break;
                    case "COMPLETED":
                        if (x.completed) container.appendChild(x.createElement(this.save.bind(this), this.removeTask.bind(this)));
                        break;
                    default:
                        container.appendChild(x.createElement(this.save.bind(this), this.removeTask.bind(this)));
                        break;
                }
            });
        }
        this.updateNumRemaining();
    }
    updateNumRemaining() {
        let numremaining = this.numUncompleted();
        document.getElementById('remainingtasks').innerHTML = `<p>${numremaining} task${numremaining > 1 ? 's' : ""} remaining</p>`;
    }
}