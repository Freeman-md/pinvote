import agenda from "../lib/agenda";
import Events from "../lib/emitter/events";

const scheduler = {
  sendPasswordResetMail: async (data) => {
    await agenda.now(Events.PASSWORD_RESET, data);
  },
  sendWelcomeEmail: async (data) => {
    await agenda.now(Events.NEW_USER, data);
  },
  dispatchPollCreatedJob: async (data) => {
    await agenda.now(Events.POLL_CREATED, data)
  },
  dispatchPollUpdatedJob: async (data) => {
    await agenda.now(Events.POLL_UPDATED, data)
  }
}

export default scheduler