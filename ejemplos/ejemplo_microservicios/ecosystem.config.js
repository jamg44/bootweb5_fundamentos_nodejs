module.exports = {
  apps : [{
    name: 'Conversor',
    script: 'conversionService.js',
    watch: true,
    output: './log/conversionService.log',
    error:  './log/conversionServiceError.log',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    /*args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }*/
  },{
    name: 'Cliente',
    script: 'conversionClient.js',
    watch: true,
    instances: 3,
    output: './log/conversionClient.log',
    error:  './log/conversionClientError.log'
  }],

  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
