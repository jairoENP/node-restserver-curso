
const express = require('express');
let {verificaToken,verificaAdminRole} = require('../middlewares/autenticacion');
let app = express();
let Categoria = require('../models/categoria');
//const {response} = requiere('./usuario');



app.get('/categoria', verificaToken, (req,res) => {
    Categoria.find({})
                .sort('descripcion')
                .populate('usuario','nombre email')
                .exec((err,categorias) => {
                    if(err){
                        return res.status(500).json({
                                ok:false,
                                err
                        })
                    }

                    Categoria.countDocuments((err,conteo) => {
                        res.json({
                            ok:true,
                            categorias,
                            cuantos:conteo
                        })
                    }) 
                })

   

    
}) ;


app.get('/categoria/:id',verificaToken,(req,res) => {
    let id = req.params.id;
    Categoria.findById(id, (err,categoriaDB) => {
        if(err){
            return res.status(400).json({
                    ok:false,
                    err
            })
        }

        if(!categoriaDB){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            })
        }

        res.json({
            ok:true,
            categoria: categoriaDB
        })

    })
});


app.post('/categoria',verificaToken,(req,res) => {
    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if(!categoriaDB){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok:true,
            categoria: categoriaDB
        })
    })
});

app.put('/categoria/:id',[verificaToken/*,verificaAdminRole*/],(req,res) => {
    let id = req.params.id;
    let body = req.body;

    let desCategoria = {
        descripcion: body.descripcion
    }

    Categoria.findByIdAndUpdate(id,desCategoria,{new:true, runValidators:true},(err, categoriaDB) => {
            
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if(!categoriaDB){
            return res.status(400).json({
                ok: false,
                err
            })
        }
        
        res.json({
            ok:true,
            categoria:categoriaDB
        })
    })

});


app.delete('/categoria/:id',[verificaToken,verificaAdminRole],(req,res) => {
    let id = req.params.id;
    Categoria.findByIdAndRemove(id, (err,categoriaDB) => {
        
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if(!categoriaDB){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            })
        }

        res.json({
            ok:true,
            message: 'Categoria borrada'
        })
    })
});

module.exports = app; 