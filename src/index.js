const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express');
const Joi = require('joi')
const validateRequest = require('./middleware/validateRequest');
const errorException = require('./middleware/errorException');
const { insertSpecie, findSpecie } = require('./services/specieServices');
const { findFilm, findFilms } = require('./services/filmServices');

const app = express();
app.use(bodyParser.json());

const createSchema = (req, _res, next) => {
    const schema = Joi.object({
        id: Joi.string().required(),
        nombre: Joi.string().required(),
        clasificacion: Joi.string().required(),
        designacion: Joi.string().required(),
        tamanho_promedio: Joi.string().required(),
        promedio_vida: Joi.string().required(),
        color_ojo: Joi.string().required(),
        color_cabello: Joi.string().required(),
        color_piel: Joi.string().required(),
        lenguaje: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

app.get('/films/:id', async(req, res) => {
    try{
        const response = await findFilm(req.params.id);
        res.status(200).json({data: response});
    }catch(err){
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
})

app.get('/films', async(_req, res) => {
    try{
        const response = await findFilms();
        res.status(200).json({data: response});
    }catch(err){
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
})

app.get('/species/:id', async (req, res) => {
    try{
        const specie = await findSpecie(req.params.id);
        if(specie){
            res.status(200).json({data: specie});
        }else{
            res.status(401).json({data: 'No encontrado'});
        }
    }catch(err){
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
})
   
app.post('/species', createSchema, async (req, res) => {
    try{
        const newSpecie = await insertSpecie(req.body);
        res.status(201).json({data: newSpecie});
    }catch(err){
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
})

//Falta implementar estándares
app.use(errorException);

module.exports.handler = serverless(app);