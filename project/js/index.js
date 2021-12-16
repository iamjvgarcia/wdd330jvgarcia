const listViewButton = document.querySelector('.list-view-button');
const gridViewButton = document.querySelector('.grid-view-button');
const list = document.querySelector('ol');

listViewButton.onclick = function () {
  list.classList.remove('grid-view-filter');
  list.classList.add('list-view-filter');
}

gridViewButton.onclick = function () {
  list.classList.remove('list-view-filter');
  list.classList.add('grid-view-filter');
}

//----------------------  RENDER Modal ---------------------- 
var mobileToggleContainer = document.querySelector('.toggle-container');
var mobileToggle = document.querySelector('.toggle');
var mobileMenu = document.querySelector('.create-journal');

if (mobileToggle) {
  mobileToggle.addEventListener('click', function (event) {
    mobileToggleContainer.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  })
}


function journal(){

  // Retrieve stored notes from local storage
  var notesObj = JSON.parse(localStorage.getItem('notes')) || {};   


  // Render existing notes on load
  renderNotes(notesObj);

  // ----------------------  RENDER notes ---------------------- 
  function renderNotes(notesObj){

      var mainNode = document.getElementById("notes");

      // Clear old notes
      mainNode.innerHTML = "";

      // Loop through each note 
      for (var key in notesObj){
          // Create card li
          var div = document.createElement("li");
          div.className = 'card';
          div.dataset.id = key;

          var noteText = createEleNode('p',null, notesObj[key].text, null, null);
          var noteType = createEleNode('hr', 'noteType', "", null, null);
          var delBtn = createEleNode('button', 'secondaryBtn', 'Delete', 'click', deleteNote);
          var editBtn = createEleNode('button', 'secondaryBtn', 'Edit', 'click', editNote);

          div.appendChild(noteText);
          div.appendChild(delBtn);
          div.appendChild(editBtn);
          div.appendChild(noteType);
              
          mainNode.appendChild(li);
      }  
  }

  // ----------------------  ADD note ---------------------- 
  var saveBtn = document.getElementsByClassName("save-button");
  saveBtn.addEventListener("click", function() {

          var userInput = document.getElementsByClassName("entry-title").value;
          if(userInput.length > 0){
          //Generate UID using UNIX timestamp    
              var uid = Date.now().toString();

              // Current note object
              var currentNote = {
                  text: userInput,
              }

              notesObj[uid] = currentNote;

              // Save the object in local storage
              updateLocalStorage();

              // Re render
              renderNotes(notesObj);
          }

          return currentNote;

  });

  // ----------------------  DELETE note ---------------------- 
  function deleteNote(){
      // Remove from DOM
      this.parentNode.parentNode.removeChild(this.parentNode);
      // Remove from object
      delete notesObj[this.parentNode.dataset.id];
      // Update local storage
      updateLocalStorage();
  };

  // ----------------------  EDIT note ---------------------- 
  function editNote(){
      // Get id from dataset
      var noteId = this.parentNode.dataset.id;
      // Create journalTitle
      var journalTitle = "<input id='edit-" + noteId + "'>"+ this.parentNode.firstChild.innerText +"</input>";
      this.parentNode.innerHTML = journalTitle;
      var editBox = document.getElementById('edit-' + noteId);
      // Set focus to input
      editBox.focus();
      // Update note when focus moves from the input
      editBox.addEventListener("blur", function () {
          // Update in local object
          notesObj[noteId].text = editBox.value;
          // Update local storage
          updateLocalStorage();
          // Re create note with upated value
          var noteText = createEleNode('p',"", editBox.value, null, null);
          var noteType = createEleNode('hr', 'noteType', "", null, null);
          var delBtn = createEleNode('button', 'secondaryBtn', 'Delete', 'click', deleteNote);
          var editBtn = createEleNode('button', 'secondaryBtn', 'Edit', 'click', editNote);
          this.parentNode.appendChild(noteText);
          this.parentNode.appendChild(delBtn);
          this.parentNode.appendChild(editBtn);
          this.parentNode.appendChild(noteType);
          this.parentNode.removeChild(this.parentNode.firstChild); 
      }); 
  }


  // Create html element
  function createEleNode(element,className,text,event,fn){
      var e = document.createElement(element);
      if(className){
          e.className = className;
      }
      var label = document.createTextNode(text);
      e.appendChild(label);
      if(event){
          e.addEventListener(event, fn);
      }
      return e;
  }

  // Update local storage
  function updateLocalStorage(){
      localStorage.setItem('notes', JSON.stringify(notesObj));
  }

};

