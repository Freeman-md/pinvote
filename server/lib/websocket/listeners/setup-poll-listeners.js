const setupPollListeners = (socket) => {
    socket.on('vote-casted', (msg) => {
      console.log('Vote Casted: ' + msg);
    });
  
  };
  
  export default setupPollListeners;
  