import { getWebSocketServer } from "../../../bin/websocket";

const setupPollListeners = (socket) => {
    socket.on('vote-casted', (msg) => {
        console.log('Vote casted', msg)

        const io = getWebSocketServer()
        io.emit('new-vote-casted', msg)
    });

};

export default setupPollListeners;
