// Localiza el nodo del botón mediante su id "botonMagico" y lo almacena en la constante boton
const boton = document.getElementById("botonMagico");
// Localiza la caja contenedora por su id "miTarjeta" y la resguarda dentro de la constante tarjeta
const tarjeta = document.getElementById("miTarjeta");
// Añade un sensor de escucha al botón para detectar con precisión la acción física de un click
boton.addEventListener("click", function() {
    // Modifica las propiedades de estilo de la tarjeta cambiando su fondo a un matiz amarillo pastel
    tarjeta.style.backgroundColor = "#ffeaa7";
    // Reemplaza al instante las palabras escritas en el botón por una frase que indica éxito
    boton.innerText = "¡Súper! Lograste el clic";
    // Altera directamente el fondo del botón transmutándolo a una tonalidad naranja llamativa
    boton.style.backgroundColor = "#e67e22";
    // Abre de manera nativa una ventana emergente de alerta del navegador con un aviso de felicitación
    alert("¡Felicidades! Acabas de ejecutar tu primer código en JavaScript.");
// Cierra la función interna del evento y clausura de manera formal el bloque de escucha
});