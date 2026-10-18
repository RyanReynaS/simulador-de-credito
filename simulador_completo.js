
  let clientes = [];
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;

  
//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios

// Quita la clase "activa" a TODAS las secciones (las oculta)
function ocultarSecciones(){
    document.getElementById("parametros").classList.remove("activa");
    document.getElementById("clientes").classList.remove("activa");
    // cuando existan, también: "credito" y "listaCreditos"
}

// Oculta todo y muestra solo la sección cuyo id recibo
function mostrarSeccion(id){
    ocultarSecciones();
    document.getElementById(id).classList.add("activa");
}
function guardarTasa(){
    let tasa = recuperarFloat("tasaInteres");   // texto -> número
    if (tasa >= 10 && tasa <= 20) {
        tasaInteres = tasa;                      // guardo en la variable global
        mostrarTexto("mensajeTasa", "Tasa configurada correctamente: " + tasa + "%");
    } else {
        mostrarTexto("mensajeTasa", "La tasa debe estar entre 10% y 20%");
    }
}

function guardarCliente(){
    let cliente = {};
    cliente.cedula   = recuperaraTexto("cedula");
    cliente.nombre   = recuperaraTexto("nombre");
    cliente.apellido = recuperaraTexto("apellido");
    cliente.ingresos = recuperarFloat("ingresos");   // números
    cliente.egresos  = recuperarFloat("egresos");
    clientes.push(cliente);                          // lo agrego al arreglo
    pintarClientes();                                // repinto la tabla
}
function pintarClientes(){
    let tabla = document.getElementById("tablaClientes");
    tabla.innerHTML = "";                            // vacío antes de pintar
    for (let i = 0; i < clientes.length; i++) {
        let c = clientes[i];
        tabla.innerHTML +=
            "<tr>" +
            "<td>" + c.cedula + "</td>" +
            "<td>" + c.nombre + "</td>" +
            "<td>" + c.apellido + "</td>" +
            "<td>" + c.ingresos + "</td>" +
            "<td>" + c.egresos + "</td>" +
            "<td><button onclick=\"seleccionarCliente('" + c.cedula + "')\">Actualizar</button></td>" +
            "</tr>";
    }
}