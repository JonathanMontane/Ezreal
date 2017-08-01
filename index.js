const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: process.env.SERVER_PORT });

const take = require('./rate-limiter');

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    try {
      const tokenRequest = JSON.parse(message);
      take(tokenRequest)
        .then(() => {
          ws.send(message);
        })
        .catch((e) => {
          console.log('got error in take', e);
          ws.send(JSON.stringify({ status: 'error', error: e, id: tokenRequest.id }));
        });
    } catch (e) {
      ws.send(0);
    }
  });
});
