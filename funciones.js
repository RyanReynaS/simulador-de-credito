// ==========================================
// ARCHIVO: funciones.js
// Son las funciones de cálculo del simulador anterior (carpeta simulador).
// Aquí solo hay matemática: reciben números y devuelven números.
// Ninguna toca el HTML; eso lo hace simulador_completo.js.
// ==========================================

// Calcula cuánto dinero me sobra a fin de mes (ingresos - egresos)
function calcularDisponible(ingresos, egresos) {
    let disponible = ingresos - egresos;
    // Si gasta más de lo que gana, el disponible no puede ser negativo: devuelvo 0
    return disponible < 0 ? 0 : disponible;
}

// La capacidad de pago es el 50% de lo disponible
// (el taller pide el 50%; en la carpeta simulador tenía 0.30 por error, aquí lo corregí)
function calcularCapacidadPago(montoDisponible) {
    return montoDisponible * 0.50;
}

// Interés simple = años x monto x (tasa / 100)
function calcularInteresSimple(monto, tasa, plazoAnios) {
    // divido la tasa para 100 porque 10 significa 10% = 0.10
    return plazoAnios * monto * (tasa / 100);
}

// Total a pagar = monto + interés + USD 100 fijos (impuestos y SOLCA)
function calcularTotalPagar(monto, interes) {
    return monto + interes + 100;
}

// Cuota mensual = total / número de meses
function calcularCuotaMensual(total, plazoAnios) {
    // el plazo viene en años, lo paso a meses multiplicando por 12
    let plazoMeses = plazoAnios * 12;
    return total / plazoMeses;
}

// Compara capacidad de pago con la cuota.
// Retorna true (aprobado) o false (rechazado), nunca un texto.
function aprobarCredito(capacidadPago, cuotaMensual) {
    return capacidadPago > cuotaMensual;
}
