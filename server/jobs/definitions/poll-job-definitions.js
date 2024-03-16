import Events from '../../lib/emitter/events';
import PollJobHandler from '../handlers/poll-job-handler';

class PollJobDefinitions {
  static defineJobs(agenda) {
    agenda.define(Events.POLL_ABOUT_TO_START, PollJobHandler.handlePollAboutToStartJob)
    agenda.define(Events.POLL_STARTED, PollJobHandler.handlePollStartedJob)
    agenda.define(Events.POLL_ABOUT_TO_END, PollJobHandler.handlePollAboutToEndJob)
    agenda.define(Events.POLL_ENDED, PollJobHandler.handlePollEndedJob)
  }

  static async runJobs(agenda) {
    await agenda.every("5 seconds", [
      Events.POLL_ABOUT_TO_START,
      Events.POLL_STARTED,
      Events.POLL_ABOUT_TO_END,
      Events.POLL_ENDED
    ])
  }
}

export default PollJobDefinitions;
