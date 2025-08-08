let registrosAcumulados = [];
let contadorRegistros = 0;

function actualizarContador() {
    // Ya no necesitamos mostrar el contador en la página
    return;
}

function guardarRegistro(datos) {
    if (!Array.isArray(registrosAcumulados)) {
        registrosAcumulados = [];
    }
    registrosAcumulados.push(JSON.parse(datos));
    contadorRegistros = registrosAcumulados.length;
    actualizarContador();
    localStorage.setItem('registrosAcumulados', JSON.stringify(registrosAcumulados));
    alert(`✅ Registro guardado correctamente\n\nRegistros acumulados: ${contadorRegistros}`);
}

function exportarDatos() {
    const data = localStorage.getItem("respuestas_modulo2");
    if (!data) return alert("No hay datos guardados.");
    
    // Guardar el nuevo registro
    guardarRegistro(data);
    
    // Preparar todos los registros para exportar
    const todosLosRegistros = JSON.stringify(registrosAcumulados, null, 2);
    
    // Crear el blob y el enlace de descarga
    const blob = new Blob([todosLosRegistros], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const enlaceDescarga = document.createElement('a');
    enlaceDescarga.href = url;
    enlaceDescarga.download = `registros_modulo2_${new Date().toISOString().slice(0,10)}.json`;
    
    // En iPad necesitamos mostrar el contenido en una nueva pestaña
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        window.open(url, '_blank');
    } else {
        enlaceDescarga.click();
    }
    
    window.URL.revokeObjectURL(url);
    mostrarJsonEnModal(todosLosRegistros);
}

function mostrarJsonEnModal(json) {
  let modal = document.getElementById('modalJsonExport');
  let overlay = document.getElementById('modalJsonOverlay');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'modalJsonExport';
    modal.innerHTML = `
      <div style="background:#fff;padding:20px;border-radius:8px;max-width:90vw;max-height:80vh;overflow:auto;box-shadow:0 2px 10px #0003;">
        <h2>JSON exportado</h2>
        <textarea id="jsonExportText" style="width:100%;height:200px;">${json}</textarea>
        <div style="margin-top:10px;display:flex;gap:10px;">
          <button onclick="document.getElementById('jsonExportText').select();document.execCommand('copy');alert('¡Contenido copiado!')">Copiar</button>
          <button onclick="document.getElementById('modalJsonExport').style.display='none';document.getElementById('modalJsonOverlay').style.display='none';">Cerrar</button>
        </div>
        <p style="font-size:0.9em;color:#666;">Copia el contenido y pégalo donde lo necesites.</p>
      </div>
    `;
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.zIndex = '10001';
    document.body.appendChild(modal);
    overlay = document.createElement('div');
    overlay.id = 'modalJsonOverlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background = 'rgba(0,0,0,0.3)';
    overlay.style.zIndex = '10000';
    overlay.onclick = function() {
      modal.style.display = 'none';
      overlay.style.display = 'none';
    };
    document.body.appendChild(overlay);
  } else {
    modal.querySelector('textarea').value = json;
    modal.style.display = 'block';
    overlay.style.display = 'block';
  }
  modal.style.display = 'block';
  overlay.style.display = 'block';
}





