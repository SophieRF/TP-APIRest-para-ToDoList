const mongoose = require('mongoose');

const sprintSchema = new mongoose.Schema({
    fechaInicio: {
        type: String, require: true
    },
    fechaCierre: {
        type: String, require: true
    },
    tareas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task", default: []
    }],
    color: {
        type: String
    },
});

const Sprint = mongoose.model("sprint", sprintSchema);

module.export = Sprint;