const cluster = require('cluster')
const numCPUs = require('os').cpus().length
const app = require('./app')

if (cluster.isMaster) {
  masterProcess()
} else {
  childProcess()
}

function masterProcess () {
  console.log(`Master ${process.pid} is running`)

  for (let i = 0; i < numCPUs; i++) {
    console.log(`Forking process number ${i}...`)
    cluster.fork()
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died`)
    console.log(`Forking a new process...`)

    cluster.fork()
  })
}

function childProcess () {
  console.log(`Worker ${process.pid} started...`)

  app.listen(3000, () => console.log('Server is running on port 3000'))  
}

