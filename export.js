let registrosAcumulados = [];
let contadorRegistros = 0;

function actualizarContador() {
    // Ya no necesitamos mostrar el contador en la página
    return;
}

function guardarRegistro(datos) {
    // Cargar registros existentes del localStorage
    const registrosGuardados = localStorage.getItem('registrosAcumulados');
    registrosAcumulados = registrosGuardados ? JSON.parse(registrosGuardados) : [];
    
    // Agregar nuevo registro
    registrosAcumulados.push(JSON.parse(datos));
    contadorRegistros = registrosAcumulados.length;
    
    // Guardar en localStorage
    localStorage.setItem('registrosAcumulados', JSON.stringify(registrosAcumulados));
    
    // Mostrar mensaje con contador
    alert(`✅ Registro guardado correctamente\n\nHas guardado ${contadorRegistros} ${contadorRegistros === 1 ? 'registro' : 'registros'} en total.`);
}

function exportarDatos() {
    const data = localStorage.getItem("respuestas_modulo2");
    if (!data) return alert("No hay datos guardados.");
    
    // Guardar el nuevo registro
    guardarRegistro(data);
    
    // Preparar todos los registros para exportar
    const todosLosRegistros = JSON.stringify(registrosAcumulados, null, 2);
    
    // Detectar si es iPad Pro
    const isIPadPro = window.innerWidth >= 1024 && window.innerHeight >= 1366 && /iPad/.test(navigator.userAgent);
    
    if (isIPadPro) {
        // En iPad Pro intentar descargar
        try {
            const blob = new Blob([todosLosRegistros], { type: 'application/json' });
            const url = window.URL.createObjectURL(blob);
            const enlaceDescarga = document.createElement('a');
            enlaceDescarga.href = url;
            enlaceDescarga.download = `registros_modulo2_${new Date().toISOString().slice(0,10)}.json`;
            enlaceDescarga.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            // Si falla la descarga, mostrar en modal
            mostrarJsonEnModal(todosLosRegistros);
        }
    } else {
        // Para otros dispositivos, mostrar en modal
        mostrarJsonEnModal(todosLosRegistros);
    }
}

function copiarAlPortapapeles() {
  const textarea = document.getElementById('jsonExportText');
  textarea.select();
  try {
    document.execCommand('copy');
    alert('✅ JSON copiado correctamente');
  } catch (err) {
    alert('Error al copiar el JSON');
  }
}

function mostrarJsonEnModal(json) {
  let modal = document.getElementById('modalJsonExport');
  let overlay = document.getElementById('modalJsonOverlay');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'modalJsonExport';
    modal.innerHTML =  `
      <div style="bac kground:#fff;padding:30px;border-radius:12px;width:90vw;max-width:600px;max-height:85vh;overflow:auto;box-shadow:0 4px 20px rgba(0,0,0,0.2);">
        <h2 style="ma rgin:0 0 20px 0;color:#0b6121;font-size:1.5rem;text-align:center;">JSON exportado</h2>
        <textarea id= "jsonExportText" style="width:100%;height:40vh;margin-bottom:20px;padding:15px;border:1px solid #ddd;border-radius:8px;font-size:1rem;font-family:monospace;resize:none;">${json}</textarea>
        <div style="d isplay:flex;gap:15px;justify-content:center;margin:20px 0;">
          <button onc lick="copiarAlPortapapeles()" style="background-color:#0b6121;color:white;padding:14px 28px;border:none;border-radius:8px;font-weight:bold;font-size:1.1rem;min-width:140px;box-shadow:0 2px 4px rgba(0,0,0,0.1);">Copiar JSON</button>
          <button onclick="document.getElementById('modalJsonExport').style.display='none';document.getElementById('modalJsonOverlay').style.display='none';" style="background-color:#666;color:white;padding:14px 28px;border:none;border-radius:8px;font-size:1.1rem;min-width:140px;">Cerrar</button>
        </div>
        <p style="font-size:1rem;color:#666;margin:15px 0 0 0;text-align:center;">Usa el botón "Copiar JSON" para copiar el contenido</p>
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





