var socket = io.connect('http://localhost:4000');


//Query DOM
var message = document.getElementById('message'),
 handle = document.getElementById('handle'),
 button = document.getElementById('send'),
 feedback = document.getElementById('feedback'),
 output = document.getElementById('output');

//Emit events

button.addEventListener('click',function(){
socket.emit('chat',{
    message:message.value,
    handle:handle.value,
});
message.value = "";
});
message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
});

//lsiten for events

socket.on('chat',function(data){
    feedback.innerHTML='';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});
socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});


//for background animation
