const mongoose = require('mongoose');

const SprintSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    fechaInicio: {
        type: Date,
        required: true
    },
    fechaCierre: {
        type: Date,
        required: true
    },
    tareas: [{
        type: String,
        ref: 'Task'
    }]
}, {
    timestamps: true,
});

module.exports = mongoose.model('Sprint', SprintSchema);