'use strict';
import Inquiry from './Inquiry';

class Queue {
    constructor (name, inquiries = []) {
        this.name = name;
        this.items = inquiries;
        this.deletedItems = [];

        this.idleTimes = [{
            start: new Date()
        }];
    }

    /**
     * Add inquiry to the queue
     * @param {Inquiry} item
     */
    push (item) {
        // add idle times end
        if (!this.items.length && this.idleTimes.length) {
            this.idleTimes[this.idleTimes.length - 1].end = new Date();
        }

        this.items.push(item);
    }

    /**
     * Remove inquiry from the queue
     * @returns {undefined || Object}
     */
    pop () {
        // add idle times start
        if (!this.items.length) {
            this.idleTimes.push({
                start: new Date()
            });
            return;
        }

        if (this.items.length) {
            const item = this.items[0];
            this.deletedItems.push(item);
            this.items.splice(0, 1);
            return item;
        }
    }

    isEmpty () {
        return !this.items.length;
    }
}

export default Queue;