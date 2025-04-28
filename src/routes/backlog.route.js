const express = require('express');
const { putTaskOnBacklog } = require('../controllers/backlog.controller');
const router = express.Router();

// GET
router.get('/backlog', getBacklog ,async (req, res) => {
res.json(res.backlog);
});

// POST
router.post('/backlog', postBacklog, async (req, res) => {
res.json(res.savedBacklog);
});

//PUT TASK
router.put('/backlog/add-task/:taskId',putTaskOnBacklog, async (req, res) => {
res.json(res.backlog);
});