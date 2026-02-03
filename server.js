import {WebSocketServer, WebSocket} from 'ws'; 
const wss = new WebSocketServer({port:8080});

// Connection evvent
wss.on('connection', (socket, request)=>{
    const ip =request.socket.remoteAddress;
    socket.on('message', (rawData)=>{
        console.log({rawData});
        wss.clients.forEach((client)=>{
            if(client.readyState === WebSocket.OPEN)client.send(`Server Broadcast:${rawData}`);})
    });
socket.on('error', (err)=>{
    console.error(`error:${err.message}:${ip}`);
});
socket.on('close', ()=>{
    console.log(`Client disconnected`);
    })
}); 
console.log('WebSocket server listening on ws://localhost:8080');