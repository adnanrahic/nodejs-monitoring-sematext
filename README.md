# Starter setup for monitoring Node.js apps with Sematext
A simple starter configuration for using Sematext for Node.js logging and monitoring.

### PM2

- http://pm2.keymetrics.io/docs/usage/monitoring/

```
npm i -g pm2
pm2 start server.js -i 0
pm2 monit
```

### Express Status Monitor

- https://github.com/RafalWilinski/express-status-monitor

```
npm i express-status-monitor

// add the middleware before all routes
app.use(require('express-status-monitor')())

// run the app
node server.js

// check metrics
path: '/status'
```

### App Metrics

- https://github.com/RuntimeTools/appmetrics-dash

```
npm i appmetrics-dash
```

```javascript
// server.js
const dash = require('appmetrics-dash')
const http = require('http')
const app = require('./app')
const server = http.createServer(app)
server.listen(3000, () => console.log('Server is running on port 3000'))
dash.monitor({server: server})
```

```
// run the app
node server.js

// check metrics
path: '/appmetrics-dash/'
```

### Prometheus

- https://prometheus.io/

1. Configure Prometheus config

Create a `prometheus-data` folder and a `prometheus.yml` file in that directory. Add this snippet.

```yaml
# prometheus-data/prometheus.yml
scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 1s

    static_configs:
      - targets: ['127.0.0.1:3000']
        labels:
          service: 'test-prom'
          group: 'production'
```

2. Run Prometheus Docker container

```
docker run --name prometheus --network="host" -d -v "$(pwd)/prometheus-data":/prometheus-data prom/prometheus -config.file=/prometheus-data/prometheus.yml
```

3. Install Prometheus Client module

```
npm install prom-client
```

4. Add Prometheus Client config

Add this to the app.js.

```javascript
// Prometheus
const client = require('prom-client')
const collectDefaultMetrics = client.collectDefaultMetrics
collectDefaultMetrics({ timeout: 1000 })
app.get('/metrics', (req, res) => {
  res.set('Content-Type', client.register.contentType)
  res.end(client.register.metrics())
})
```

5. Run the server

```
node server.js
```

6. Open Prometheus

Navigate to http://localhost:9090/