import MailJobDefinitions from './mail-job-definitions';
import NotificationJobDefinitions from './notification-job-definitions';

const jobDefinitions = [MailJobDefinitions, NotificationJobDefinitions];

const allDefinitions = (agenda) => {
  jobDefinitions.forEach((definition) => definition.defineJobs(agenda));
};

export { allDefinitions };
