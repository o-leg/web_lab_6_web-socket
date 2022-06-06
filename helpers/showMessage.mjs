export function showMessage(data, inputBox, sendButton, messagesContainer) {
    createMessageBox(data, 'message_box_right', messagesContainer);
    messagesContainer.scrollTo(0, messagesContainer.scrollHeight);
    inputBox.value = '';
    sendButton.disabled = true;
}

export function showUsersMessage(data, messagesContainer) {
    data = JSON.parse(data);
    createMessageBox(data, 'message_box_left', messagesContainer);
}

function createMessageBox(data, className, messagesContainer) {
    let messageBox = document.createElement('div');
    let text = document.createElement('p');
    let sendTime = document.createElement('span');
    let userName = document.createElement('span');
    messageBox.classList.add('message_box', className);
    text.className = 'message';
    sendTime.className = 'time';
    userName.className = 'user_name';

    sendTime.textContent = data.sendTime;
    text.textContent = data.message;
    userName.textContent = data.userName;

    messageBox.appendChild(userName);
    messageBox.appendChild(text);
    messageBox.appendChild(sendTime);
    messagesContainer.appendChild(messageBox)
}
