
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
    let cedula = recuperaraTexto("cedula");
    let existente = buscarCliente(cedula);
    if (existente == null) {
        // NO existe -> creo uno nuevo
        let cliente = {};
        cliente.cedula   = cedula;
        cliente.nombre   = recuperaraTexto("nombre");
        cliente.apellido = recuperaraTexto("apellido");
        cliente.ingresos = recuperarFloat("ingresos");
        cliente.egresos  = recuperarFloat("egresos");
        clientes.push(cliente);
    } else {
        // SÍ existe -> actualizo todo MENOS la cédula
        existente.nombre   = recuperaraTexto("nombre");
        existente.apellido = recuperaraTexto("apellido");
        existente.ingresos = recuperarFloat("ingresos");
        existente.egresos  = recuperarFloat("egresos");
    }
    pintarClientes();
    limpiar();
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
function buscarCliente(cedula){
    for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].cedula == cedula) {
            return clientes[i];      // lo encontré
        }
    }
    return null;                     // no existe
}
function seleccionarCliente(cedula){
    let c = buscarCliente(cedula);
    if (c != null) {
        clienteSeleccionado = c;                     // lo guardo para actualizarlo
        mostrarTextoEnCaja("cedula", c.cedula);
        mostrarTextoEnCaja("nombre", c.nombre);
        mostrarTextoEnCaja("apellido", c.apellido);
        mostrarTextoEnCaja("ingresos", c.ingresos);
        mostrarTextoEnCaja("egresos", c.egresos);
    }
}

function limpiar(){
    mostrarTextoEnCaja("cedula", "");
    mostrarTextoEnCaja("nombre", "");
    mostrarTextoEnCaja("apellido", "");
    mostrarTextoEnCaja("ingresos", "");
    mostrarTextoEnCaja("egresos", "");
    clienteSeleccionado = null;
}
