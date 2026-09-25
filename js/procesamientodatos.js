const form = document.getElementById('registroForm');
        const modal = document.getElementById('modalResultado');
        const txtEdad = document.getElementById('txtEdad');
        const txtCumple = document.getElementById('txtCumple');
        const btnCerrar = document.getElementById('btnCerrarModal');

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Obtenemos los valores de los inputs
            const nombre = document.getElementById('nombre').value;
            const correo = document.getElementById('correo').value;
            const curp = document.getElementById('curp').value;
            const codigo = document.getElementById('codigo').value;
            const fecha = document.getElementById('nacimiento').value;
            const pass = document.getElementById('pass').value;

            let esValido = true;

            // 1. Validar letras
            if (!soloLetras(nombre)) {
                document.getElementById('err-nombre').style.display = 'block';
                esValido = false;
            } else {
                document.getElementById('err-nombre').style.display = 'none';
            }

            // 2. Validar correo electrónico
            if (!validarCorreo(correo)) {
                document.getElementById('err-correo').style.display = 'block';
                esValido = false;
            } else {
                document.getElementById('err-correo').style.display = 'none';
            }

            // 3. Validar CURP (función propia)
            if (!validarCURP(curp)) {
                document.getElementById('err-curp').style.display = 'block';
                esValido = false;
            } else {
                document.getElementById('err-curp').style.display = 'none';
            }

            // 4. Validar longitud de número
            if (!validarLongitud(codigo, 5)) {
                document.getElementById('err-codigo').style.display = 'block';
                esValido = false;
            } else {
                document.getElementById('err-codigo').style.display = 'none';
            }

            // 5. Validar mayoría de edad
            if (!esMayorDeEdad(fecha)) {
                document.getElementById('err-nacimiento').style.display = 'block';
                esValido = false;
            } else {
                document.getElementById('err-nacimiento').style.display = 'none';
            }

            // 6. Validar contraseña
            if (!validarPassword(pass)) {
                document.getElementById('err-pass').style.display = 'block';
                esValido = false;
            } else {
                document.getElementById('err-pass').style.display = 'none';
            }

            // Si todos los campos pasaron las validaciones
            if (esValido) {
                const edad = calcularEdad(fecha);
                const cuentaRegresiva = tiempoParaCumpleanos(fecha);

                txtEdad.textContent = `Tienes ${edad} años de edad cumplidos.`;
                // Soporta tanto si devuelve string como si devuelve objeto
                txtCumple.textContent = typeof cuentaRegresiva === 'object' ? cuentaRegresiva.mensaje : cuentaRegresiva;

                modal.style.display = 'flex';
            }
        });

        btnCerrar.addEventListener('click', () => {
            modal.style.display = 'none';
        });