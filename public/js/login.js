let formLogin = document.querySelector('#formLoginUsuario')
let formRegistro = document.querySelector('#formRegistroUsuario')

formRegistro.addEventListener('submit', async e => {
    e.preventDefault();

    let form = new FormData(e.target);
    let campos = form.entries();
    let datos = Object.fromEntries(campos);

    let usuario = {
        nombre: datos.nombre,
        correo: datos.correo,
        password: datos.password}

        console.log(usuario)
    let resp = await fetch('/api/usuario', {
        method: 'POST',
        body: JSON.stringify(usuario),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(resp)

    if(resp.status != 201){
        // Mostramos un mensaje de error
         $("#modalregister").modal('hide')
            document.querySelector('#mensajesStatusInicio').insertAdjacentHTML('beforeend',
            `<div style="width: inherit;" class="alert alert-danger alert-dismissible fade show" role="alert">
                <button type="button" class="close" data-dismiss="alert">
                    <span>&times;</span>
                </button>
                <strong><b>ERROR!</b> Ya existe un usuario con esa información!</strong>
            </div>`); 
        return;
    }

    //let json = await resp.json();

    $("#modalregister").modal('hide')
    formRegistro.reset();

    document.querySelector('#mensajesStatusInicio').insertAdjacentHTML('beforeend',
    `<div style="width: inherit;" class="alert alert-success alert-dismissible fade show" role="alert">
        <button type="button" class="close" data-dismiss="alert">
            <span>&times;</span>
        </button>
        <strong>Te has registrado con éxito!</strong>
    </div>`);
    
});


formLogin.addEventListener('submit', async e => {
    e.preventDefault();

    let form = new FormData(e.target);
    let campos = form.entries();
    let datos = Object.fromEntries(campos);

    let usuario = {correo: datos.correo, password: datos.password};

    let resp = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(usuario),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(resp.status != 200){
        // Mostramos un mensaje de error
        document.querySelector('#mensajesStatusInicio').insertAdjacentHTML('beforeend',
        `<div style="width: inherit;" class="alert alert-danger alert-dismissible fade show" role="alert">
            <button type="button" class="close" data-dismiss="alert">
                <span>&times;</span>
            </button>
            <strong>Usuario o contraseña incorrectas</strong>
        </div>`); 
        return;
    }

    let json = await resp.json();

    sessionStorage.token = json.token;
    sessionStorage.correo = usuario.correo;
    formLogin.reset();
    
    window.location.href = '/companies';
});