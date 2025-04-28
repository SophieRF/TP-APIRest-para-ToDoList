const express = require('express');
const router = express.Router();
const Sprint = require('../models/Sprint.js');
const Task = require('../models/Task.js');
const { getSprint, getSprintById, createSprint, updateSprint } = require('../controllers/sprint.controller.js');

// GET
router.get('/sprints', getSprint, async (req, res) => {
    res.json(res.sprint);
});

// GET BY ID
router.get('/sprints/:id', getSprintById,  async (req, res) => {
    res.json(res.sprint);
});

// POST
router.post('/sprints', createSprint,  async (req, res) => {
    res.json(res.savedSprint)
});

// PUT
router.put('/sprints/:id', updateSprint, async (req, res) => {
    res.json(res.updatedSprint)
});

// DELETE
router.delete('/sprints/:id', async (req, res) => {
    try {
        const deletedSprint = await Sprint.findByIdAndDelete(req.params.id);
        if (!deletedSprint) {
            return res.status(404).json({ error: 'Sprint no encontrada' });
        }
        res.json({ message: 'Sprint eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la sprint' });
    }
})

//PUT TASK
router.put('/sprints/:id/add-task/:taskId', async (req, res) => {
    try {
        const sprint = await Sprint.findById(req.params.id);
        if (!sprint) {
            return res.status(404).json({ error: 'Sprint no encontrada' });
        }

        const task = await Task.findById(req.params.taskId);
        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        if (sprint.tareas.includes(req.params.taskId)) {
            return res.status(400).json({ error: 'La tarea ya está agregada al sprint' });
        }

        sprint.tareas.push(req.params.taskId);
        const updatedSprint = await sprint.save();
        res.json(updatedSprint);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar la tarea al sprint' });
    }
});

module.exports = router;