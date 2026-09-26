const socketio = require('socket.io');
const agentService = require('./agentService');

const initSocket = (server) => {
    const io = socketio(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log(`New Socket Connection: ${socket.id}`);

        socket.on('join', (userId) => {
            socket.join(userId);
            console.log(`User ${userId} joined their room`);
        });

        socket.on('sendMessage', async (data) => {
            const { userId, message, isSystem } = data;
            console.log(`Received ${isSystem ? 'system' : 'user'} message from ${userId}: "${message}"`);

            // Process the message with the actual AI agent
            const aiResponse = await agentService.getChatResponse(message, isSystem);
            const text = (typeof aiResponse === 'string') ? aiResponse : JSON.stringify(aiResponse);
            console.log(`AI Response generated: "${text.substring(0, 50)}..."`);

            socket.emit('message', {
                sender: 'ai',
                text
            });
        });

        socket.on('disconnect', () => {
            console.log('Socket disconnected');
        });
    });

    return io;
};

module.exports = initSocket;
