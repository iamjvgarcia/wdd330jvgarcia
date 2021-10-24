// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("Add a task!");
  } else {
    document.getElementById("list").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
    
  }
  
}

function filterList(todos, fragment, filterCallback) {
  todos.filter(filterCallback)
    .forEach(filteredTodo => appendFragmentToList(filteredTodo, todosFragment));
}

/**
function removeAllChildNodesFrom($element) {
  while($element.hasChildNodes()) {
    $element.removeChild($element.lastChild);
  }
} */
/* 
const $FilterBtnCollection = document.querySelectorAll('.filterButton');
const li = document.createElement("li");



$FilterBtnCollection.forEach($filterButton => {
  $filterButton.addEventListener('click', (event) => {
    const filter = event.target.dataset.filter || 'all';
    removeAllChildNodesFrom(list);
    switch(filter) {
      case 'completed':
        filterList(li,  (todo) => todo.complete);
        break;
      case 'active':
        filterList(li,  (todo) => !todo.complete);
        break;
      default:
        filterList(li,  (todo) => todo);
    }
  });
});
*/