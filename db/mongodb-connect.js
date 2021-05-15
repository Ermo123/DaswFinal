const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.getUrl(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
}).then(()=>console.log("DB Found"))
  .catch(err=>console.log("DB error", err));

module.exports = mongoose;