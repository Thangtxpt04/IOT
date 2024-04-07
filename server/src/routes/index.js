const express = require('express');

const sensorRoutes = require('./sensor.routes');
const deviceRoutes = require('./device.routes');
const mqttRoutes = require('./mqtt.routes');
const apiRouter = express.Router();

function useRoutes(app) {
  // Using routes with prefix '/api'
  apiRouter.use('/sensor', sensorRoutes);
  apiRouter.use('/device', deviceRoutes);
  apiRouter.use('/mqtt', mqttRoutes);
  apiRouter.use('/', (req, res) => {
    res.send('This is the main API route');
  });

  // Config to the main route with prefix '/api'
  app.use('/api', apiRouter);
  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
}

module.exports = useRoutes;
