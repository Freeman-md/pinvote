// lib/agenda-config.js
import dotenv from 'dotenv';
import { Agenda } from '@hokify/agenda';
import { allDefinitions } from '../jobs/definitions';

dotenv.config();

class AgendaConfig {
  static configure() {
    const agenda = new Agenda({
      db: {
        address: process.env.MONGO_DB_URI,
        options: { useUnifiedTopology: true },
      },
      processEvery: '1 minute',
      maxConcurrency: 20,
    });

    allDefinitions(agenda);

    agenda
      .on('ready', () => console.log('Agenda connected to DB!'))
      .on('error', (err) => console.log('Agenda DB connection error!', err));

    (async function () {
      await agenda.start();
    })();

    return agenda;
  }
}

export default AgendaConfig;
