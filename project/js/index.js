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

//Create
var mobileToggleContainer = document.querySelector('.toggle-container');
var mobileToggle = document.querySelector('.toggle');
var mobileMenu = document.querySelector('.create-journal');

if (mobileToggle) {
  mobileToggle.addEventListener('click', function (event) {
    mobileToggleContainer.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  })
}


(function() {
  'use strict';

  var app = {
    noteEditor: document.getElementsByClassName('journal-editor'),
    noteEditorTitle: document.getElementById('journal-editor-title'),
    title: document.getElementsByClassName('entry-title'),
    message: document.getElementsByClassName('entry-textbox'),
    addButton: document.getElementById('add-btn'),
    errorDisplay: document.getElementById('error'),
    deleteButton: document.querySelector('.delete'),
    editButton: document.querySelector('.edit'),
    notesSection: document.getElementById('notes-section'),
    notes: document.getElementById('notes'),
    editMode: false,

    init: function() {
      app.title.addEventListener('focus', app.clearError);
      app.message.addEventListener('focus', app.clearError);

      app.title.addEventListener('keypress', app.detectInput);
      app.message.addEventListener('keypress', app.detectInput);

      app.addButton.addEventListener('click', app.createNote);
    },
    detectInput1: function() {
      if(!app.title.value || !app.message.value) {
        return;
      } else {
        app.addButton.innerText = 'Create Note';
      }
    },
    clearError: function() {
      app.title.classList.remove('is-empty');
      app.message.classList.remove('is-empty');
      app.errorDisplay.innerHTML = '';
    },
    createNote: function() {
      if(!app.title.value || !app.message.value) {
        if(!app.title.value) {
          app.title.classList.add('is-empty');  
        }
        if(!app.message.value) {
          app.message.classList.add('is-empty');
        }
        app.errorDisplay.innerHTML = '<span>*Values required</span>';
        return;
      } else {
        var note = new Object();

        note.title = app.title.value;
        note.message = app.message.value;

        app.addNote(note);
      }
    },
    addNote: function(note) {
      var li = document.createElement('li'),
      deleteBtn = document.createElement('span'),
      editBtn = document.createElement('span'),
      title = document.createElement('span'),
      message = document.createElement('span'),
      footer = document.createElement('footer');

      deleteBtn.className = 'delete';
      deleteBtn.innerHTML = '<i class="fa fa-trash-o"></i>';
      deleteBtn.addEventListener('click', app.deleteNote);

      title.className = 'note-title';
      title.innerHTML = note.title;

      message.className = 'note-message';
      message.innerHTML = note.message;

      editBtn.className = 'edit';
      editBtn.innerHTML = '<i class="fa fa-pencil-square-o"></i> Edit';
      editBtn.addEventListener('click', app.editNote);

      footer.appendChild(editBtn);
      

      li.appendChild(deleteBtn);
      li.appendChild(title);
      li.appendChild(message);
      li.appendChild(footer);

      app.notes.prepend(li);

      app.title.value = '';
      app.message.value = '';

      if(!app.editMode) {
        app.addButton.innerText = 'Create Note';
      } else {
        setTimeout(function() {
          app.addButton.innerText = 'Create Note';
        }, 200);
      }
    },
    editNote: function() {
      var li,
      title,
      message,
      note = new Object();

      li = this.parentNode.parentNode;

      for(var i = 0; i < li.childNodes.length; i++) {
        if(li.childNodes[i].className === 'note-title') {
          title = li.childNodes[i].innerText;
        }
      }

      for(var i = 0; i < li.childNodes.length; i++) {
        if(li.childNodes[i].className === 'note-message') {
          message = li.childNodes[i].innerText;
        }
      }

      note.title = title;
      note.message = message;
      
      app.openNote(note);

      setTimeout(function() {
        li.remove();
      }, 200);
    },
    openNote: function(note) {
      if(!app.editMode) {
        app.noteEditor.classList.add('hide');
        app.notesSection.classList.add('hide');
      
        setTimeout(function() {
          app.noteEditorTitle.innerText = 'Edit Note';
          
          app.addButton.innerText = 'Done';
          app.addButton.removeEventListener('click', app.createNote);
          app.addButton.addEventListener('click', app.saveNote);

          app.title.value = note.title;
          app.message.value = note.message;

          app.noteEditor.classList.remove('hide');
          app.editMode = true;
        }, 200);
      } else {
        return;
      }  
    },
    saveNote: function() {
      app.createNote();

      app.noteEditor.classList.add('hide');
      app.notesSection.classList.add('hide');
    
      setTimeout(function() {
        app.noteEditorTitle.innerText = 'Create Note';

        app.addButton.removeEventListener('click', app.saveNote);
        app.addButton.addEventListener('click', app.createNote);

        app.title.value = '';
        app.message.value = '';

        app.notesSection.classList.remove('hide');
        app.noteEditor.classList.remove('hide');
        app.editMode = false;
      }, 200);
    },    
    deleteNote: function() {
      this.parentNode.remove();
    }
  };

  app.init();

})();