require('dotenv').config()

require("appdynamics").profile({
 controllerHostName: 'painted2019042202341410.saas.appdynamics.com',
 controllerPort: 443,

 // If SSL, be sure to enable the next line
 controllerSslEnabled: true,
 accountName: 'painted2019042202341410',
 accountAccessKey: 'wauxohuzth4k',
 applicationName: 'testnodejs',
 tierName: 'testtier',
 nodeName: 'process' // The controller will automatically append the node name with a unique number
})

// Bugsnag
const bugsnag = require('@bugsnag/js')
const bugsnagExpress = require('@bugsnag/plugin-express')
const bugsnagClient = bugsnag('23f0cc38531fedc8bcfbd44158f309d0')
bugsnagClient.use(bugsnagExpress)

// Sentry
const Sentry = require('@sentry/node')
Sentry.init({ dsn: 'https://0a0e82ea1bd44b22b4e4be82d0097cbd@sentry.io/1444800' })

// Sematext
require ('spm-agent-nodejs')
const tracer = require('dd-trace').init()
const express = require('express')
const app = express()

const middleware = bugsnagClient.getPlugin('express')

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
})

app.use(middleware.requestHandler)
app.use(Sentry.Handlers.requestHandler())

app.get('/api', (req, res, next) => {
  // console.log('Api Works.')
  logger.log('warn', 'Just a test message', new Error('Big problem'));
  dogstatsd.increment('page.views')
  bugsnagClient.notify('Testing Bugsnag.')
  Sentry.captureMessage('Testing Sentry.')
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
  throw new Error('Something broke...')
})

app.use(middleware.errorHandler)
app.use(Sentry.Handlers.errorHandler())

module.exports = app

