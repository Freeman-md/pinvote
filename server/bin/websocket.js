import { Server } from 'socket.io';
import registerListeners from '../lib/websocket/listeners';

let io = null;

export const initializeWebSocketServer = (server) => {
  io = new Server(server);

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });

    socket.onAny((eventName, ...args) => {
      console.log('Event: ' + eventName + '; Args: ' + args);
    });

    registerListeners(socket)
  });
};

export const getWebSocketServer = () => {
  if (!io) {
    throw new Error("WebSocket server has not been initialized. Please call initializeWebSocketServer first.");
  }
  return io;
}
