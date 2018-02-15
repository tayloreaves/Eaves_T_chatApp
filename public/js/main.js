(() => {
  const socket = io();

  let messageList = document.querySelector('ul'),
      chatForm = document.querySelector('form'),
      nameInput = document.querySelector('.nickname'),
      chatMessage = chatForm.querySelector('.message');
      nickName = null;

    function setNickname() {
      //debugger;
      nickName = this.value;
    }

    function handleSendMessage(e) {
      e.preventDefault(); // prevent the default behaviour - a submit trigger
      nickName = (nickName && nickName.length > 0) ? nickName : 'user';
      msg = `${nickName} says ${chatMessage.value}`;

      socket.emit('chat message', msg);
      chatMessage.value = "";
      return false;
    }

    function appendMessage(msg) {
      //debugger;
      let newMsg = `<li class="fadeIn">${msg.message}</li>`;
      messageList.innerHTML += newMsg;
    }

    function appendDiscMessage(msg) {
      //debugger;
      let newMsg = `<li>${msg}</li>`;
      messageList.innerHTML += newMsg;
  }

  function addNotificationMessage(msg) {
      messageList.innerHTML += `<li class="fadeIn">Message sent at ${msg.message}</li>`;
    }

    nameInput.addEventListener('change', setNickname, false);
    chatForm.addEventListener('submit', handleSendMessage, false);
    socket.addEventListener('chat message', appendMessage, false);
    socket.addEventListener('disconnect message', appendDiscMessage, false);
    socket.addEventListener('notification', addNotificationMessage, false);

})();
