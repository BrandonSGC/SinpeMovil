document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.querySelector('.banco__formulario');
  
    formulario.addEventListener('submit', async (event) => {
      event.preventDefault(); // Evita el envío del formulario predeterminado
  
      const nombre = document.getElementById('nombreBanco').value;
      const estado = document.getElementById('estado').value;
  
      // Enviar los datos al backend
      try {
        const response = await fetch('/formulario', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ nombre, estado })
        });
  
        if (response.ok) {
          // Los datos se enviaron correctamente
          console.log('Datos enviados correctamente');
        } else {
          // Ocurrió un error al enviar los datos
          console.error('Error al enviar los datos:', response.statusText);
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    });
  });