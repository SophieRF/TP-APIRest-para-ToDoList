const Task = require('../models/Task.model.js');

const getTask = async (req, res, next) => {
    let tasks;
    try {
        tasks = await Task.find();
        if (tasks.lenght === 0) {
            res.json("No hay tareas disponibles")
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las tareas' });
    }

    res.tasks = tasks;
    next();
}

const getTaskById = async (req, res, next) => {
    let task;
    const { id } = req.query;
    if (!id) {
        return res.status(404).json({ message: "El id no es válido" });
    }

    try {
        task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: "No se encontró una tarea con ese id" });
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
    res.task = task;
    next();
}

const postTask = async (req, res, next) => {
    let task;
    try {
        const newTask = new Task(req.body);
        task = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear la tarea' });
    }

    res.task = task;
    next();
}

const putTask = async (req, res, next) => {
    let updatedTask;
    try {
        updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar la tarea' });
    }
    res.updatedTask = updatedTask;
    next();
}

const deleteTask = async (req, res, next) => {
    let taskToDelete;
    try {
        taskToDelete = await Task.findById(req.params.id);
        if (!taskToDelete) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        if (taskToDelete.sprintId) {
            return res.status(400).json({ error: 'No se puede eliminar la tarea porque está asignada a un sprint' });
        }

        taskToDelete = await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Tarea eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la tarea' });
    }

    res.taskToDelete = taskToDelete;
    next();
}

module.exports = {getTask, getTaskById, postTask, putTask, deleteTask}