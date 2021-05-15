const express = require('express');
const cors = require('cors');
//const router = require('./router.js');


const usuarioRouter = require('./routes/usuario-route');
const authRouter = require('./routes/auth-route');
const companiesRouter = require('./routes/companies-route');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


// API
app.use('/api/usuario', usuarioRouter);
app.use('/api/auth', authRouter);
app.use('/api/companies', companiesRouter);
app.listen(port, ()=>console.log(`Open port ${port}`));


// Static pages
app.use(express.static(__dirname + '/public'));
app.use('/usuario', express.static(__dirname + '/public/usuario'));

