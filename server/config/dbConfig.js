module.exports = {
  development: {
    username: 'root',
    password: null,
    database: 'test-db-dev',
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql'
  },
  production: {
    username: 'root',
    password: null,
    database: 'test-db-prod',
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql'
  },
  test: {
    username: 'root',
    password: null,
    database: 'test-db-test',
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql'
  }
};
