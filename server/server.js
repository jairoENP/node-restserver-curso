require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

//Habilitar carpeta public
app.use(express.static(path.resolve(__dirname , '../public')));

 
//configuracion global de rutas 
app.use(require('./routes/index'));
 
 
 

 mongoose.connect(process.env.URLDB,
    {useNewUrlParser: true, 
     useCreateIndex: true, 
     useUnifiedTopology: true,
     useFindAndModify: false  },//
    (err,res) => {
    if(err) throw err;
    console.log('Base de datos Online'); 
});







app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto ', process.env.PORT)
})

