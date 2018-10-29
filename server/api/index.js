const publicApi = require('./public');
const privateApi = require('./private');

function api(server) {
  server.use('/api/v1/public', publicApi);
  server.use('/api/v1/private', privateApi);
}

module.exports = api;
