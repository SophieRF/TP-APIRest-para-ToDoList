const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

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