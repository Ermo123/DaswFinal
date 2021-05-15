const router = require('express').Router();
const Company = require('../models/Companies');
const {checkUserAuth} = require('../middlewares/validaciones');

router.post('/',checkUserAuth, async (req, res) => {
  let { nombre, logo, location } = req.body;

  let doc = await Company.saveCompany(
    {
      nombre,
      logo,
      location
    });
    console.log(doc)
  if (doc) {
    res.status(201).send(doc);
    return;
  }
  res.status(400).send({ error: "ya existe una compañia con esta información" })
});


router.get('/',checkUserAuth, async (req, res) => {
  
    let companies = await Company.getCompanies()
    if(!companies) {
        res.status(400).send({error: "No hay compañias"})
    }
    res.send(companies)

  });


router.route('/:nombre')

  .get(checkUserAuth, async (req, res) => {
      let company = await Company.getCompany(req.params.nombre);
      if (company) {
        res.send(company);
        return;
      }
      res.status(404).send({ error: "La compañia no existe" });
      return;

  })

  .put(checkUserAuth, async (req, res) => {

    let { nombre, logo, location} = req.body;
    let datos = { nombre, logo, location};

    if (nombre == req.params.nombre) {
      let company = await Company.getCompany(req.params.nombre);
      if (company) {
        let doc = await Company.updateCompany(req.params.nombre, datos);
        res.send(doc);
        return;
      }
      res.status(404).send({ error: "No existe esa compañia" });
      return;
    }
    res.status(400).send({ error: "La compañia que se quiere actualizar debe coincidir con la que aparece en el body" });

  })

  .delete(checkUserAuth, async (req, res) => {
    //if (req.nombre == req.params.nombre) {
      let company = await Company.getCompany(req.params.nombre)
      console.log(company)
      if (company) {
        
        let doc = await Company.deleteCompany(company.nombre);
        res.status(200).send({ éxito: "Se ha eliminado la compañia exitosamente" });
        return;
      }
      res.status(404).send({ error: "La compañia llamada no existe" })
      return;
    //}
    //res.status(400).send({ error: "No puedes borrar a otra compañia :v" })
  });


module.exports = router;