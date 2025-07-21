
function limpiarFormulario() {
    try {
        const formulario = document.getElementById('formularioModulo');
        console.log('Formulario encontrado:', formulario); // Debug
        
        if (!formulario) {
            console.error('No se encontró el formulario');
            return;
        }
        
        if (confirm('¿Desea reiniciar el formulario?\n\nLos registros guardados no se borrarán.')) {
            // Limpiar el formulario
            formulario.reset();
            
            // Limpiar checkboxes
            const checkboxes = formulario.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => checkbox.checked = false);
            
            // Limpiar radios
            const radios = formulario.querySelectorAll('input[type="radio"]');
            radios.forEach(radio => radio.checked = false);
            
            // Limpiar textareas
            const textareas = formulario.querySelectorAll('textarea');
            textareas.forEach(textarea => textarea.value = '');
            
            // Limpiar localStorage
            localStorage.removeItem('respuestas_modulo2');
            
            alert('✅ Formulario reiniciado correctamente');
            return true;
        }
    } catch (error) {
        console.error('Error al limpiar el formulario:', error);
        alert('Hubo un error al limpiar el formulario');
    }
    return false;
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
