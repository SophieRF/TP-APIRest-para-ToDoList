const mongoose = require('mongoose');

const BacklogSchema = new mongoose.Schema({
    tareas: [{
        type: String,
        ref: 'Task'
    }]
}, {
    timestamps: true,
});

module.exports = mongoose.model('Backlog', BacklogSchema);