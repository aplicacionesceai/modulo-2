
function limpiarFormulario() {
  const formulario = document.getElementById('formularioModulo');
  if (formulario) {
    const respuesta = confirm('¿Desea reiniciar el formulario?\n\nLos registros guardados no se borrarán.');
    if (respuesta) {
      // Limpiar todos los inputs
      formulario.reset();
      const checkboxes = formulario.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(checkbox => checkbox.checked = false);
      
      const radios = formulario.querySelectorAll('input[type="radio"]');
      radios.forEach(radio => radio.checked = false);
      
      const textareas = formulario.querySelectorAll('textarea');
      textareas.forEach(textarea => textarea.value = '');
      
      // Limpiar solo la respuesta actual
      localStorage.removeItem('respuestas_modulo2');
      
      // Mostrar confirmación
      alert('✅ Formulario reiniciado correctamente');
    }
  }
}

// Activar campos de texto al marcar 'Otro'
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(input => {
    input.addEventListener('change', () => {
      const label = input.parentElement;
      const otroInput = label.querySelector('input[type="text"]');
      if (otroInput) {
        otroInput.disabled = !input.checked;
        if (!input.checked) otroInput.value = '';
      }
    });
  });
});
