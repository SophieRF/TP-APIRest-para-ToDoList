const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        enum: ['Pendiente', 'En progreso', 'Terminada'],
        default: 'Pendiente'
    },
    fechaLimite: {
        type: Date,
        required: true
    },
    sprint: {
        type: String,
        ref: 'Sprint',
        default: null
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Task', TaskSchema);