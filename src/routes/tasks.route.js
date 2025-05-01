const express = require('express');
const { getTask, getTaskById, postTask, putTask, deleteTask } = require('../controllers/task.controller');
const router = express.Router();

// GET
router.get('/', getTask, async (req, res) => {
res.json(res.tasks);
});

// GET BY ID
router.get('/:id', getTaskById, async (req, res) => {
res.json(res.task);
});

// POST
router.post('/', postTask, async (req, res) => {
res.json(res.task);
});

// PUT
router.put('/:id', putTask, async (req, res) => {
res.json(res.updatedTask);
});

// DELETE
router.delete('/:id', deleteTask, async (req, res) => {
res.json(res.taskToDelete)
})

module.exports = router;
