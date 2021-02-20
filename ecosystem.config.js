const { v4 } = require('uuid');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.production' });

const { APP_NAME, PORT } = process.env;

module.exports = {
  apps: [
    {
      name: `[${PORT}]${APP_NAME || v4()}`,
      script: 'build/main/index.js',
    },
  ],
};
