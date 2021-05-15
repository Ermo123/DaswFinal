const mongoose = require('../db/mongodb-connect');

let companySchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
});

companySchema.statics.saveCompany = async function (newCompany){
    let company = new Company(newCompany)

    try{
        let doc = await company.save()
        console.log(doc);
        return doc;
    }
    catch(error){
        console.log(error);
        return undefined;
    }
}



companySchema.statics.getCompany = async function(nombre) {
    let doc = await Company.findOne({nombre} );
    return doc;
}

companySchema.statics.updateCompany = async function(nombre, datos) {
    let doc = await Company.findOneAndUpdate({nombre}, {$set: datos}, {new: true, useFindAndModify: false});
    return doc;
}

companySchema.statics.deleteCompany = async function (nombre){
    let doc = await Company.findOneAndDelete({nombre})
    return doc;
}



companySchema.statics.getCompanies = async function() {
    let doc = await Company.find();
    return doc;
}

let Company = mongoose.model('companies', companySchema);

module.exports = Company;