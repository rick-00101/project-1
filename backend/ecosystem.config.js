module.exports = {
  apps: [{
    name: 'backend-api',
    script: 'dist/src/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    max_memory_restart: '500M',
    time: true
  }]
};
