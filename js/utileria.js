/**
 * Librería de Utileria en JS
 * Funciones de validación, formateo y cálculo sin dependencias externas.
 */

/**
 * Valida si una cadena cumple con el formato estándar de correo electrónico.
 * @param {string} correo - Correo a validar.
 * @returns {boolean} True si es válido, false en caso contrario.
 */
function validarCorreo(correo) {
    if (typeof correo !== 'string') return false;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(correo.trim());
}

/**
 * Valida que una cadena contenga exclusivamente letras (incluye vocales acentuadas, ñ y espacios).
 * @param {string} texto - Cadena a evaluar.
 * @returns {boolean} True si solo contiene letras y espacios válidos.
 */
function soloLetras(texto) {
    if (typeof texto !== 'string' || texto.trim().length === 0) return false;
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return regex.test(texto);
}

/**
 * Valida que la longitud de un número o su representación textual no supere una longitud máxima.
 * @param {number|string} numero - Número o texto numérico a comprobar.
 * @param {number} maxLongitud - Longitud máxima permitida.
 * @returns {boolean} True si la longitud es menor o igual al máximo y contiene solo dígitos, false en caso contrario 
 */
function validarLongitud(numero, maxLongitud) {
    if (numero === null || numero === undefined) return false;
    const strNum = String(numero).trim();
    if (!/^\d+$/.test(strNum)) return false;
    return strNum.length <= maxLongitud;
}

/**
 * Calcula la edad exacta en años cumplidos a partir de una fecha de nacimiento.
 * @param {string|Date} fechaNacimiento - Fecha en formato 'YYYY-MM-DD' o instancia de Date.
 * @returns {number} Edad entera calculada (o -1 si la fecha es inválida/futura).
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
 * @param {string|Date} fechaNacimiento - Fecha de nacimiento.
 * @returns {boolean} True si tiene 18 años o más.
 */
function esMayorDeEdad(fechaNacimiento) {
    const edad = calcularEdad(fechaNacimiento);
    return edad >= 18;
}

/**
 * Valida que la contraseña cumpla con: mínimo 8 caracteres, al menos una mayúscula,
 * una minúscula, un número y un carácter especial.
 * @param {string} password - Contraseña a evaluar.
 * @returns {boolean} True si es una contraseña segura.
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
 * @param {string} curp - Cadena con los 18 caracteres de la CURP.
 * @returns {boolean} True si la CURP cumple con el formato oficial, false en caso contrario.
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
 * @param {string|Date} fechaNacimiento - Fecha de nacimiento de la persona.
 * @returns {{dias: number, horas: number, mensaje: string}|null} Objeto con días, horas y mensaje textual, o null si la fecha es inválida.
 */
function tiempoParaCumpleanos(fechaNacimiento) {
    const nacimiento = new Date(fechaNacimiento);
    if (isNaN(nacimiento.getTime())) return null;
    const ahora = new Date();
    const anioActual = ahora.getFullYear();
    // Fecha del cumpleaños en el año en curso
    let proximoCumple = new Date(
        anioActual,
        nacimiento.getUTCMonth(),
        nacimiento.getUTCDate(),
        0, 0, 0, 0
    );
    // Si ya pasó en este año, el próximo será el siguiente año
    if (ahora.getTime() > proximoCumple.getTime()) {
        proximoCumple.setFullYear(anioActual + 1);
    }
    const diferenciaMs = proximoCumple.getTime() - ahora.getTime();
    // Cálculos de tiempo
    const msEnUnaHora = 1000 * 60 * 60;
    const msEnUnDia = msEnUnaHora * 24;
    const dias = Math.floor(diferenciaMs / msEnUnDia);
    const horas = Math.floor((diferenciaMs % msEnUnDia) / msEnUnaHora);
    return {
        dias: dias,
        horas: horas,
        mensaje: `Faltan ${dias} días y ${horas} horas para tu cumpleaños.`
    };
}