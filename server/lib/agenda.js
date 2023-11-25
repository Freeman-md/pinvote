import dotenv from 'dotenv'
import { Agenda } from '@hokify/agenda';
import { allDefinitions } from '../jobs/definitions'

dotenv.config()

const agenda = new Agenda({
    db: {
        address: process.env.MONGODB_URI, 
        options: { useUnifiedTopology: true },
    },
    processEvery: "1 minute",
    maxConcurrency: 20,
});

allDefinitions(agenda)

agenda
    .on('ready', () => console.log("Agenda connected to DB!"))
    .on('error', () => console.log("Agenda DB connection error!"));

// console.log({ jobs: agenda.definitions });

(async function () {
    await agenda.start();
})();

export default agenda