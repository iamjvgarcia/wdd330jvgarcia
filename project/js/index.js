const listViewButton = document.querySelector('.list-view-button');
const gridViewButton = document.querySelector('.grid-view-button');
const list = document.querySelector('#journal-list');

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




