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
            botonCine = crearBotonCine();
            setupBotonCine(videoContainer, botonCine);
        } else if (!videoContainer || !videoElement) {
            console.log("Platzi Modo Cine: No hay video.");
            removerBotonCine();
        }
    }

    function crearBotonCine() {
        const botonCine = document.createElement("button");
        botonCine.type = "button";
        botonCine.innerText = "Modo Cine";
        botonCine.style.margin = "0px 5px";
        document.querySelector(".vjs-control-bar").appendChild(botonCine);
        console.log("Botón creado.");
        return botonCine;
    }

    function setupBotonCine(videoContainer, botonCine) {
        const childElements = Array.from(videoContainer.children);
        let cine = false;

        // Leer el tamaño del display y si es menor a 1280, mostrar mensaje de alerta
        if (window.innerWidth < 1280) {
            disableBoton();
        } else {
            botonCine.style.cursor = "pointer";
            botonCine.addEventListener("click", cambioModo);
        }

        function cambioModo() {
                cine ? resetChanges() :
                    toggleModo(['1 / 2', '1 / 3', '1 / 2', '2 / 3', 'auto'], ['none', 'block', 'block', 'none', 'none']);
                cine = !cine;
                cine ? botonCine.style.color = '#9ccd49' : botonCine.style.color = 'inherit';
        }

        function toggleModo(arrayColumnas, arrayDisplays) {
            childElements.forEach((element, index) => {
                element.style.gridColumn = arrayColumnas[index];
                element.style.display = arrayDisplays[index];
            });
        }

        function resetChanges() {
            console.log("Estilos reiniciados");
            childElements.forEach((element) => {
                // Restaurar los estilos originales si existen
                element.style.gridColumn = '';
                element.style.display = '';
                // Eliminar estilos inline si fueron añadidos
                element.removeAttribute('style');
            });
        }

        function disableBoton() {
            console.log("Botón deshabilitado");
            botonCine.style.color = 'red';
            botonCine.addEventListener("click", () => alert("Platzi Modo Cine solo funciona en ventanas con resoluciones mayores a 1280px de ancho. \nCambia la resolución de la ventana y recarga la página para poderla usar."));
        }
    }

    function removerBotonCine() {
        if (botonCine) {
            botonCine.removeEventListener("click", cambioModo);
            botonCine.parentNode.removeChild(botonCine);
            botonCine = null;
        }
    }
});