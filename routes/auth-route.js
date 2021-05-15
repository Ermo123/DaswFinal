const router = require('express').Router()
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const {checkLogin} = require('../middlewares/validaciones');


router.post('/login', checkLogin, async (req, res)=> {
    let {correo, password} = req.body;
    let usuario = await Usuario.getUsuario(correo);
    console.log(usuario)
    console.log(correo)
    if(usuario) {
        if(password == usuario.password) {
            let token = jwt.sign({correo: usuario.correo}, 'fK^Lx*Gbeb^m', {expiresIn: '1h'});
            await Usuario.updateUsuario(correo, {token})
            res.send({token});
            return;
        }
        res.status(401).send({error: "Contraseña incorrecta"});
        return;
    }
    res.status(404).send({error: "No existe un usuario con ese correo"})
});



module.exports = router;