'use strict';
import uuid from 'uuid/v4';

class Inquiry {
    constructor () {
        this.id = uuid();
        this.createdAt = new Date();

        this.processStarted = null;
        this.processEnded = null;

        this.queueAddedAt = null;
        this.queueDeletedAt = null;

        this.queueLength = null;
        this.queueName = null;
    }

    addToQueue (queueName, queueLength) {
        this.queueAddedAt = new Date();
        this.queueName = queueName;
        this.queueLength = queueLength;
    }

    removeFromQueue () {
        this.queueDeletedAt = new Date();
    }

    startProcess () {
        this.processStarted = new Date();
    }

    endProcess () {
        this.processEnded = new Date();
    }
}

export default Inquiry;