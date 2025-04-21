const contenedor = document.getElementById('detalle-pelicula');
const resenasDiv = document.getElementById('resenas');
const form = document.getElementById('form-resena');
const comentarioInput = document.getElementById('comentario');
const usuarioInput = document.getElementById('usuario');

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

fetch(`http://localhost:3000/peliculas/${id}`)
  .then(res => res.json())
  .then(pelicula => {
    contenedor.innerHTML = `
      <img src="${pelicula.portada}" alt="${pelicula.titulo}" />
      <h2>${pelicula.titulo}</h2>
      <p><strong>Director:</strong> ${pelicula.director}</p>
      <p><strong>Año:</strong> ${pelicula.anio}</p>
      <p><strong>Género:</strong> ${pelicula.genero}</p>
      <p><strong>Sinopsis:</strong> ${pelicula.sinopsis}</p>
    `;

    // Mostrar reseñas
    function mostrarResenas(resenas) {
      resenasDiv.innerHTML = '<h3>Reseñas</h3>' + 
        resenas.map(r => `<p><strong>${r.usuario}:</strong> ${r.comentario}</p>`).join('');
    }

    mostrarResenas(pelicula.resenas); // Llamamos a mostrar reseñas al cargar la película

    // Manejo del formulario para agregar una nueva reseña
    form.addEventListener('submit', e => {
      e.preventDefault();
      const nombreUsuario = usuarioInput.value.trim();
      const comentario = comentarioInput.value.trim();
      if (nombreUsuario && comentario) {
        const nuevaResena = { usuario: nombreUsuario, comentario: comentario };
        pelicula.resenas.push(nuevaResena);
        fetch(`http://localhost:3000/peliculas/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ resenas: pelicula.resenas })
        }).then(() => {
          mostrarResenas(pelicula.resenas); // Actualizamos las reseñas
          usuarioInput.value = ''; // Limpiamos los campos del formulario
          comentarioInput.value = '';
        });
      }
    });
  })
  .catch(error => console.error('Error:', error));
