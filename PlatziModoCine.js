// configurando variables de inicialización
window.modoCineActivado = false;
window.retries = 0;
window.currentURL = window.location.href;
let modoCine = localStorage.getItem("modoCine");
window.modoCine = modoCine != null ? Boolean(Number(modoCine)) : false;

// Creamos una instancia de un objeto MutationObserver y pasamos una función
// que se ejecutará cuando las mutaciones sean observadas
window.addEventListener("load", function (event) {
  this.setTimeout(() => {
    // console.log("Platzi Modo Cine: Cargando...");
    start();
    var observer = new MutationObserver(function (mutations) {
      // console.log("Platzi Modo Cine: Cambio detectado.");
      setTimeout(() => {
        console.log("llamando Start");
        start();
      }, 100);
    });

    let target = document.querySelector("#MainLayout");
    let targetVideo = document.querySelector("video-js");

    // Creamos un objeto de configuración con los tipos de mutación que nos gustaría observar
    var config = {
      attributes: true,
      childList: true,
      subtree: false, // Omitir o configurar como `false` si no deseas observar las mutaciones en los descendientes del objetivo.
    };

    // Llamamos al método observe() y pasamos el objeto target y el objeto de configuración
    observer.observe(target, config);
    observer.observe(targetVideo, config);
  }, 1000);
});

function start() {
  if (window.currentURL !== window.location.href) {
    window.modoCineActivado = false;
    window.retries = 0;
    window.currentURL = window.location.href;
  }
  if (
    // Valida que haya un reproductor de video de Platzi en la página y que el Modo Cine no esté activado
    (document.querySelector(".MaterialView-video-item") ||
      document.querySelector(".MaterialView") ||
      document.querySelector(".MaterialView-content-wrapper")) &&
    !window.modoCineActivado
  ) {
    console.log("Platzi Modo Cine: Si hay video.");
    let isNewHome = detectarVersionHome();
    function detectarVersionHome() {
      // Detecta si es la versión Home de Platzi o el New Home
      const url = window.location.href;
      const versionHome = url.includes("new-home");
      return versionHome;
    }
    try {
      (function platzimodoCineActivado() {
        // Variables para modificar los elementos
        const container = getContainer();
        const controlsContainer = getControlsContainer();
        const videoContainer = getVideoContainer();

        const mainLayout = document.querySelector(
          ".layout_Classes-main__Vsq6a"
        );

        const defaultMainLayoutGridTemplateRows = mainLayout.style.gridColumn;

        // Variables para capturar el estado por defecto, el Modo Cine "off"
        const defaultColumnas = container.style.gridTemplateColumns;
        const defaultAreas = container.style.gridTemplateAreas;
        const defaultDisplay = container.style.display;
        const defaultMaxWidth = videoContainer.style.maxWidth;

        window.modoCineActivado = true;

        let botonCine = document.createElement("button");
        botonCine.type = "button";
        botonCine.className = "platzi-modo-cine";
        let estadoTexto = Boolean(window.modoCine) ? "On" : "Off"
        botonCine.innerText = `Modo Cine ${estadoTexto}`;
        controlsContainer.appendChild(botonCine);
        botonCine.style.cursor = "pointer";
        botonCine.addEventListener("click", cambioModo);

        function cambioModo() {
          window.modoCine ? modoNormal() : modoCineActivado();
          window.modoCine = !window.modoCine;
          let estadoTexto = Boolean(window.modoCine) ? "On" : "Off";
          botonCine.innerText = `Modo Cine ${estadoTexto}`;
          localStorage.setItem("modoCine", Number(window.modoCine));
        }

        function modoCineActivado() {
          if (isNewHome) {
            mainLayout.style.gridColumn = "1/3";
          } else {
            container.style.gridTemplateColumns = "1fr";
            container.style.gridTemplateAreas = '"video" "content" "community"';
            container.style.display = "grid";
            videoContainer.style.maxWidth = "100vw";
          }
        }
        function modoNormal() {
          if (isNewHome) {
            mainLayout.style.gridColumn = defaultMainLayoutGridTemplateRows;
          } else {
            container.style.gridTemplateColumns = defaultColumnas;
            container.style.gridTemplateAreas = defaultAreas;
            container.style.display = defaultDisplay;
            videoContainer.style.maxWidth = defaultMaxWidth;
          }
        }

        function validarBotonModoCineActivadoAgregado() {
          const botonmodoCineActivado =
            document.querySelector(".platzi-modo-cine");
          return Boolean(botonmodoCineActivado);
        }

        if (validarBotonModoCineActivadoAgregado()) {
          window.modoCine ? modoCineActivado() : modoNormal();
        } else {
          window.modoCineActivado = false;
          setTimeout(() => start(), 100);
        }
      })();
    } catch (error) {
      console.error("Ocurrio un error en Platzi Modo Cine", error);
    }
    function getContainer() {
      let selector = "";
      if (isNewHome) {
        selector = ".MaterialView-content-wrapper";
      } else {
        selector = ".MaterialView";
      }
      return document.querySelector(selector);
    }

    function getControlsContainer() {
      let selector = "";
      if (isNewHome) {
        selector = ".vjs-control-bar";
      } else {
        selector = ".vjs-control-bar";
      }
      return document.querySelector(selector);
    }

    function getVideoContainer() {
      let selector = "";
      if (isNewHome) {
        selector = ".MaterialView-content-wrapper";
      } else {
        selector = ".MaterialView-video-item";
      }
      return document.querySelector(selector);
    }
  } else if (!window.modoCineActivado) {
    // console.log("Platzi Modo Cine: No hay video.");
    // console.log(`Reintentando... ${window.retries}`);
    if (window.retries <= 3) {
      window.retries += 1;
      setTimeout(() => start(), 1000);
    }
  }
}
