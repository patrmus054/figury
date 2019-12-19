const WebSocket = require("ws");
const server = new WebSocket.Server({
    port: 4444,
});

let figuresPositions = {
    triangle: {},
    rectangle: {},
    quare: {},
    circle: {}
}

server.on("connection", ws => {
    console.log("New host connected");

    ws.on("message", data => {
        const type = JSON.parse(data).type;
        switch (type) {
            case "moved": {
                broadcast(data, ws);
                saveFuguresPosition(data);
                break;
            }
            case "loadRequest": {
                sendRefresh(ws);
                break;
            }
        }
    });
});

const saveFuguresPosition = (data) => {
    const parsedData = JSON.parse(data);
    figuresPositions[parsedData.class] = parsedData;
}

const sendRefresh = (ws) => {
    server.clients.forEach(function each(client) {
        if (client === ws && client.readyState === WebSocket.OPEN) {

            Object.keys(figuresPositions).forEach(key => {
                client.send(JSON.stringify(figuresPositions[key]));
            });
        }
    });
}

const broadcast = (data, ws) => {
    server.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
}