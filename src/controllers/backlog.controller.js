const Backlog = require('../models/Backlog.model.js');
const Task = require('../models/Task.model.js');

const getBacklog = async (req, res, next) => {
    let backlog;

    try {
        backlog = await Backlog.find();
        res.json(backlog);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el backlog' });
    }

    res.backlog = backlog;
    next();
}

const postBacklog = async (req, res, next) => {
    let savedBacklog;

    try {
        const newBacklog = new Backlog(req.body);
        savedBacklog = await newBacklog.save();
        res.status(201).json(savedBacklog);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear el backlog' });
    }

    res.savedBacklog = savedBacklog;
    next();
}

const putTaskOnBacklog = async (req, res, next) => {

    let task;
    let backlog = Backlog.getBacklog();

    try {
        task = await Task.findById(req.params.taskId);
        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        if (backlog.tareas.includes(req.params.taskId)) {
            return res.status(400).json({ error: 'La tarea ya está agregada al backlog' });
        }

        backlog.tareas.push(req.params.taskId);
        backlog = await backlog.save();
        res.json(backlog);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar la tarea al backlog' });
    }

    res.backlog = backlog;
    next();
}

module.exports={getBacklog, postBacklog, putTaskOnBacklog}