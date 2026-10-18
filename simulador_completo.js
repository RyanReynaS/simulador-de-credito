// ============================================================
// simulador_completo.js
// Lógica de la página: navegación, tasa, clientes y créditos.
// Usa utilitarios.js (leer/mostrar datos) y funciones.js (cálculos).
// ============================================================

// ---------- VARIABLES GLOBALES (el estado de mi programa) ----------
let clientes = [];              // arreglo con todos los clientes registrados
let creditos = [];              // arreglo para los créditos (se usa en la siguiente parte)

let tasaInteres = 15;           // tasa de interés actual (por defecto 15%)
let clienteSeleccionado = null; // cliente que estoy editando o consultando (null = ninguno)
let cuotaCalculada = 0;         // última cuota mensual calculada
let montoCalculado = 0;         // último monto calculado
let plazoCalculado = 0;         // último plazo (en años) calculado
let creditoAprobado = false;    // true si el último crédito calculado fue aprobado

// ============================================================
// PARTE 1: NAVEGACIÓN ENTRE SECCIONES
// Solo se ve la sección que tenga la clase "activa" (lo define el CSS)
// ============================================================

// Quita la clase "activa" a TODAS las secciones, o sea las oculta
function ocultarSecciones(){
    document.getElementById("parametros").classList.remove("activa");
    document.getElementById("clientes").classList.remove("activa");
    document.getElementById("creditos").classList.remove("activa");
}

// Oculta todo y luego muestra solo la sección cuyo id recibo por parámetro
function mostrarSeccion(id){
    ocultarSecciones();
    document.getElementById(id).classList.add("activa");
}

// ============================================================
// PARTE 2: CONFIGURAR LA TASA
// ============================================================

// Lee la tasa, valida que esté entre 10 y 20 y avisa con un mensaje
function guardarTasa(){
    let tasa = recuperarFloat("tasaInteres");   // texto -> número
    if (tasa >= 10 && tasa <= 20) {
        tasaInteres = tasa;                      // la guardo en la variable global
        mostrarTexto("mensajeTasa", "Tasa configurada correctamente: " + tasa + "%");
    } else {
        mostrarTexto("mensajeTasa", "La tasa debe estar entre 10% y 20%");
    }
}

// ============================================================
// PARTE 3: ADMINISTRACIÓN DE CLIENTES
// ============================================================

// Crea un cliente nuevo si la cédula no existe; si existe, lo actualiza
function guardarCliente(){
    let cedula = recuperaraTexto("cedula");
    let existente = buscarCliente(cedula);       // null si no existe
    if (existente == null) {
        // NO existe -> armo un objeto cliente nuevo y lo agrego al arreglo
        let cliente = {};
        cliente.cedula   = cedula;
        cliente.nombre   = recuperaraTexto("nombre");
        cliente.apellido = recuperaraTexto("apellido");
        cliente.ingresos = recuperarFloat("ingresos");  // números, no texto
        cliente.egresos  = recuperarFloat("egresos");
        clientes.push(cliente);
    } else {
        // SÍ existe -> actualizo todo MENOS la cédula (es su identificador)
        existente.nombre   = recuperaraTexto("nombre");
        existente.apellido = recuperaraTexto("apellido");
        existente.ingresos = recuperarFloat("ingresos");
        existente.egresos  = recuperarFloat("egresos");
    }
    pintarClientes();   // refresco la tabla
    limpiar();          // dejo el formulario vacío
}

// Dibuja la tabla de clientes recorriendo el arreglo
function pintarClientes(){
    let tabla = document.getElementById("tablaClientes");
    tabla.innerHTML = "";                        // vacío la tabla antes de pintar
    for (let i = 0; i < clientes.length; i++) {
        let c = clientes[i];
        // una fila <tr> por cliente; el botón Actualizar manda la cédula a seleccionarCliente
        // (comillas dobles escapadas \" y simples ' para el string anidado)
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

// Busca un cliente por cédula: retorna el objeto si existe o null si no
function buscarCliente(cedula){
    for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].cedula == cedula) {
            return clientes[i];      // lo encontré
        }
    }
    return null;                     // no existe
}

// Busca al cliente, lo guarda en clienteSeleccionado y muestra sus datos en el formulario
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

// Vacía todas las cajas del formulario de clientes
function limpiar(){
    mostrarTextoEnCaja("cedula", "");
    mostrarTextoEnCaja("nombre", "");
    mostrarTextoEnCaja("apellido", "");
    mostrarTextoEnCaja("ingresos", "");
    mostrarTextoEnCaja("egresos", "");
    clienteSeleccionado = null;
}

// ============================================================
// TALLER PARTE 2: SECCIÓN CRÉDITOS
// ============================================================

// Busca el cliente por la cédula escrita en la sección Créditos
// y muestra todos sus datos dentro del div "datosClienteCredito"
function buscarClienteCredito(){
    let cedula = recuperaraTexto("buscarCedulaCredito");  // 1) tomo la cédula escrita
    let cliente = buscarCliente(cedula);                  // 2) la busco en el arreglo
    let datos = document.getElementById("datosClienteCredito");

    if (cliente != null) {
        // 3) SÍ existe: lo guardo como cliente seleccionado para poder calcular su crédito
        clienteSeleccionado = cliente;
        // armo el HTML con template string (comillas invertidas ` `) y ${...} para meter los valores
        datos.innerHTML = `
            <h3>Datos del Cliente</h3>
            <p><strong>Cédula:</strong> ${cliente.cedula}</p>
            <p><strong>Nombre:</strong> ${cliente.nombre}</p>
            <p><strong>Apellido:</strong> ${cliente.apellido}</p>
            <p><strong>Ingresos:</strong> ${cliente.ingresos}</p>
            <p><strong>Egresos:</strong> ${cliente.egresos}</p>
        `;
    } else {
        // 4) NO existe: aviso y me aseguro de no dejar a nadie seleccionado
        clienteSeleccionado = null;
        datos.innerHTML = "<p>Cliente no encontrado</p>";
    }
}

// Calcula el crédito del cliente buscado, reutilizando las funciones de funciones.js,
// y muestra el resultado (aprobado o rechazado) en el div "resultadoCredito"
function calcularCredito(){
    let resultado = document.getElementById("resultadoCredito");

    // Primero necesito un cliente buscado; si no hay, aviso y salgo de la función
    if (clienteSeleccionado == null) {
        resultado.className = "rechazado";
        resultado.innerHTML = "Primero busque un cliente por su cédula";
        return;
    }

    // Leo el monto y el plazo (en años) que escribió el usuario
    let monto = recuperarFloat("montoCredito");
    let plazo = recuperarFloat("plazoCredito");

    // Valido que sean números mayores que cero (isNaN = "no es un número")
    if (isNaN(monto) || isNaN(plazo) || monto <= 0 || plazo <= 0) {
        resultado.className = "rechazado";
        resultado.innerHTML = "Ingrese un monto y un plazo válidos";
        return;
    }

    // ---- Cálculos, en el mismo orden del simulador anterior ----
    let disponible = calcularDisponible(clienteSeleccionado.ingresos, clienteSeleccionado.egresos);
    let capacidadPago = calcularCapacidadPago(disponible);
    let interes = calcularInteresSimple(monto, tasaInteres, plazo);   // uso la tasa configurada
    let totalPagar = calcularTotalPagar(monto, interes);
    let cuotaMensual = calcularCuotaMensual(totalPagar, plazo);
    let aprobado = aprobarCredito(capacidadPago, cuotaMensual);       // true o false

    // Guardo los resultados en las variables globales por si los necesito después
    montoCalculado = monto;
    plazoCalculado = plazo;
    cuotaCalculada = cuotaMensual;
    creditoAprobado = aprobado;

    // Decido el texto y la clase de estilo según el resultado
    let textoResultado;
    if (aprobado) {
        textoResultado = "APROBADO";
        resultado.className = "aprobado";    // verde (definido en el CSS)
    } else {
        textoResultado = "RECHAZADO";
        resultado.className = "rechazado";   // rojo (definido en el CSS)
    }

    // Muestro todo; <br> hace el salto de línea y toFixed(2) deja 2 decimales
    resultado.innerHTML = `
        Capacidad de pago: ${capacidadPago.toFixed(2)}<br>
        Total a pagar: ${totalPagar.toFixed(2)}<br>
        Cuota mensual: ${cuotaMensual.toFixed(2)}<br>
        RESULTADO: ${textoResultado}
    `;
}
