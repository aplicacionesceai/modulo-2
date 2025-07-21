
function limpiarFormulario() {
  const formulario = document.getElementById('formularioModulo');
  if (formulario) {
    if (confirm('¿Desea reiniciar el formulario? Los datos guardados no se borrarán.')) {
      formulario.reset();

      const checkboxes = formulario.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(checkbox => checkbox.checked = false);

      const radios = formulario.querySelectorAll('input[type="radio"]');
      radios.forEach(radio => radio.checked = false);

      const textareas = formulario.querySelectorAll('textarea');
      textareas.forEach(textarea => textarea.value = '');
      
      localStorage.removeItem('respuestas_modulo2'); // Solo borra la respuesta actual, no los registros acumulados
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
