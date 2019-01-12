module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'nodeapi', // Main Website
      script: './bin/www',
      // env: {
      //   COMMON_VARIABLE: 'true'
      // },
      env_production: { // pm2 start ecosystem.config.js --env production
        NODE_ENV: 'production'
      },
      watch: './',
      ignore_watch: ['node_modules', 'microservices', 'public', 'uploads', 'log'],
      log_file: 'log/app.log',
      log_date_format: 'YYYY-MM-DD HH:mm'
    },
    {
      name: 'ms-thumb', // Thumbnail microservice
      script: 'microservices/thumbnailCreator.service.js',
      // instances : 2,
      watch: ['microservices/thumbnailCreator.service.js'],
      log_file: 'log/ms-product.log',
      log_date_format: 'YYYY-MM-DD HH:mm'
    }
  ]
}
