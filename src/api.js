import openSocket from 'socket.io-client';

const  socket = openSocket('http://localhost:8000');

function subscribeToRates(cb, interval, currency) {
  socket.removeAllListeners('subscribeToRates');
  //socket.off('rates');
  socket.on('rates', rates => cb(null, rates));
  socket.emit('subscribeToRates', interval, currency);
}

function updateSubscription(cb, interval, currency) {
  socket.removeAllListeners('subscribeToRates');
  //socket.off('rates');
  //socket.on('rates', rates => cb(null, rates));
  socket.emit('subscribeToRates', interval, currency);
}

export { subscribeToRates, updateSubscription };
