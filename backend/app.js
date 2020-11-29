const express = require ('express');
const app = express();
const bodyParser = require ('body-parser');
const lembreteRoutes = require ('./rotas/lembrete');
const mongoose = require ('mongoose');



// mongoose.connect('mongodb+srv://admin:admin123@projetoa3.kqi2z.mongodb.net/Lembretes?retryWrites=true&w=majority')
.then(()=>{
    console.log('Conexão OK')
}).catch(()=>{
    console.log("Conexão não OK")
});

app.use (bodyParser.json());
      
        app.use ((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', "*");
            res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type,Accept');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
            next();
            });

    app.use ('/api/lembretes', lembreteRoutes);        

module.exports = app;