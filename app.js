require('dotenv').config()
require('spm-agent-nodejs')
const express = require('express')
const app = express()
const winston = require('winston')
const morgan = require('morgan')
const json = require('morgan-json')
const format = json({
  method: ':method',
  url: ':url',
  status: ':status',
  contentLength: ':res[content-length]',
  responseTime: ':response-time'
})
const Logsene = require('winston-logsene')
const logger = winston.createLogger({
  transports: [new Logsene({
    token: process.env.LOGS_TOKEN,
    level: 'info',
    type: 'api_logs',
    url: 'https://logsene-receiver.sematext.com/_bulk'
  })]
})
const httpLogger = morgan(format, {
  stream: {
    write: (message) => logger.info('HTTP LOG', JSON.parse(message))
  }
})
app.use(httpLogger)

app.get('/api', (req, res, next) => {
  logger.info('Api Works.')
  res.status(200).send('Api Works.')
})

app.get('/api/fast', (req, res, next) => {
  res.status(200).send('Fast response!')
})

app.get('/api/slow', (req, res, next) => {
  setTimeout(() => {
    res.status(200).send('Slow response...')
  }, 1000)
})

app.get('/api/error', (req, res, next) => {
  try {
    throw new Error('Something broke...')
  } catch (error) {
    logger.error(error)
    res.status(500).send(error)
  }
})

app.listen(3000, () => console.log('Server is running on port 3000'))
