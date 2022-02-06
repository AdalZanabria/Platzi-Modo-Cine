(function platziModoCine() {
    // Variables para modificar los elementos
    const container = document.querySelector(".MaterialView");
    const controlsContainer = document.querySelector(".vjs-control-bar");
    const videoContainer = document.querySelector(".MaterialView-video-item");
    // Variable para cambiar entre modos
    let cine = false;

    // Variables para capturar el estado por defecto, el Modo Cine "off"
    const defaultColumnas = container.style.gridTemplateColumns;
    const defaultAreas = container.style.gridTemplateAreas;
    const defaultDisplay = container.style.display;
    const defaultMaxWidth = videoContainer.style.maxWidth;

    // Crear y poner el botón de Modo Cine
    let botonCine = document.createElement("button");
    botonCine.type = "button";
    botonCine.innerText = "Modo Cine";
    controlsContainer.appendChild(botonCine);
    botonCine.style.cursor = "pointer";
    botonCine.addEventListener("click", cambioModo);

    function cambioModo() {
        cine ? modoNormal() : modoCine();
        cine = !cine;
    }

    function modoCine() {
        container.style.gridTemplateColumns = "1fr";
        container.style.gridTemplateAreas = '"video" "content" "community"';
        container.style.display = "grid";
        videoContainer.style.maxWidth = "100vw";
    }
    function modoNormal() {
        container.style.gridTemplateColumns = defaultColumnas;
        container.style.gridTemplateAreas = defaultAreas;
        container.style.display = defaultDisplay;
        videoContainer.style.maxWidth = defaultMaxWidth;
    }
})();
