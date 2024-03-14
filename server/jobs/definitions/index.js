import MailJobDefinitions from './mail-job-definitions';
import NotificationJobDefinitions from './notification-job-definitions';
import PollJobDefinitions from './poll-job-definitions';

const jobDefinitions = [MailJobDefinitions, NotificationJobDefinitions, PollJobDefinitions];

const allDefinitions = (agenda) => {
  jobDefinitions.forEach((definition) => definition.defineJobs(agenda));
};

export { allDefinitions };
