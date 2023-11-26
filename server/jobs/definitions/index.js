// jobs/definitions/index.js
import MailJobDefinitions from './mail-job-definitions';

const jobDefinitions = [MailJobDefinitions];

const allDefinitions = (agenda) => {
  jobDefinitions.forEach((definition) => definition.defineJobs(agenda));
};

export { allDefinitions };
