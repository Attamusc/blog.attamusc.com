var path = require('path'),
config;

config = {
  development: {
    url: 'http://blog.test',
    mail: {},
    database: {
      client: 'sqlite3',
      connection: {
        filename: path.join(__dirname, '/content/data/ghost-dev.db')
      },
      debug: false
    },
    server: {
      host: '127.0.0.1',
      port: '2368'
    }
  },

  production: {
    url: 'http://blog.attamusc.com',
    mail: {},
    database: {
      client: 'sqlite3',
      connection: {
        filename: path.join(__dirname, '/content/data/ghost.db')
      },
      debug: false
    },
    server: {
      host: '127.0.0.1',
      port: '2368'
    }
  }
};

// Export config
module.exports = config;
