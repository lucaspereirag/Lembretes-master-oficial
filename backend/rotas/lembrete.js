const express = require ("express");
const router = express.Router();
const Lembrete = require('../models/lembrete');

router.post('', (req, res, next)=>{
    const lembrete = new Lembrete({
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        datareal: req.body.datareal,
        datacad: req.body.datacad
    })
    lembrete.save().then(lembreteInserido =>{
        res.status(201).json({mensagem: 'Lembrete Inserido!!', id: lembreteInserido._id})
    }); 
    })
    
    
    
    router.get('', (req, res, next) => {
        Lembrete.find().then(documents => {
        console.log(documents)
        res.status(200).json({
        mensagem: "Tudo OK",
        lembretes: documents
        });
    })
    });
    
    router.get('/:id', (req, res, next)=>{
        Lembrete.findById(req.params.id).then(cli =>{
            if (cli){
                res.status(200).json(cli);
            }
            else
            res.status(404).json({mensagem: "Lembrete não encontrado!"})
        })
    });
    
        
    router.delete('/:id', (req, res, next)=>{
        Lembrete.deleteOne({_id: req.params.id}).then((resultado)=>{
            console.log(resultado);
            res.status(200).json({mensagem: "Lembrete removido com sucesso!"})
        })
    });
    
    router.put ("/:id", (req, res, next)=>{
        const lembrete = new Lembrete({
            _id: req.params.id,
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            datareal: req.body.datareal,
            datacad: req.body.datacad
        });
        Lembrete.updateOne({_id: req.params.id}, lembrete).then ((resultado)=>{
            console.log(resultado)
        });
        res.status(200).json({mensagem: 'Lembrete atualizado com sucesso!'})
    });
    
    
    module.exports = router;