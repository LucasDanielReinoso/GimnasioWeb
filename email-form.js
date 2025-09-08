// email-form.js

// Función para mostrar/ocultar textarea detalle lesiones
function toggleDetalleLesiones(mostrar) {
  const detalle = document.getElementById('detalle-lesiones-container');
  if (mostrar) {
    detalle.style.display = 'block';
    document.getElementById('detalle_lesiones').setAttribute('required', 'required');
  } else {
    detalle.style.display = 'none';
    document.getElementById('detalle_lesiones').removeAttribute('required');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('form');
  const btn = document.querySelector('.submit-btn');
  const mensajeExito = document.getElementById('mensaje-exito');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Validar si el formulario es válido
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    btn.textContent = 'Enviando...';

    const serviceID = 'service_nz3hgta';
    const templateID = 'template_3brtatp';

    emailjs.sendForm(serviceID, templateID, form)
      .then(() => {
        btn.textContent = 'Enviar';

        // Mostrar mensaje éxito
        mensajeExito.style.display = 'flex';

        // Resetear formulario después de enviar
        form.reset();
        toggleDetalleLesiones(false); // Ocultar detalle lesiones si estaba visible

        // Ocultar mensaje éxito después de 4 segundos
        setTimeout(() => {
          mensajeExito.style.display = 'none';
        }, 4000);

      }, (err) => {
        btn.textContent = 'Enviar';
        alert('Error al enviar el formulario, intenta nuevamente.');
        console.error('EmailJS error:', err);
      });
  });
});
