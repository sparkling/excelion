const io = require('socket.io')();

function getRandomPaddedInt(max) {
  const value = (Math.floor(Math.random() * Math.floor(max))).toString();
  return value.padStart(3, '0');
}

io.on('connection', (client) => {
  let timeout;
  client.on('subscribeToRates', (interval, currency) => {
    timeout && clearInterval(timeout);
    console.log(`client is subscribing to ${currency} rates with interval ${interval}`);
    timeout = setInterval(() => {
      client.emit('rates', {
        "currency": currency,
        "buy": {
          "mostSignificant": "1.40",
          "leastSignificant": getRandomPaddedInt(999),
        },
        "sell": {
          "mostSignificant": "1.40",
          "leastSignificant": getRandomPaddedInt(999),
        }
      });
    }, interval);
  });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);
