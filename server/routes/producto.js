const express = require('express');
let app = express();
const _ = require('underscore');
const {verificaToken} = require('../middlewares/autenticacion');

let Producto = require('../models/producto');




app.get('/producto',verificaToken, (req,res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    // let limite = req.query.limite || 5;
    // limite = Number(limite);

    Producto.find({disponible:true})
        .skip(desde)
        .limit(5)
        .populate('usuario','nombre email')
        .populate('categoria','descripcion')
        .exec((err,productos) => {
            if(err){
                res.status(500).json({
                    ok:false,
                    err
                })
            }

            res.json({
                ok:true,
                productos
            })

        })
})


app.get('/producto/:id',verificaToken, (req,res) => {
    let id = req.params.id;
    Producto.findById(id)
    .populate('usuario','nombre email')
    .populate('categoria','descripcion')
    .exec((err,productoDB) => {
        if(err){
            res.status(500).json({
                ok:false,
                err
            })
        }

        if(!productoDB){
            res.status(400).json({
                ok:false,
                err:{message:'El ID no existe'}
            })
        }

        res.json({
            ok:true,
            producto:productoDB
        })
    })
})


app.get('/producto/buscar/:termino',verificaToken, (req,res) => {

let termino = req.params.termino;
let regExp = new RegExp(termino,'i');

    Producto.find({nombre:regExp})
            .populate('usuario','nombre email')
            .populate('categoria','descripcion')
            .exec((err,productos) => {
                if(err){
                    res.status(400).json({
                        ok:false,
                        err:{message:'El ID no existe'}
                    })
                }
        
                res.json({
                    ok:true,
                    productos
                })
            })

})

app.post('/producto',verificaToken, (req,res) => {
    let body = req.body;
    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: req.usuario._id
    });

    producto.save((err,productoDB) => {
        if(err){
            res.status(500).json({
                ok:false,
                err
            })
        }

        res.status(201).json({
            ok:true,
            producto:productoDB
        })
    })

    

})

app.put('/producto/:id',verificaToken, (req,res) => {
    let id = req.params.id;
    let body = _.pick( req.body, ['nombre','precioUni','descripcion','disponible','categoria']);
    
    Producto.findByIdAndUpdate(id,body,{new:true, runValidators:true},(err,productoDB) => {
        if(err){
            res.status(500).json({
                ok:false,
                err
            })
        }

        if(!productoDB){
            res.status(500).json({
                ok:false,
                err:{message: 'El ID no existe'}
            })
        }

        res.json({
            ok:true,
            producto:productoDB
        })
        
    })
})


app.delete('/producto/:id',verificaToken, (req,res) => {
    let id = req.params.id;
    let cambiaEstado = {
        disponible: false
    }
    
    Producto.findByIdAndUpdate(id,cambiaEstado,{new:true, runValidators:true},(err,productoDB) => {
        if(err){
            res.status(500).json({
                ok:false,
                err
            })
        }

        if(!productoDB){
            res.status(500).json({
                ok:false,
                err:{message: 'El ID no existe'}
            })
        }

        res.json({
            ok:true,
            productoInhabilitado:productoDB
        })
        
    })
})



module.exports = app;