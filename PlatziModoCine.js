console.log("Carga Platzi Modo Cine");
window.modoCineActivado = false;
window.retries = 0;
window.currentURL = window.location.href;
let modoCine = localStorage.getItem("modoCine");
window.modoCine = modoCine != null ? Boolean(Number(modoCine)) : false;

window.addEventListener("popstate", function (event) {
  console.log(
    "%cPlatzi Modo Cine: Cambio de página.",
    "font-size: 20px; color: blue;"
  );
  window.modoCineActivado = false;
  window.retries = 0;
});
// Creamos una instancia de un objeto MutationObserver y pasamos una función
// que se ejecutará cuando las mutaciones sean observadas
window.addEventListener("load", function (event) {
  this.setTimeout(() => {
    console.log("Platzi Modo Cine: Cargando...");
    start();
    var observer = new MutationObserver(function (mutations) {
      console.log("Platzi Modo Cine: Cambio detectado.");
      setTimeout(() => {
        console.log("llamando Start");
        start();
      }, 100);
      mutations.forEach(function (mutation) {
        // console.log("mutation:", mutation);
        // Tu código para manejar las mutaciones va aquí.
        // Puede ser una llamada a otra función o alguna lógica de ejecución.
      });
    });

    // Seleccionamos el objetivo de nuestra observación
    let target = document.querySelector("#MainLayout");
    // var target = document.querySelector(".VideoPlayer");
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
  // TODO: Detectar la version del tipo de video segun los elementos que se encuentren en la pagina
  if (window.currentURL !== window.location.href) {
    console.log("%cCambio de URL.....", "font-size: 18px; color: blue;");
    window.modoCineActivado = false;
    window.retries = 0;
    window.currentURL = window.location.href;
  }
  if (
    // Valida que haya un reproductor de video de Platzi en la página
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

        // const video = document.querySelector(
        //   "div.layout_Classes-main-video__11pSj"
        // );
        // const player = document.querySelector("#vjs_video_3");
        // const layout = document.querySelector(".layout_Classes___fdRT");
        const mainLayout = document.querySelector(
          ".layout_Classes-main__Vsq6a"
        );

        // const defaultVideoHeight = video.style.height;
        // const defaultPlayerMaxHeight = player.style.maxHeight;
        // const defaultLayoutGridTemplateRows = layout.style.gridTemplateRows;
        const defaultMainLayoutGridTemplateRows = mainLayout.style.gridColumn;

        // Variable para cambiar entre modos
        // window.modoCine = false;

        // Variables para capturar el estado por defecto, el Modo Cine "off"
        const defaultColumnas = container.style.gridTemplateColumns;
        const defaultAreas = container.style.gridTemplateAreas;
        const defaultDisplay = container.style.display;
        const defaultMaxWidth = videoContainer.style.maxWidth;
        window.modoCineActivado = true;
        // Crear y poner el botón de Modo Cine
        let botonCine = document.createElement("button");
        botonCine.type = "button";
        botonCine.className = "platzi-modo-cine";
        botonCine.innerText = `Modo Cine ${Boolean(window.modoCine) ? "On" : "Off"}`;
        controlsContainer.appendChild(botonCine);
        botonCine.style.cursor = "pointer";
        botonCine.addEventListener("click", cambioModo);

        function cambioModo() {
          console.log("Platzi Modo Cine: Cambio de modo.");
          window.modoCine ? modoNormal() : modoCineActivado();
          window.modoCine = !window.modoCine;
          botonCine.innerText = `Modo Cine ${Boolean(window.modoCine) ? "On" : "Off"}`;
          localStorage.setItem("modoCine", Number(window.modoCine));
        }

        function modoCineActivado() {
          if (isNewHome) {
            //   video.style.height = "1100px";
            //   player.style.maxHeight = "980px";
            //   layout.style.gridTemplateRows = "1100px 1fr";
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
            // video.style.height = defaultVideoHeight;
            // player.style.maxHeight = defaultPlayerMaxHeight;
            // layout.style.gridTemplateRows = defaultLayoutGridTemplateRows;
            mainLayout.style.gridColumn = defaultMainLayoutGridTemplateRows;
          } else {
            container.style.gridTemplateColumns = defaultColumnas;
            container.style.gridTemplateAreas = defaultAreas;
            container.style.display = defaultDisplay;
            videoContainer.style.maxWidth = defaultMaxWidth;
          }
        }

        function validarBotonmodoCineActivadoAgregado() {
          // Valida si el botón de Modo Cine ya fue agregado
          const botonmodoCineActivado =
            document.querySelector(".platzi-modo-cine");
          return Boolean(botonmodoCineActivado);
        }
        if (validarBotonmodoCineActivadoAgregado()) {
          console.log(
            `Platzi Modo Cine: Botón agregado. restaurando valor Anterior ${window.modoCine}`
          );
          window.modoCine ? modoCineActivado() : modoNormal();
        } else {
          window.modoCineActivado = false;
          setTimeout(() => {
            start();
          }, 100);
        }
      })();
    } catch (error) {
      console.error("Ocurrio un error", error);
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
    console.log("Platzi Modo Cine: No hay video.");
    console.log(`Reintentando... ${window.retries}`);
    if (window.retries <= 3) {
      console.log("llamando Start setTimeout");
      window.retries += 1;
      setTimeout(() => {
        console.log(`Platzi Modo Cine: Retrying... ${window.retries}`);
        start();
      }, 1000);
    }
  }
}
//
