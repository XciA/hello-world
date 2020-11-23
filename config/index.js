'use strict';

module.exports = {
    env: process.env.APP_ENV || 'development',
    name: process.env.APP_NAME || '',
    host: process.env.APP_HOST || '0.0.0.0',
    port: process.env.APP_PORT || 3000
}
