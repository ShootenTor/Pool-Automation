var mraa = require('mraa');
var m = require('mraa'); //require mraa
console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the console
// Map GPIO block pins to MRAA pin numbers
// Reference: https://learn.sparkfun.com/tutorials/installing-libmraa-on-ubilinux-for-edison
var pins = {
  GP44: 31,
  GP45: 45,
  GP46: 32,
  GP47: 46
};

// Initialize LED controls
var leds = {
  red : new mraa.Gpio(6),
  green : new mraa.Gpio(6),
  blue : new mraa.Gpio(6),
  yellow : new mraa.Gpio(6)
};

// Set direction of LED controls to out
for(var color in leds) {
  leds[color].dir(mraa.DIR_OUT);
}

function toggleLed(led, state) {
  led.write(state ? 1 : 0);
}

function toggleLeds(leds, state) {
  for(var color in leds) {
    leds[color].write(state ? 1 : 0);
  }
}

function printLedState(color, state) {
  console.log('color: ' + color + ', state: ' + state);
}

// WebSocket communications
module.exports = function (socket) {
	for(var color in leds)
	socket.on('connection' , function (data, state, callback) {
	socket.broadcast.emit('red' , state);
	socket.broadcast.emit('green' , state);
	socket.broadcast.emit('blue' , state);
	socket.broadcast.emit('yellow' , state);
	});
	
	

  socket.on('red', function(data, state, callback) {
    toggleLed(leds['red'], data.state);
    printLedState('red', data.state);
	socket.broadcast.emit ('red', state);
  });

  socket.on('green', function(data, callback) {
    toggleLed(leds['green'], data.state);
    printLedState('green', data.state);
	callback('state');
  });

  socket.on('blue', function(data) {
    toggleLed(leds['blue'], data.state);
    printLedState('blue', data.state);
  });

  socket.on('yellow', function(data) {
    toggleLed(leds['yellow'], data.state);
    printLedState('yellow', data.state);
  });

  // Handle Ctrl+C event
  process.on('SIGINT', function() {
    toggleLeds(leds, false);
    socket.disconnect();
    process.exit();
  });
};
