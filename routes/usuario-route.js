const router = require('express').Router();
const Usuario = require('../models/Usuario');


router.post('/', async (req, res) => {
  let { nombre, correo, password } = req.body;

    let user = await Usuario.getUsuario(correo)
  if (!user) {
    let doc = await Usuario.saveUsuario(
      {
        nombre,
        correo,
        password
      });
    res.status(201).send(doc);
    return;
  }
  res.status(400).send({ error: "ya existe un usuario vínculado a esta información" })
});

module.exports = router;