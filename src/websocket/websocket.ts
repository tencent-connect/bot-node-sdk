'use strict';

import WebSocket from 'ws';

const ws = new WebSocket('ws://www.host.com/path');

// 打开WebSocket连接后立刻发送一条消息:
ws.on('open', function open() {
  console.log('open');
  ws.send('something');
});

// 响应收到的消息:
ws.on('message', function message(data) {
  console.log('received: %s', data);
});



// const WebSocketClient = require('websocket').client;

// const client = new WebSocketClient();

// client.on('connectFailed', function(error) {
//     console.log('Connect Error: ' + error.toString());
// });

// client.on('connect', function(connection) {
//     console.log('WebSocket Client Connected');
//     connection.on('error', function(error) {
//         console.log("Connection Error: " + error.toString());
//     });
//     connection.on('close', function() {
//         console.log('echo-protocol Connection Closed');
//     });
//     connection.on('message', function(message) {
//         if (message.type === 'utf8') {
//             console.log("Received: '" + message.utf8Data + "'");
//         }
//     });

//     function sendNumber() {
//         if (connection.connected) {
//             var number = Math.round(Math.random() * 0xFFFFFF);
//             connection.sendUTF(number.toString());
//             setTimeout(sendNumber, 1000);
//         }
//     }
//     sendNumber();
// });

// client.connect('ws://api.sgroup.qq.com/', 'echo-protocol');