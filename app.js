const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const routesBacklog = require('./src/routes/backlog.route.js');
const routesSprints = require('./src/routes/sprints.route.js');
const routesTasks = require('./src/routes/tasks.route.js');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5173', // Permite solo este origen
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }))

mongoose.connect(
    process.env.MONGO_URL, { dbName: process.env.MONGO_DB_NAME });

const db = mongoose.connection;

app.use("/", routesBacklog);
app.use('/sprints', routesSprints);
app.use('/backlog', routesBacklog);
app.use('/tasks', routesTasks);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});