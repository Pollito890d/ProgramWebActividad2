/**
 * Librería de Utileria en JS
 * Funciones de validación, formateo y cálculo sin dependencias externas.
 */

/**
 * Valida si una cadena cumple con el formato estándar de correo electrónico.
 */
function validarCorreo(correo) {
    if (typeof correo !== 'string') return false;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(correo.trim());
}

/**
 * Valida que una cadena contenga exclusivamente letras (incluye vocales acentuadas, ñ y espacios).
 */
function soloLetras(texto) {
    if (typeof texto !== 'string' || texto.trim().length === 0) return false;
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return regex.test(texto);
}

/**
 * Valida que la longitud de un número o su representación textual no supere una longitud máxima.
 */
function validarLongitud(numero, maxLongitud) {
    if (numero === null || numero === undefined) return false;
    const strNum = String(numero).trim();
    if (!/^\d+$/.test(strNum)) return false;
    return strNum.length <= maxLongitud;
}

/**
 * Calcula la edad exacta en años cumplidos a partir de una fecha de nacimiento.
 */
function calcularEdad(fechaNacimiento) {
    const nacimiento = new Date(fechaNacimiento);
    if (isNaN(nacimiento.getTime())) return -1;
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const diferenciaMeses = hoy.getMonth() - nacimiento.getMonth();
    if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }
    return edad >= 0 ? edad : -1;
}

/**
 * Valida si una persona es mayor o igual a 18 años según su fecha de nacimiento.
 */
function esMayorDeEdad(fechaNacimiento) {
    const edad = calcularEdad(fechaNacimiento);
    return edad >= 18;
}

/**
 * Valida que la contraseña cumpla con: mínimo 8 caracteres, al menos una mayúscula,
 * una minúscula, un número y un carácter especial.
 */
function validarPassword(password) {
    if (typeof password !== 'string') return false;
    // Requiere: (?=.*[a-z]) (?=.*[A-Z]) (?=.*\d) (?=.*[@$!%*?&._#\-]) min 8 chars
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._#\-])[A-Za-z\d@$!%*?&._#-]{8,}$/;
    return regex.test(password);
}

// SECCIÓN DE IDEAS DEL PROGRAMADOR

/**
 * Valida si una cadena cumple con la estructura y formato oficial de la CURP en México.
 */
function validarCURP(curp) {
    if (typeof curp !== 'string') return false;
    // Formato oficial: 4 letras, 6 dígitos (AAMMDD), 1 letra sexo (H/M/X), 2 letras entidad, 3 consonantes internas, 1 homoclave alfanumérica, 1 dígito verificador
    const regex = /^[A-Z]{4}\d{6}[HMX][A-Z]{2}[B-DF-HJ-NP-TV-Z]{3}[A-Z\d]\d$/;
    return regex.test(curp.trim().toUpperCase());
}

/**
 * Calcula con precisión cuántos días y horas exactas faltan para el próximo cumpleaños
 * a partir de una fecha de nacimiento (YYYY-MM-DD).
 */
function tiempoParaCumpleanos(fechaNacimiento) {
    const partes = fechaNacimiento.split('-');
    if (partes.length !== 3) return "Fecha no válida";
    const mesNacimiento = parseInt(partes[1], 10) - 1;
    const diaNacimiento = parseInt(partes[2], 10);
    const ahora = new Date();
    let proximoCumple = new Date(ahora.getFullYear(), mesNacimiento, diaNacimiento, 0, 0, 0);
    if (ahora.getTime() > proximoCumple.getTime()) {
        proximoCumple.setFullYear(ahora.getFullYear() + 1);
    }
    const diferenciaMs = proximoCumple.getTime() - ahora.getTime();
    const dias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenciaMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //Regresar los días y horas:
    return `Faltan ${dias} días y ${horas} horas para tu cumpleaños.`;
}