// lib/emitter/listeners.js
import Events from './events';
import scheduler from '../../jobs/scheduler';

const configureEventListeners = (emitter) => {
  emitter.on(Events.PASSWORD_RESET, async (data) => {
    await scheduler.sendPasswordResetMail(data);
  });

  emitter.on(Events.NEW_USER, async (data) => {
    await scheduler.sendWelcomeEmail(data);
  });

  emitter.on(Events.POLL_CREATED, async (data) => {
    await scheduler.dispatchPollCreatedJob(data)
  })

  emitter.on(Events.POLL_UPDATED, async (data) => {
    await scheduler.dispatchPollUpdatedJob(data)
  })
};

export { configureEventListeners };
