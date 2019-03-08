require('dotenv').config()
require('spm-agent-nodejs')
const express = require('express')
const app = express()
const winston = require('winston')
const morgan = require('morgan')
const json = require('morgan-json')
const format = json(':method :url :status :res[content-length] :response-time')
const Logsene = require('winston-logsene')
const logger = winston.createLogger({
  transports: [new Logsene({
    token: process.env.LOGS_TOKEN,
    level: 'info',
    type: 'api_logs',
    url: 'https://logsene-receiver.sematext.com/_bulk'
  })]
})

app.use(morgan(format, {
  stream: {
    write: (message) => {
      const data = JSON.parse(message)
      logger.info('HTTP LOG', {
        method: data.method,
        url: data.url,
        status: parseInt(data.status, 10),
        responseTime: parseFloat(data['response-time'], 10).toFixed(2),
        contentLength: parseInt(data.res, 10)
      })
    }
  }
}))

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
