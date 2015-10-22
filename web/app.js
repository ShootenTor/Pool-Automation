// MODIFY THIS WITH THE APPROPRIATE URL
var socket = io.connect();


// Checkbox elements
var checkboxes = {
  red: $('#checkbox-red'),
  green: $('#checkbox-green'),
  blue: $('#checkbox-blue'),
  yellow: $('#checkbox-yellow')
}

// Use Bootstrap Switch to style checkboxes
function switchChange(checkboxes, state) {

}

for(var color in checkboxes) {
  checkboxes[color].bootstrapSwitch();
}

/// Send state of checkboxes to server via WebSockets

socket.on ('red1', function (state) {
	$('#checkbox-blue').bootstrapSwitch('toggleState');
  console.log(state);
});

socket.on ('red', function (state) {
	$('#checkbox-red').bootstrapSwitch('setState', true, true);
  console.log(state);
});


checkboxes['red'].on('switchChange.bootstrapSwitch', function(event, state) {
  socket.emit('red', { state: state });
  //console.log(state);
});

checkboxes['green'].on('switchChange.bootstrapSwitch', function(event, state) {
  socket.emit('green', { state: state });
});


checkboxes['blue'].on('switchChange.bootstrapSwitch', function(event, state) {
  socket.emit('blue', { state: state });
});


checkboxes['yellow'].on('switchChange.bootstrapSwitch', function(event, state) {
  socket.emit('yellow', { state: state });
});
