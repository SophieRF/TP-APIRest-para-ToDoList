const express = require('express');
const router = express.Router();

// GET
router.get('/tasks', getTask, async (req, res) => {
res.json(res.tasks);
});

// GET BY ID
router.get('/tasks/:id', getTaskById, async (req, res) => {
res.json(res.task);
});

// POST
router.post('/tasks', postTask, async (req, res) => {
res.json(res.task);
});

// PUT
router.put('/tasks/:id', putTask, async (req, res) => {
res.json(res.updatedTask);
});

// DELETE
router.delete('/tasks/:id', deleteTask, async (req, res) => {
res.json(res.taskToDelete)
})

module.exports = router;
