module.exports = {
  apps : [{
    name: 'API',
    script: 'server.js', // replace with your entry file
    instances: 0, // add as many as your CPU has cores
    autorestart: true,
    watch: false,
    interpreter_args: '-r /usr/lib/node_modules/spm-agent-nodejs', // ADD THIS
    env: { // ADD ALL OF THIS TOO
      SPM_TOKEN: 'spm_token',
      spmagent_dbDir: './spmdb',
      spmagent_logger__dir: './spmlogs',
      spmagent_logger__silent: false,
      spmagent_logger__level: 'error'
    },
    env_production: {
      SPM_TOKEN: 'spmtplen',
      spmagent_dbDir: './spmdb',
      spmagent_logger__dir: './spmlogs',
      spmagent_logger__silent: false,
      spmagent_logger__level: 'error'
    }
  }]
};

// [gc-stats] Success: "/usr/lib/node_modules/spm-agent-nodejs/node_modules/gc-stats/build/gcstats/v1.2.1/Release/node-v57-linux-x64/gcstats.node" is installed via remote
