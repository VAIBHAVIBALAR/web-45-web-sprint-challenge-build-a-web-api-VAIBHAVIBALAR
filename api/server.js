const express = require('express');

const cors = require('cors')
const morgan = require('morgan')

const { loggerP } = require('./projects/projects-middleware')
const { loggerA } = require('./actions/actions-middlware')

const projectRouter = require('./projects/projects-router')
const actionsRouter = require('./actions/actions-router')

const server = express();

server.use(express.json())

server.use('/api/projects', projectRouter)
server.use('/api/actions', actionsRouter)
server.use(cors())
server.use(morgan('dev'))
server.use(loggerP)
server.use(loggerA)

module.exports = server;
