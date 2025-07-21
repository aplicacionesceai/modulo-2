
function limpiarFormulario() {
  const formulario = document.getElementById('formularioModulo');
  if (!formulario) return;
  
  if (confirm('¿Desea reiniciar el formulario?\n\nLos registros guardados no se borrarán.')) {
    formulario.reset();
    
    // Limpiar checkboxes y asegurar que estén desmarcados
    formulario.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      checkbox.checked = false;
    });
    
    // Limpiar radios
    formulario.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.checked = false;
    });
    
    // Limpiar textareas
    formulario.querySelectorAll('textarea').forEach(textarea => {
      textarea.value = '';
    });
    
    // Limpiar solo la respuesta actual, no los registros acumulados
    localStorage.removeItem('respuestas_modulo2');
    
    alert('✅ Formulario reiniciado correctamente');
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
