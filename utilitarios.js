// ============================================================
// utilitarios.js
// Mis funciones ayudantes para leer y mostrar datos del HTML
// usando el id del componente, así no repito código.
// ============================================================

// Lee el texto escrito en una caja (input) y lo devuelve
function recuperaraTexto(idComponente){
    let componente;
    let valorIngresado;
    // getElementById busca en el HTML el elemento con ese id
    componente=document.getElementById(idComponente);
    // .value es lo que escribió el usuario
    valorIngresado=componente.value;
    return valorIngresado;
    }

    // Lee una caja y lo convierte a número entero
    function recuperarInt(idComponente){
        let valorCaja=recuperaraTexto(idComponente); // siempre llega como texto
        let valorEntero=parseInt(valorCaja);         // texto -> entero
        return valorEntero;
    }
    // Lee una caja y lo convierte a número con decimales
    function recuperarFloat(idComponente){
        let valorCaja=recuperaraTexto(idComponente);
        let valorFlotante=parseFloat(valorCaja);     // texto -> decimal
        return valorFlotante;
    }
    // Escribe un mensaje en un elemento que NO es input (p, span, div...)
    function mostrarTexto(idComponente,mensaje){
        let componente;
        componente=document.getElementById(idComponente);
        componente.innerText=mensaje;
    }
    // Escribe un valor DENTRO de un input
    function mostrarTextoEnCaja(idComponente,mensaje){
        let componente;
        componente=document.getElementById(idComponente);
        componente.value=mensaje;
    }

    // Cambia la imagen de un <img> con una nueva ruta
    function mostrarImagen(idComponente,rutaImagen){
        let componente;
        componente=document.getElementById(idComponente);
        componente.src = rutaImagen;

    }
