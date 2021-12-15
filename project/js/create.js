const createJournal = document.querySelector('.create-journal')

createJournal.onclick = function() {
  const item = document.createElement('li');
  item.classList.add('light');
  item.setAttribute('data-name', hike.name);
  item.innerHTML =  `<div class="journal-cover>
    <input type="text" class="journal-title" placeholder="Journal Title"/>
    <button id="submit">Create</button>
    </div>
    </div>`

}
