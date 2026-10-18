// ============================================================
// utilitarios.js  –  ayudantes para leer y mostrar datos por id
// ÍNDICE: recuperaraTexto, recuperarInt, recuperarFloat,
//         mostrarTexto, mostrarTextoEnCaja, mostrarImagen
// Si necesito un ayudante nuevo, lo agrego al final de este archivo.
// ============================================================

// LEER: texto de un input
function recuperaraTexto(idComponente){
    let componente;
    let valorIngresado;
    componente=document.getElementById(idComponente);
    valorIngresado=componente.value;
    return valorIngresado;
    }

    // LEER: input convertido a entero
    function recuperarInt(idComponente){
        let valorCaja=recuperaraTexto(idComponente);
        let valorEntero=parseInt(valorCaja);
        return valorEntero;
    }
    // LEER: input convertido a decimal
    function recuperarFloat(idComponente){
        let valorCaja=recuperaraTexto(idComponente);
        let valorFlotante=parseFloat(valorCaja);
        return valorFlotante;
    }
    // MOSTRAR: texto en un elemento que no es input (p, span, div)
    function mostrarTexto(idComponente,mensaje){
        let componente;
        componente=document.getElementById(idComponente);
        componente.innerText=mensaje;
    }
    // MOSTRAR: valor dentro de un input
    function mostrarTextoEnCaja(idComponente,mensaje){
        let componente;
        componente=document.getElementById(idComponente);
        componente.value=mensaje;
    }

    // MOSTRAR: cambia la imagen (src) de un <img>
    function mostrarImagen(idComponente,rutaImagen){
        let componente;
        componente=document.getElementById(idComponente);
        componente.src = rutaImagen;

    }
