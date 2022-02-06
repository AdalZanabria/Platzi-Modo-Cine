<p align="center">
<img src="https://i.imgur.com/0O5ysjq.png" alt="Platzi Modo Cine"/>
</p>
<h1 align="center> Platzi Modo Cine</h1>

## Agrega un botón al reproductor para cambiar a modo cine estilo YouTube en pantallas grandes.

![](https://i.imgur.com/TuUbElM.gif)

El _modo cine_ hace que el reproductor cubra el 100% del ancho del viewport, escondiendo el panel de comunidad.

En pantallas de tamaños aproximados al 1080p, cuando se quiere ver Platzi a mitad de pantalla (Como para tener por mitad el video de la clase y la otra mitad el editor de texto y seguir el curso) este cambia su estilo automáticamente usando responsive design, pero si se quiere ver de la misma forma en pantalla dividida cuando la pantalla es de mayor resolución (Ejemplo 4K), el layout se vuelve el mismo al de pantalla completa ~1080, haciendo que aparezca el panel de comunidad y le quite espacio al reproductor de video, lo que puede resultar en una dificultad de lectura del contenido mostrado en el video.

## ¿Cómo lo puedo probar?

Voy a intentar publicarlo como una extensión de navegador (Por eso el archivo _manifest.json_ y la carpeta de íconos), pero por lo pronto lo puedes probar de la siguiente manera:

Copia todo el código dentro del archivo _PlatziModoCine.js_ y pégalo en la consola de tu navegador, al presionar _Enter_ aparecerá un botón en la barra de controles del reproductor que dice _"Modo Cine"_ que al presionarlo cambiará entre los dos modos.

### Funciona solo en resoluciones que el responsive design no esconda por defecto el panel de comunidad.
