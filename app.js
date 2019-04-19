require('dotenv').config()
require ('spm-agent-nodejs')
const tracer = require('dd-trace').init()
const express = require('express')
const app = express()

const StatsD = require('node-dogstatsd').StatsD;
const dogstatsd = new StatsD();

const opentracing = require('opentracing')
opentracing.initGlobalTracer(tracer)

const winston = require('winston');
const LogzioWinstonTransport = require('winston-logzio');
const logzioWinstonTransport = new LogzioWinstonTransport({
  level: 'info',
  name: 'winston_logzio',
  token: 'ZVWKrnJWjmxMORRJrRVkLUJfLQqJeYHP',
  host: 'listener.logz.io',
});
const logger = winston.createLogger({
    transports: [logzioWinstonTransport]
});

app.get('/api', (req, res, next) => {
  // console.log('Api Works.')
  logger.log('warn', 'Just a test message', new Error('Big problem'));
  dogstatsd.increment('page.views')
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
    console.error(error)
    res.status(500).send(error)
  }
})

module.exports = app

