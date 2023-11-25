import { EventEmitter } from 'events'

import Events from './events'
import scheduler from '../../jobs/scheduler'

const emitter = new EventEmitter()

emitter.on(Events.PASSWORD_RESET, async (data) => {    
    await scheduler.sendPasswordResetMail(data)
})

emitter.on(Events.NEW_USER, async (data) => {   
    await scheduler.sendWelcomeEmail(data)
})

export default emitter