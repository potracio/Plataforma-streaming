
const galeria = document.getElementById('galeria');

fetch('http://localhost:3000/peliculas')
  .then(res => res.json())
  .then(peliculas => {
    peliculas.forEach(pelicula => {
      const div = document.createElement('div');
      div.className = 'pelicula';
      div.innerHTML = `
        <img src="${pelicula.portada}" alt="${pelicula.titulo}">
        <h3>${pelicula.titulo}</h3>
      `;
      div.addEventListener('click', () => {
        window.location.href = `detalle.html?id=${pelicula.id}`;
      });
      galeria.appendChild(div);
    });
  });
