const Sprint = require('../models/Sprint.model');

const getSprint = async (req, res, next) => {
    let sprints;
    try{
        sprints=await Sprint.find();
        if(sprints.length === 0){
            res.json("No hay sprints disponibles");
        }
    }catch(error){
        res.status(500).json({error:'Error al obtener las sprints'})
    }

    res.sprints=sprints;
    next();
}

const getSprintById= async (req, res, next) => {
    let sprint;
    const {id} = req.query;
    if(!id){
        return res.status(404).json({message:"El id de la sprint no es válido"})
    }

    try{
        sprint=await Sprint.findById(id);
        if(!sprint){
            return res.status(404).json({message:"No se encontró la Sprint con ese Id"})
        }
    }catch(error){
        res.status(500).json(error.message)
    }
    res.sprint=sprint;
    next()
}

const createSprint = async (req, res, next) => {
    let nuevoSprint;
    let savedSprint;
    try{
        nuevoSprint=new Sprint(req.body);
        savedSprint=await nuevoSprint.save();
        res.status(201).json(savedSprint);
    }catch(error){
        res.statu(400).json({error: 'Error al crear la sprint'})
    }

    res.sprint=savedSprint;
    next()
}

const updateSprint = async (req, res, next) => {
    let updatedSprint;
    const {id} = req.query;
    if(!id){
        return res.status(404).json({message:"No se encontró la Sprint con ese id"})
    }
    try{
        updatedSprint=await Sprint.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!updatedSprint){
            res.status(404).json({error:'Sprint no enocntrada'})
        }
        res.json(updatedSprint);
    }catch(error){
        res.status(400).json({error: 'Error al actualizar la sprint'})
    }
}

// Eliminar una sprint por Id:
const deleteSprint = async (req, res, next) => {
    let deletedSprint;
    const {id} = req.query;
    if(!id){
        return res.status(404).json({message: "No se encontró la Sprint con es Id"})
    }

    try{
        deletedSprint=await Sprint.findByIdAndDelete(req.params.id);
        if(!deletedSprint){
            return res.status(404).json({error:"Sprint no encontrada"});
        }
        res.json({message:'Sprint eliminada con éxito'});
    }catch(error){
        res.status(500).json({error:'Error al eliminar la Sprint'})
    }
}

// PUT Task

module.exports={getSprint, getSprintById, createSprint, updateSprint, deleteSprint}