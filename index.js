import { showMessage, showUsersMessage } from "./helpers/showMessage.mjs";

const chat = document.querySelector('#chat');
const registrationForm = document.querySelector('#registration_form');
const sendButton = document.querySelector('#send_button');
const inputBox = document.querySelector('#inputBox');
const submitButton = document.querySelector('#form_button');
const messagesContainer = document.querySelector('#messages_container');

let userName = 'Anon';

let socket = new WebSocket('ws://localhost:8080');

submitButton.onclick = function () {
    let input = document.querySelector('#name_input');
    userName = input.value || userName;
    registrationForm.style.display = 'none';
    chat.style.display = 'block';
}

sendButton.onclick = function () {
    let now = new Date();
    let hours = now.getHours().toString().length < 2 ? `0${now.getHours()}` : now.getHours();
    let minutes = now.getMinutes().toString().length < 2 ? `0${now.getMinutes()}` : now.getMinutes();
    let data = {
        message: inputBox.value,
        userName: userName,
        sendTime: `${hours}:${minutes}`
    };

    socket.send(JSON.stringify(data));
    showMessage(data, inputBox, sendButton, messagesContainer);
};

inputBox.addEventListener('keyup', (event) => {
    let enterNumberOnKeyboard = 13;
    if (event.keyCode === enterNumberOnKeyboard) {
        event.preventDefault();
        sendButton.click();
    }
});

inputBox.addEventListener('input', (event) => {
    sendButton.disabled = !event.target.value;
});

socket.onmessage = ({data}) => showUsersMessage(data, messagesContainer);
