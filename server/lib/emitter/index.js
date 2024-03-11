import { EventEmitter } from 'events';
import { configureEventListeners } from './listeners';

class Emitter {
    static configure() {
        const emitter = new EventEmitter();
        configureEventListeners(emitter);
        return emitter;
    }
}

const emitter = Emitter.configure();

export default emitter;
