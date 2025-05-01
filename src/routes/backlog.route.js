const express = require('express');
const { putTaskOnBacklog, getBacklog, postBacklog } = require('../controllers/backlog.controller');
const router = express.Router();

// GET
router.get('/', getBacklog ,async (req, res) => {
res.json(res.backlog);
});

// POST
router.post('/', postBacklog, async (req, res) => {
res.json(res.savedBacklog);
});

//PUT TASK
router.put('add-task/:taskId',putTaskOnBacklog, async (req, res) => {
res.json(res.backlog);
});

module.exports = router;