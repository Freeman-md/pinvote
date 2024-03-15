import setupPollListeners from './setup-poll-listeners';

const registerListeners = (socket) => {
  setupPollListeners(socket);
};

export default registerListeners;
