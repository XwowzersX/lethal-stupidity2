const express = require('express');
const WebSocket = require('ws');

const app = express();
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

// Listen for WebSocket connections
wss.on('connection', (ws) => {
    console.log('New client connected');

    // Handle messages from clients
    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        // Broadcast the message to all clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
