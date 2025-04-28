const Sprint = require('../models/Sprint.model');

export const getSprint = async (req, res, next) => {
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

export const getSprintById= async (req, res, next) => {
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