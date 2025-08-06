const WebSocket = require("ws");
const http = require("http");
const wsServer = new WebSocket.Server({ port: 1234 });

wsServer.on("connection", (ws) => {
  console.log("Cliente conectado");

  ws.on("message", (message) => {
    wsServer.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });
});

console.log("Servidor WebSocket rodando na porta 1234");
