document.addEventListener('DOMContentLoaded', function () {
    let botonCine;

    checkElements();

    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.addedNodes.length > 0) {
                checkElements();
            }
        });
    });

    const config = { childList: true, subtree: true };
    observer.observe(document.body, config);

    function checkElements() {
        // Verificar la existencia de los elementos después de los cambios en el DOM
        const videoContainer = document.querySelector(".layout_Classes___fdRT");
        const videoElement = document.querySelector("#vjs_video_3");

        if (videoContainer && videoElement && !botonCine) {
            console.log("Platzi Modo Cine: Si hay video.");

            // Crear y poner el botón de Modo Cine en el reproductor
            botonCine = document.createElement("button");
            botonCine.type = "button";
            botonCine.innerText = "Modo Cine";
            botonCine.style.margin = "0px 5px"
            document.querySelector(".vjs-control-bar").appendChild(botonCine);
            console.log("Botón creado.");

            // Leer el tamaño del display y si es menor a 1280 platzi modo cine manda una alerta
            if (window.innerWidth < 1280) {
                botonCine.style.color = 'red';
                botonCine.addEventListener("click", () => alert("Platzi Modo Cine solo funciona en ventanas con resoluciones mayores a 1280px de ancho. \nCambia la resolución de la ventana y recarga la página para poderla usar."));
            } else {
                platziModoCine(videoContainer, botonCine);
            }
        } else if (!videoContainer || !videoElement) {
            console.log("Platzi Modo Cine: No hay video.");
            botonCine = null;
        }
    }

    function platziModoCine(videoContainer, botonCine) {
        console.log("Inicia función Platzi Modo Cine.");
        // Variables para modificar los elementos
        const childElements = Array.from(videoContainer.children);

        // Bandera para saber si esta activado el modo cine
        let cine = false;

        // Variables de los estilos de los diferentes estados
        const defaultColumnas = ['1 / 2', '1 / 2', '1 / 2', '2 / 3', 'auto'];
        const columnasModoCine = ['1 / 2', '1 / 3', '1 / 2', '2 / 3', 'auto'];

        const defaultDisplay = ['none', 'block', 'none', 'block', 'none'];
        const displayModoCine = ['none', 'block', 'block', 'none', 'none'];

        botonCine.style.cursor = "pointer";
        botonCine.addEventListener("click", cambioModo);

        function cambioModo() {
            cine ? toggleModo(defaultColumnas, defaultDisplay) : toggleModo(columnasModoCine, displayModoCine);
            cine = !cine;
            cine ? botonCine.style.color = '#9ccd49' : botonCine.style.color = 'inherit';
        }

        function toggleModo(arrayColumnas, arrayDisplays) {
            childElements.forEach((element, index) => {
                element.style.gridColumn = arrayColumnas[index];
                element.style.display = arrayDisplays[index];
            });
        }
    }
});