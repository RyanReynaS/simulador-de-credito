// ============================================================
// funciones.js  –  cálculos del crédito (solo matemática, no toca el HTML)
// ÍNDICE: calcularDisponible, calcularCapacidadPago, calcularInteresSimple,
//         calcularTotalPagar, calcularCuotaMensual, aprobarCredito
// Las llama calcularCredito() en simulador_completo.js
// ============================================================

// Disponible = ingresos - egresos (si sale negativo, retorna 0)
function calcularDisponible(ingresos, egresos) {
    let disponible = ingresos - egresos;
    return disponible < 0 ? 0 : disponible;
}

// Capacidad de pago = 50% del disponible.
// CAMBIAR AQUÍ: el porcentaje (0.50).
function calcularCapacidadPago(montoDisponible) {
    return montoDisponible * 0.50;
}

// Interés simple = años x monto x (tasa / 100)
function calcularInteresSimple(monto, tasa, plazoAnios) {
    return plazoAnios * monto * (tasa / 100);
}

// Total a pagar = monto + interés + 100 fijos (impuestos y SOLCA).
// CAMBIAR AQUÍ: el cargo fijo de 100.
function calcularTotalPagar(monto, interes) {
    return monto + interes + 100;
}

// Cuota mensual = total / meses (el plazo llega en años, x 12)
function calcularCuotaMensual(total, plazoAnios) {
    let plazoMeses = plazoAnios * 12;
    return total / plazoMeses;
}

// true = aprobado, false = rechazado.
// CAMBIAR AQUÍ: la regla de aprobación (hoy: capacidad > cuota).
function aprobarCredito(capacidadPago, cuotaMensual) {
    return capacidadPago > cuotaMensual;
}
