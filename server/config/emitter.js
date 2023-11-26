// lib/emitter/event-config.js
import { EventEmitter } from 'events';
import Events from '../lib/emitter/events';
import { configureEventListeners } from '../lib/emitter/listeners';

class EventConfig {
  static configure() {
    const emitter = new EventEmitter();
    configureEventListeners(emitter);
    return emitter;
  }
}

export default EventConfig;
