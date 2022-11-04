;((doc, Socket, storage, location) => {
  const oList = doc.querySelector("#list");
  const oMsg = doc.querySelector("#message");
  const oSend = doc.querySelector("#send");
  const ws = new Socket("ws:localhost:8000");

  let username = "";

  const init = () => {
    bindEvent();
  };
  function bindEvent() {
    oSend.addEventListener("click", handleSenBtnClick, false);
    ws.addEventListener("open", handleOpen, false);
    ws.addEventListener("close", handleClose, false);
    ws.addEventListener("open", handleError, false);
    ws.addEventListener("message", handleMessage, false);
  }
  function handleSenBtnClick(e) {
    console.log("send message", e);
    const msg = oMsg.value;
    if (!msg.trim().length) {
      return;
    }
    ws.send(
      JSON.stringify({
        user: username,
        dateTime: new Date().getTime(),
        message: msg,
      })
    );
    oMsg.value = "";
  }
  function handleOpen(e) {
    console.log("websocket open", e);
    username = storage.getItem("username");
    if (!username) {
      location.href = "entry.html";
    }
  }
  function handleClose(e) {
    console.log("websocket Close", e);
  }
  function handleError(e) {
    console.log("websocket Error", e);
  }
  function handleMessage(e) {
    console.log("websocket Message 接收", e);
    const msgData = JSON.parse(e.data);
    oList.appendChild(createMsg(msgData));
  }
  function createMsg(data) {
    const { user, dateTime, message } = data;
    const oItem = doc.createElement("li");
    oItem.innerHTML = `
        <p>
            <span>${user}</span>
            <i>${new Date(dateTime)}</i>
        </p>
        <p>消息：${message}</p>
    `;
    return oItem;
  }
  init();
})(document, WebSocket, localStorage, location);