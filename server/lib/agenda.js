import dotenv from 'dotenv';
import { Agenda } from '@hokify/agenda';
import { allDefinitions } from '../jobs/definitions';
import PollJobDefinitions from '../jobs/definitions/poll-job-definitions';
import Events from './emitter/events';

dotenv.config();

class AgendaConfig {
  static configure() {
    const agenda = new Agenda({
      db: {
        address: process.env.MONGO_DB_URI,
        options: { useUnifiedTopology: true },
      },
      processEvery: '5 seconds',
      maxConcurrency: 20,
    });

    allDefinitions(agenda);

    agenda
      .on('ready', () => console.log('Agenda connected to DB!'))
      .on('error', (err) => console.log('Agenda DB connection error!', err));

    (async () => {
      await agenda.start();

      await this.unlockStuckJobs(agenda);

      await PollJobDefinitions.runJobs(agenda)
    })();

    return agenda;
  }

  static async unlockStuckJobs(agenda) {
    try {
      // Unlocking all jobs that may be stuck in a locked state cause of server unexpected shutdown
      const result = await agenda.db.collection.updateMany(
        { lockedAt: { $exists: true }, name: { $in: [
          Events.POLL_ABOUT_TO_START,
          Events.POLL_STARTED,
          Events.POLL_ABOUT_TO_END,
          Events.POLL_ENDED
        ] } }, 
        { $set: { lockedAt: null, nextRunAt: new Date() } } 
      );
      console.log(`Unlocked ${result.modifiedCount} stuck jobs.`);
    } catch (error) {
      console.error('Error unlocking stuck jobs:', error);
    }
  }
}

const agenda = AgendaConfig.configure()

export default agenda;
