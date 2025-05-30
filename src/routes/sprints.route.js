const express = require('express');
const router = express.Router();
const Sprint = require('../models/Sprint.model.js');
const Task = require('../models/Task.model.js');
const { getSprint, getSprintById, createSprint, updateSprint, deleteSprint } = require('../controllers/sprint.controller.js');

// GET
router.get('/', getSprint, async (req, res) => {
res.json(res.sprints);
});

// GET BY ID
router.get('/:id', getSprintById,  async (req, res) => {
    res.json(res.sprint);
});

// POST
router.post('/', createSprint,  async (req, res) => {
    res.json(res.savedSprint)
});

// PUT
router.put('/:id', updateSprint, async (req, res) => {
    res.json(res.updatedSprint)
});

// DELETE
router.delete('/:id', deleteSprint, async (req, res) => {
    res.json(res.deletedSprint);
})

//PUT TASK
router.put('/:id/add-task/:taskId', async (req, res) => {
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