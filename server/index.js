const Ws = require('ws');

;((Ws)=>{
    // ws:localhost:8000
    const server = new Ws.Server({port: 8000})

    const init = ()=> {
        bindEvent();
    }
    function bindEvent(){
        server.on('open',handleOpen)
        server.on("close", handleClose);
        server.on("error", handleError);
        server.on("connection", handleConnection);
    }
    function handleOpen(){
        console.log('Websocket open')
    }
    function handleClose() {
        console.log("Websocket close");

    }
    function handleError() {
        console.log("Websocket error");

    }
    function handleConnection(ws) {
        console.log("Websocket connection");
        ws.on('message',handleMessage)

    }
    function handleMessage(msg){
        console.log('message',msg.toString("utf-8"))
        msg = msg.toString("utf-8")
        server.clients.forEach(function(c){
            c.send(msg)
        })
    }
    init();
})(Ws)