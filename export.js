function exportarDatos() {
  const data = localStorage.getItem("respuestas_modulo2");
  if (!data) return alert("No hay datos guardados.");
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "respuestas_modulo2.json";
  let descargaFallida = false;
  try {
    a.click();
  } catch (e) {
    descargaFallida = true;
  }
  setTimeout(() => {
    URL.revokeObjectURL(url);
    // Si la descarga falló o estamos en iPad/iOS, mostrar el modal
    if (descargaFallida || (/iPad|iPhone|iPod/.test(navigator.userAgent) && !navigator.userAgent.includes('Macintosh'))) {
      mostrarJsonEnModal(data);
    }
  }, 300);
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
        <button onclick="document.getElementById('modalJsonExport').style.display='none';document.getElementById('modalJsonOverlay').style.display='none';">Cerrar</button>
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
