import Events from "../../lib/emitter/events"
import JobHandlers from "../handlers"

const defineMailJobs = (agenda) => {
    agenda.define(Events.PASSWORD_RESET, JobHandlers.sendPasswordResetEmail)

    agenda.define(Events.NEW_USER, JobHandlers.sendWelcomeEmail)
}

export { defineMailJobs }