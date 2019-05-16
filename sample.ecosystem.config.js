module.exports = {
  apps: [{
    name: 'API-1',
    script: 'pm2-cluster.js', // replace with your entry file
    instances: 1, // add as many as your CPU has cores
    autorestart: true,
    watch: false,
    exec_mode: 'fork', // does not work in 'cluster'
    interpreter_args: '-r /usr/lib/node_modules/spm-agent-nodejs', // ADD THIS
    env: { // ADD ALL OF THIS TOO
      SPM_TOKEN: 'spm_token',
      PORT: 3001,
      spmagent_dbDir: './spmdb',
      spmagent_logger__dir: './spmlogs',
      spmagent_logger__silent: false,
      spmagent_logger__level: 'error'
    }
  }, {
    name: 'API-2',
    script: 'pm2-cluster.js', // replace with your entry file
    instances: 1, // add as many as your CPU has cores
    autorestart: true,
    watch: false,
    exec_mode: 'fork', // does not work in 'cluster'
    interpreter_args: '-r /usr/lib/node_modules/spm-agent-nodejs', // ADD THIS
    env: { // ADD ALL OF THIS TOO
      SPM_TOKEN: 'spm_token',
      PORT: 3002,
      spmagent_dbDir: './spmdb',
      spmagent_logger__dir: './spmlogs',
      spmagent_logger__silent: false,
      spmagent_logger__level: 'error'
    }
  }, {
    name: 'API-3',
    script: 'pm2-cluster.js', // replace with your entry file
    instances: 1, // add as many as your CPU has cores
    autorestart: true,
    watch: false,
    exec_mode: 'fork', // does not work in 'cluster'
    interpreter_args: '-r /usr/lib/node_modules/spm-agent-nodejs', // ADD THIS
    env: { // ADD ALL OF THIS TOO
      SPM_TOKEN: 'spm_token',
      PORT: 3003,
      spmagent_dbDir: './spmdb',
      spmagent_logger__dir: './spmlogs',
      spmagent_logger__silent: false,
      spmagent_logger__level: 'error'
    }
  }, {
    name: 'API-4',
    script: 'pm2-cluster.js', // replace with your entry file
    instances: 1, // add as many as your CPU has cores
    autorestart: true,
    watch: false,
    exec_mode: 'fork', // does not work in 'cluster'
    interpreter_args: '-r /usr/lib/node_modules/spm-agent-nodejs', // ADD THIS
    env: { // ADD ALL OF THIS TOO
      SPM_TOKEN: 'spm_token',
      PORT: 3004,
      spmagent_dbDir: './spmdb',
      spmagent_logger__dir: './spmlogs',
      spmagent_logger__silent: false,
      spmagent_logger__level: 'error'
    }
  }]
}

// [gc-stats] Success: "/usr/lib/node_modules/spm-agent-nodejs/node_modules/gc-stats/build/gcstats/v1.2.1/Release/node-v57-linux-x64/gcstats.node" is installed via remote
