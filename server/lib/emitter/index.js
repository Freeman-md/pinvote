import { EventEmitter } from 'events'

import Events from './events'
import scheduler from '../../jobs/scheduler'

const emitter = new EventEmitter()

emitter.on(Events.SEND_PASSWORD_RESET_MAIL, async (data) => {    
    await scheduler.sendPasswordResetMail(data)
})

export default emitter