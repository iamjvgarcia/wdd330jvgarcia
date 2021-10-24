export default class Task {
    constructor(content = "", id = Date.now(), completed = false) {
        this.content = content;
        this.id = id;
        this.completed = completed;
    }
    toggleTask() {
        this.completed = !this.completed;
    }
    createElement(updateCallback, removeItemCallback) {
        let element = document.createElement('div');
        element.classList.add('task');
        let check = document.createElement('label');
        check.classList.add('checkbox-container');
        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.addEventListener('click', (event) => {
            this.toggleTask();
            updateCallback();
        });
        this.completed ? checkbox.setAttribute('checked', 'true') : "";
        let checkmark = document.createElement('span');
        checkmark.classList.add('checkbox-checkmark');
        check.appendChild(checkbox);
        check.appendChild(checkmark);
        let name = document.createElement('div');
        name.classList.add('taskname');
        name.innerHTML = this.content;
        let button = document.createElement('button');
        button.classList.add("taskremove");
        button.innerHTML = "<i class=\"fas fa-times\"></i>";
        button.addEventListener('click', (event) => removeItemCallback(this));
        element.appendChild(check);
        element.appendChild(name);
        element.appendChild(button);
        return element;
    }
}