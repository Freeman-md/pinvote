import { Server } from 'socket.io';

let io = null;

export const initializeWebSocketServer = (server) => {
  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });

    socket.on('vote-casted', (option) => {
      console.log('Vote option: ' + option);
    });

    // Add more event listeners as needed
  });
};

export const getWebSocketServer = () => {
  if (!io) {
    throw new Error("WebSocket server has not been initialized. Please call initializeWebSocketServer first.");
  }
  return io;
}
