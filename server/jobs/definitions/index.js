import { defineMailJobs } from './mails'

const jobDefinitions = [defineMailJobs]

const allDefinitions = (agenda) => {
    jobDefinitions.forEach(definition => definition(agenda))
}

export { allDefinitions }