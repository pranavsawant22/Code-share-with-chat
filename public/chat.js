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


const urlParams = new URLSearchParams(location.search);

let roomId = urlParams.get("id");

if (!roomId) {
  roomId = Math.floor(Math.random() * 10000 + 10000);
  window.location.search = `id=${roomId}`;
}

const textArea = document.querySelector("textarea");

const worker = new Worker("worker.js");

const wsurl = "wss://demo.piesocket.com/v3/channel_1?api_key=oCdCMcMPQpbvNjUIzqtvF1d2X2okWpDQj4AwARJuAgtjhzKxVEjQU6IdCjwm&notify_self"

const socket1 = new WebSocket(wsurl);

const debounce = (func, timer = 100) => {
  let timeId = null;
  return (...args) => {
    if (timeId) {
      clearTimeout(timeId);
    }
    timeId = setTimeout(() => {
      func(...args);
    }, timer);
  };
};

socket1.onopen = () => {};

// const ae = new Audio("https://www.google.com/logos/fnbx/animal_sounds/cat.mp3");
socket1.onmessage = (e) => {
  //   console.log(e.data);
//   ae.play();
  textArea.value = e.data;
};

textArea.addEventListener(
  "input",
  debounce((e) => {
    console.log(e.target.value);
    socket1.send(e.target.value);
  })
);

//