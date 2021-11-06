const loadJson = () => {
    return fetch('movies.json')
      .then((response) => {
        loadMenu();
        return response.json()
      })
      .then((res) => {
        const moviesList = document.querySelector('ul');
        for (let i = 0; i < res.movies.length; i++) {
          const movie = document.createElement('li');
          movie.innerHTML = `<h3>${res.movies[ i ].title}</h3>`;
          movie.innerHTML += `<p> Episode ${res.movies[ i ].episode_number}</p>`;
          movie.innerHTML += `<p> ${res.movies[ i ].description}</p>`;
          let castList = '<ul>';
          res.movies[ i ].main_characters.forEach((character) => {
            castList += `<li><img src="./falcon.png" class="falcon">${character}</li>`;
          })
          castList += '</ul>'
          movie.innerHTML += ` Cast: ${castList}`;
          moviesList.appendChild(movie);
        }
      })
  }