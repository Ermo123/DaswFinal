const mongoose = require('../db/mongodb-connect');

let usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    }
});

usuarioSchema.statics.saveUsuario = async function (newUsuario){
    let usuario = new Usuario(newUsuario)

    try{
        let doc = await usuario.save()
        console.log(doc);
        return doc;
    }
    catch(error){
        console.log(error);
        return undefined;
    }
}



usuarioSchema.statics.getUsuario = async function(correo) {
    let doc = await Usuario.findOne({correo} );
    return doc;
}

usuarioSchema.statics.updateUsuario = async function(correo, datos) {
    let doc = await Usuario.findOneAndUpdate({correo}, {$set: datos}, {new: true, useFindAndModify: false});
    return doc;
}

let Usuario = mongoose.model('usuario', usuarioSchema);

module.exports = Usuario;