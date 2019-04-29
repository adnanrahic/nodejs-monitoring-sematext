const cluster = require('cluster')
const app = require('./app')

if (cluster.isMaster) {
  masterProcess()
} else {
  childProcess()
}

function masterProcess () {
  console.log(`Master ${process.pid} is running`)

  console.log(`Forking process...`)
  cluster.fork()

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died`)
    console.log(`Forking a new process...`)

    cluster.fork()
  })
}

function childProcess () {
  console.log(`Worker ${process.pid} started...`)

  app.listen(process.env.PORT || 3000, () => console.log('Server is running on port 3000'))
}
