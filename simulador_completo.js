// ============================================================
// simulador_completo.js  –  lógica de la página
// ÍNDICE (buscar con Ctrl+F el nombre en mayúsculas):
//   1. VARIABLES GLOBALES
//   2. NAVEGACIÓN      -> ocultarSecciones, mostrarSeccion
//   3. TASA            -> guardarTasa
//   4. CLIENTES        -> guardarCliente, pintarClientes, buscarCliente,
//                         seleccionarCliente, limpiar
//   5. CRÉDITOS        -> buscarClienteCredito, calcularCredito
// Usa utilitarios.js (leer/mostrar) y funciones.js (cálculos).
// ============================================================

// ===================== 1. VARIABLES GLOBALES =====================
let clientes = [];              // todos los clientes registrados
let creditos = [];              // créditos (se usará en la siguiente parte)

let tasaInteres = 15;           // tasa actual en % (valor inicial 15)
let clienteSeleccionado = null; // cliente en uso (null = ninguno)
let cuotaCalculada = 0;         // última cuota calculada
let montoCalculado = 0;         // último monto calculado
let plazoCalculado = 0;         // último plazo calculado (años)
let creditoAprobado = false;    // resultado del último cálculo

// ===================== 2. NAVEGACIÓN =====================

// Oculta todas las secciones.
// SI AGREGO UNA SECCIÓN NUEVA: añadir aquí su línea remove.
function ocultarSecciones(){
    document.getElementById("parametros").classList.remove("activa");
    document.getElementById("clientes").classList.remove("activa");
    document.getElementById("creditos").classList.remove("activa");
}

// Muestra solo la sección con ese id (la que tenga la clase "activa")
function mostrarSeccion(id){
    ocultarSecciones();
    document.getElementById(id).classList.add("activa");
}

// ===================== 3. TASA =====================

// Valida la tasa y la guarda en tasaInteres.
// CAMBIAR AQUÍ: los límites 10 y 20 (también min/max en el HTML).
function guardarTasa(){
    let tasa = recuperarFloat("tasaInteres");
    if (tasa >= 10 && tasa <= 20) {
        tasaInteres = tasa;
        mostrarTexto("mensajeTasa", "Tasa configurada correctamente: " + tasa + "%");
    } else {
        mostrarTexto("mensajeTasa", "La tasa debe estar entre 10% y 20%");
    }
}

// ===================== 4. CLIENTES =====================

// Si la cédula no existe crea el cliente, si existe lo actualiza (menos la cédula).
// SI AGREGO UN CAMPO NUEVO AL CLIENTE: ponerlo en las dos partes (crear y actualizar),
// en pintarClientes, seleccionarCliente, limpiar y en el HTML.
function guardarCliente(){
    let cedula = recuperaraTexto("cedula");
    let existente = buscarCliente(cedula);       // null si no existe
    if (existente == null) {
        // CREAR
        let cliente = {};
        cliente.cedula   = cedula;
        cliente.nombre   = recuperaraTexto("nombre");
        cliente.apellido = recuperaraTexto("apellido");
        cliente.ingresos = recuperarFloat("ingresos");
        cliente.egresos  = recuperarFloat("egresos");
        clientes.push(cliente);
    } else {
        // ACTUALIZAR
        existente.nombre   = recuperaraTexto("nombre");
        existente.apellido = recuperaraTexto("apellido");
        existente.ingresos = recuperarFloat("ingresos");
        existente.egresos  = recuperarFloat("egresos");
    }
    pintarClientes();
    limpiar();
}

// Dibuja las filas de la tabla #tablaClientes.
// CAMBIAR AQUÍ: columnas de la tabla o botones por fila (ej. Eliminar).
function pintarClientes(){
    let tabla = document.getElementById("tablaClientes");
    tabla.innerHTML = "";                        // la vacío antes de pintar
    for (let i = 0; i < clientes.length; i++) {
        let c = clientes[i];
        // el botón usa comillas anidadas: \" por fuera y ' por dentro
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

// Retorna el cliente con esa cédula, o null si no existe (la usan varias funciones)
function buscarCliente(cedula){
    for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].cedula == cedula) {
            return clientes[i];
        }
    }
    return null;
}

// Pasa los datos de un cliente al formulario para editarlo
function seleccionarCliente(cedula){
    let c = buscarCliente(cedula);
    if (c != null) {
        clienteSeleccionado = c;
        mostrarTextoEnCaja("cedula", c.cedula);
        mostrarTextoEnCaja("nombre", c.nombre);
        mostrarTextoEnCaja("apellido", c.apellido);
        mostrarTextoEnCaja("ingresos", c.ingresos);
        mostrarTextoEnCaja("egresos", c.egresos);
    }
}

// Vacía el formulario de clientes
function limpiar(){
    mostrarTextoEnCaja("cedula", "");
    mostrarTextoEnCaja("nombre", "");
    mostrarTextoEnCaja("apellido", "");
    mostrarTextoEnCaja("ingresos", "");
    mostrarTextoEnCaja("egresos", "");
    clienteSeleccionado = null;
}

// ===================== 5. CRÉDITOS =====================

// Busca por cédula (caja buscarCedulaCredito) y muestra los datos en #datosClienteCredito.
// CAMBIAR AQUÍ: qué datos del cliente se muestran.
function buscarClienteCredito(){
    let cedula = recuperaraTexto("buscarCedulaCredito");
    let cliente = buscarCliente(cedula);
    let datos = document.getElementById("datosClienteCredito");

    if (cliente != null) {
        clienteSeleccionado = cliente;           // lo uso luego en calcularCredito
        datos.innerHTML = `
            <h3>Datos del Cliente</h3>
            <p><strong>Cédula:</strong> ${cliente.cedula}</p>
            <p><strong>Nombre:</strong> ${cliente.nombre}</p>
            <p><strong>Apellido:</strong> ${cliente.apellido}</p>
            <p><strong>Ingresos:</strong> ${cliente.ingresos}</p>
            <p><strong>Egresos:</strong> ${cliente.egresos}</p>
        `;
    } else {
        clienteSeleccionado = null;
        datos.innerHTML = "<p>Cliente no encontrado</p>";
    }
}

// Calcula el crédito y muestra el resultado en #resultadoCredito.
// Orden: validar -> calcular (funciones.js) -> guardar en globales -> mostrar.
// CAMBIAR AQUÍ: validaciones, o qué líneas se muestran en el resultado.
function calcularCredito(){
    let resultado = document.getElementById("resultadoCredito");

    // Validación 1: tiene que haber un cliente buscado
    if (clienteSeleccionado == null) {
        resultado.className = "rechazado";
        resultado.innerHTML = "Primero busque un cliente por su cédula";
        return;
    }

    // Datos ingresados (el plazo va en AÑOS)
    let monto = recuperarFloat("montoCredito");
    let plazo = recuperarFloat("plazoCredito");

    // Validación 2: monto y plazo deben ser números mayores a cero
    if (isNaN(monto) || isNaN(plazo) || monto <= 0 || plazo <= 0) {
        resultado.className = "rechazado";
        resultado.innerHTML = "Ingrese un monto y un plazo válidos";
        return;
    }

    // Cálculos (funciones.js)
    let disponible = calcularDisponible(clienteSeleccionado.ingresos, clienteSeleccionado.egresos);
    let capacidadPago = calcularCapacidadPago(disponible);
    let interes = calcularInteresSimple(monto, tasaInteres, plazo);
    let totalPagar = calcularTotalPagar(monto, interes);
    let cuotaMensual = calcularCuotaMensual(totalPagar, plazo);
    let aprobado = aprobarCredito(capacidadPago, cuotaMensual);   // true/false

    // Guardo en las globales
    montoCalculado = monto;
    plazoCalculado = plazo;
    cuotaCalculada = cuotaMensual;
    creditoAprobado = aprobado;

    // Texto y estilo según el resultado (clases .aprobado / .rechazado del CSS)
    let textoResultado;
    if (aprobado) {
        textoResultado = "APROBADO";
        resultado.className = "aprobado";
    } else {
        textoResultado = "RECHAZADO";
        resultado.className = "rechazado";
    }

    // <br> = salto de línea, toFixed(2) = 2 decimales
    resultado.innerHTML = `
        Capacidad de pago: ${capacidadPago.toFixed(2)}<br>
        Total a pagar: ${totalPagar.toFixed(2)}<br>
        Cuota mensual: ${cuotaMensual.toFixed(2)}<br>
        RESULTADO: ${textoResultado}
    `;
}
