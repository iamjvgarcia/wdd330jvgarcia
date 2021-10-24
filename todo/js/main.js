import TaskList from "./taskList.js";

class Todo {
    constructor() {
        this.todoList = new TaskList();
        document.getElementById('newtask').addEventListener("keyup", (event) => (event.key == 'Enter') ? this.addTask() : "")
        document.getElementById('filter-all').addEventListener('click', this.filterAll.bind(this));
        document.getElementById('filter-active').addEventListener('click', this.filterActive.bind(this));
        document.getElementById('filter-completed').addEventListener('click', this.filterCompleted.bind(this));
        document.getElementById('add-task').addEventListener('click', this.addTask.bind(this));
    }
    
    addTask() {
        let txtbox = document.getElementById('newtask');
        this.todoList.addTask(txtbox.value);
        txtbox.value = "";
    }
    
    filterAll() {
        this.todoList.renderList()
    }
    filterActive() {
        this.todoList.renderList("ACTIVE")
    }
    filterCompleted() {
        this.todoList.renderList("COMPLETED")
    }
}
let todo = new Todo();
