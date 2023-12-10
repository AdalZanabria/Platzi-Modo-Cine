if (
    // Valida que haya un reproductor de video de Platzi en la página
    document.querySelector(".layout_Classes___fdRT") &&
    document.querySelector("#vjs_video_3")
) {
    console.log("Platzi Modo Cine: Si hay video.");

    // Crear y poner el botón de Modo Cine en el reproductor
    let botonCine = document.createElement("button");
    botonCine.type = "button";
    botonCine.innerText = "Modo Cine";
    botonCine.style.margin = "0px 5px"
    document.querySelector(".vjs-control-bar").appendChild(botonCine);

    // Leer el tamaño del display y si es menor a 1280 platzi modo cine manda una alerta
    if (window.innerWidth < 1280) {
        botonCine.style.color = 'red';
        botonCine.addEventListener("click", () => alert("Platzi Modo Cine solo funciona en ventanas con resoluciones mayores a 1280px de ancho. \nCambia la resolución de la ventana y recarga la página para poder usar."));
    } else {
        (function platziModoCine() {
            // Variables para modificar los elementos
            const childElements = Array.from(document.querySelector(".layout_Classes___fdRT").children);

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
            };
        })();
    };
} else {
    console.log("Platzi Modo Cine: No hay video.");
}