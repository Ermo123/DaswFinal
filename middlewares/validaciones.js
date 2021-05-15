const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const Company = require('../models/Companies');


function checkLogin(req, res, next) {
    let {correo, password} = req.body;
    let newLogin = {correo, password}

    if(newLogin.correo && newLogin.password) {
        next();
        return;
    };
    res.status(400).send({error: "Completa todos los inputs "});
}

async function checkUserAuth(req, res, next) {
    let token = req.get('x-auth');

    if(token){
        try {
            let resp = jwt.verify(token, 'fK^Lx*Gbeb^m');
            let usuario = await Usuario.getUsuario(resp.correo);
            if(token != usuario.token) {
                res.status(401).send({error: "Token Mismatch"});
                return;
            }
            req.correo = resp.correo;
            next();
        }
      
        catch(error) {
            console.log(error);
            res.status(401).send({error: "Invalid Token"})
        }
    }
    else {
        res.status(401).send({error: "Token Missing"})
    }
}

module.exports = {checkLogin, checkUserAuth}