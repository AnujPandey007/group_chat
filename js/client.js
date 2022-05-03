const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInp = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
var audio = new Audio('ting.mp3');

const append =(message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
        audio.play();
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInp.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInp.value = "";
});

const userName = prompt("Enter Your Name: ");

socket.emit('new-user-joined', userName);

socket.on('user-joined', userName=>{
    append(`${userName} has joined the chat`, 'right');
});

socket.on('receive', data=>{
    append(`${data.userName} : ${data.message}`, 'left');
});

socket.on('left', userName=>{
    append(`${userName} has left`, 'left');
});