import data from './filmsFinal.json' with  {type : 'json'};
const  films = data.films;
function renderFilmList(films) {
    const filmList = document.getElementById('filmList');
    filmList.innerHTML = ''; // Clear previous content

    films.forEach(film => {
        const li = document.createElement('li');
        li.innerHTML = `
            <h2>${film.title}</h2>
            <p><strong>Release Year:</strong> ${film.release_year}</p>
            <p><strong>Director:</strong> ${film.director}</p>
            <p><strong>Box Office:</strong> ${film.box_office}</p>
            <p><strong>Country:</strong> ${film.country}</p>
        `;
        filmList.appendChild(li);
    });
}

// Initial rendering of the film list
renderFilmList(films);

// Search functionality
document.getElementById('searchInput').addEventListener('input', function () {
    const query = this.value.toLowerCase();
    const filteredFilms = films.filter(film =>
        film.title.toLowerCase().includes(query)
    );
    renderFilmList(filteredFilms);
});

// Sort functionality
document.getElementById('sortSelect').addEventListener('change', function () {
    const sortOption = this.value;

    let sortedFilms = [...films];
    if (sortOption === 'releaseYearAsc') {
        sortedFilms.sort((a, b) => a.release_year - b.release_year);
    } else if (sortOption === 'release_yearDesc') {
        sortedFilms.sort((a, b) => b.release_year - a.release_year);
    } else if (sortOption === 'boxOfficeAsc') {
        sortedFilms.sort((a, b) => parseFloat(a.box_office.replace(/[^0-9.-]+/g, "")) - parseFloat(b.box_office.replace(/[^0-9.-]+/g, "")));
    } else if (sortOption === 'boxOfficeDesc') {
        sortedFilms.sort((a, b) => parseFloat(b.box_office.replace(/[^0-9.-]+/g, "")) - parseFloat(a.box_office.replace(/[^0-9.-]+/g, "")));
    }

    renderFilmList(sortedFilms);
});

// Export to JSON functionality
document.getElementById('exportButton').addEventListener('click', function () {
    const jsonContent = JSON.stringify(films, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'film_database.json';
    a.click();

    URL.revokeObjectURL(url);
});