import Events from "../../lib/emitter/events"
import JobHandlers from "../handlers"

const defineMailJobs = (agenda) => {
    agenda.define(Events.SEND_PASSWORD_RESET_MAIL, JobHandlers.sendPasswordResetEmail)
}

export { defineMailJobs }