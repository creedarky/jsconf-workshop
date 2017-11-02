const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

module.exports = (app) => {
  app.set('port', process.env.PORT || 3000);
  app.set('json spaces', 2);
  app.use(helmet());
  app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
  app.use(bodyParser.json());
  app.use(cookieParser())
  app.use(app.auth.initialize());
  app.use(express.static('public'));
};
