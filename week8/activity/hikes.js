//create an array of hikes
const hikeList = [
  {
    name: 'Bechler Falls',
    imgSrc: 'falls.jpg',
    imgAlt: 'Image of Bechler Falls',
    distance: '3 miles',
    difficulty: 'Easy',
    description:
      'Beautiful short hike along the Bechler river to Bechler Falls',
    directions:
      'Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road.Drive to the end of the Cave Falls road. There is a parking area at the trailhead.'
  },
  {
    name: 'Teton Canyon',
    imgSrc: 'falls.jpg',
    imgAlt: 'Image of Bechler Falls',
    distance: '3 miles',
    difficulty: 'Easy',
    description: 'Beautiful short (or long) hike through Teton Canyon.',
    directions:
      'Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Staline Raod for a short distance, then left onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead.'
  },
  {
    name: 'Denanda Falls',
    imgSrc: 'falls.jpg',
    imgAlt: 'Image of Bechler Falls',
    distance: '7 miles',
    difficulty: 'Moderate',
    description:
      'Beautiful hike through Bechler meadows river to Denanda Falls',
    directions:
      'Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead.'
  }
];

const imgBasePath = '//byui-cit.github.io/cit261/examples/';

class Hikes {
  constructor(elementId) {
    this.parentElement = document.getElementById(elementId);
    this.backButton = this.buildBackButton();
    this.comments = new Comments('hikes', 'comments');
  }

  getAllHikes() {
    return hikeList;
  }

  getHikeByName(hikeName) {
    return this.getAllHikes().find(hike => hike.name === hikeName);
  }

  showHikeList() {
    this.parentElement.innerHTML = '';

    renderHikeList(this.parentElement, this.getAllHikes());
    this.addHikeListener();
    this.backButton.classList.add('hidden');
    this.comments.showCommentList();
  }

  showOneHike(hikeName) {
    const hike = this.getHikeByName(hikeName);
    this.parentElement.innerHTML = '';
    this.parentElement.appendChild(renderOneHikeFull(hike));
    this.backButton.classList.remove('hidden');
    this.comments.showCommentList(hikeName);
  }

  addHikeListener() {
    const childrenArray = Array.from(this.parentElement.children);
    childrenArray.forEach(child => {
      child.addEventListener('click', e => {
        this.showOneHike(e.currentTarget.dataset.name);
      });
    });
  }
  buildBackButton() {
    const backButton = document.createElement('button');
    backButton.setAttribute("id", "backButton")
    backButton.innerHTML = 'All Hikes';
    backButton.addEventListener('click', () => {
      this.showHikeList();
    });
    backButton.classList.add('hidden');
    this.parentElement.before(backButton);
    return backButton;
  }
}

function renderHikeList(parent, hikes) {
  hikes.forEach(hike => {
    parent.appendChild(renderOneHikeLight(hike));
  });
}
function renderOneHikeLight(hike) {
  const item = document.createElement('li');
  item.classList.add('light');
  item.setAttribute('data-name', hike.name);
  item.innerHTML = ` <h2>${hike.name}</h2>
  <div class="hikeContainer">
  <div class="image"><img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>
  <div>
          <div>
              <h3>Distance</h3>
              <p>${hike.distance}</p>

              <h3>Difficulty</h3>
              <p>${hike.difficulty}</p>
          </div>
  </div>
  <div>`;

  return item;
}
function renderOneHikeFull(hike) {
  const item = document.createElement('li');
  item.setAttribute("class","oneHike")
  item.innerHTML = ` 
      <div class="oneContainer">
        <img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}">
        <h2>${hike.name}</h2>
        <div>
            <h3>Distance</h3>
            <p>${hike.distance}</p>
        </div>
        <div>
            <h3>Difficulty</h3>
            <p>${hike.difficulty}</p>
        </div>
        <div>
            <h3>Description</h3>
            <p>${hike.description}</p>
        </div>
        <div>
            <h3>How to get there</h3>
            <p>${hike.directions}</p>
        </div>
      </div>
    
    `;
  return item;
}



class CommentModel {
  constructor(type) {
    this.type = type;
    this.comments = readFromLS(this.type) || [];
  }

  getComments(q = null) {
    if (q === null) {
      return this.comments;
    } else {
      return this.comments.filter(el => el.name === q);
    }
  }

  addComment(postName, comment) {
    const newComment = {
      name: postName,
      comment: comment,
      date: new Date()
    };
    this.comments.push(newComment);
    writeToLS(this.type, this.comments);
  }
}

function writeToLS(key, data) {
  window.localStorage.setItem(key, JSON.stringify(data));
}

function readFromLS(key) {
  return JSON.parse(window.localStorage.getItem(key));
}


const commentUI = `<div class="addComment">

<input type="text" id="commentEntry" placeholder="Write a comment"/>
<button id="submit">Submit</button>
</div>
<h2>Comments</h2>
<ul class="comments"></ul>`;

function renderCommentList(element, comments) {
  element.innerHTML = '';
  comments.forEach(el => {
    let item = document.createElement('li');
    item.innerHTML = `
            ${el.name}: ${el.comment}
      `;

    element.appendChild(item);
  });
}


class Comments {
  constructor(type, commentElementId) {
    this.type = type;
    this.commentElementId = commentElementId;
    this.model = new CommentModel(this.type);
  }

  addSubmitListener(postName) {
    document.getElementById('submit').onclick = () => {
      this.model.addComment(
        postName,
        document.getElementById('commentEntry').value
      );
      document.getElementById('commentEntry').value = '';
      this.showCommentList(postName);
    };
  }
  showCommentList(q = null) {
    try {
      const parent = document.getElementById(this.commentElementId);
      if (!parent) throw new Error('comment parent not found');
      if (parent.innerHTML === '') {
        parent.innerHTML = commentUI;
      }
      if (q !== null) {
        document.querySelector('.addComment').style.display = 'block';
        this.addSubmitListener(q);
      } else {
        document.querySelector('.addComment').style.display = 'none';
      }
      let comments = this.model.getComments(q);
      if (comments === null) {
        comments = [];
      }
      renderCommentList(parent.lastChild, comments);
    } catch (error) {
      console.log(error);
    }
  }
}

const myHikes = new Hikes("hikes");
window.addEventListener("load", () => {
  myHikes.showHikeList();
});
myHikes.hikeList;