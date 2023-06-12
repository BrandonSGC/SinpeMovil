// Funciones para cargar los datos de la base de datos a los combos.
function cargarBancos() {
    fetch('/obtenerBancos')
    .then(response => response.json())
    .then(bancos => {
        const selectBancos = document.querySelector('#bancos');
        bancos.forEach(element => {        
            const option = document.createElement('option');
            option.textContent = element.nombre;
            option.value = element.nombre;
            selectBancos.appendChild(option);
        });        
    })
    .catch(error => {
        console.error(error);
    });    
}

function cargarTiposCuenta() {
    fetch('/tipoCuentas')
    .then(response => response.json())
    .then(tipoCuentas => {
        const selectTipoCuenta = document.querySelector('#tipoCuenta');
        tipoCuentas.forEach(element => {        
            const option = document.createElement('option');
            option.textContent = element.descripcion;
            option.value = element.descripcion;
            selectTipoCuenta.appendChild(option);
        });
        
    })
    .catch(error => {
        console.error(error);
    });
}

function cargarTipoMoneda(){
    fetch('/obtenerMoneda')
    .then(response => response.json())
    .then(tipoMoneda => {
        const selectTipoMoneda = document.querySelector('#tipoMoneda');
        tipoMoneda.forEach(element => {        
            const option = document.createElement('option');
            option.textContent = element.descripcion;
            option.value = element.descripcion;
            selectTipoMoneda.appendChild(option);
        });        
    })
    .catch(error => {
        console.error(error);
    });
}


function cargarCedulaCliente(){
    fetch('/obtenerCedulaCliente')
    .then(response => response.json())
    .then(cedulaCliente => {
        const selectCedulaCliente = document.querySelector('#cedulaCliente');
        cedulaCliente.forEach(element => {        
            const option = document.createElement('option');
            option.textContent = element.cedula;
            option.value = element.cedula;
            selectCedulaCliente.appendChild(option);
        });
        
    })
    .catch(error => {
        console.error(error);
    });
}


// Llamamos a las funciones.
cargarBancos();
cargarTiposCuenta();
cargarTipoMoneda();
cargarCedulaCliente();