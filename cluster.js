const cluster = require('cluster')
const numCPUs = require('os').cpus().length

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

  require('./server')
}
