'use strict';
import Queue from './Queue';
import Inquiry from './Inquiry';

// TODO Randomize inquiry generation time to make wait time > 0, when RO is lover then 1
class Pipe {
    /**
     * Create a pipe which will generate and process request and calculate statistics
     * @param {Queue} queue
     * @param {Number} inquiryIntensity
     * @param {Number} processIntensity
     */
    constructor(queue, inquiryIntensity, processIntensity) {
        this.queue = queue;
        this.inquiryInterval = 1000 / inquiryIntensity;
        this.processTime = 1000 / processIntensity;
        this.processedItems = [];
        this.isProcessing = false;
    }

    generateInquires (generationTime) {
        const inquiryGeneratorInterval = setInterval(() => {
            const inquiry = new Inquiry();

            if (!this.isProcessing) {
                inquiry.removeFromQueue();
                this._processInquiry(inquiry, this.processTime);
            }
            else {
                inquiry.addToQueue(this.queue.name, this.queue.items.length);
                this.queue.push(inquiry);
                // console.log('Added TO Queue', inquiry, 'Queue length', this.queue.items.length);
            }
        }, this.inquiryInterval);

        return new Promise((resolve) => {
            setTimeout(function () {
                clearInterval(inquiryGeneratorInterval);
                resolve(true);
            }, generationTime);
        });
    }

    processInquires (processingTime) {
        const inquiryProcessorInterval = setInterval(() => {
            if (this.isProcessing) {
                // console.log('INQUIRY IS ALREADY PROCESSING');
                return;
            }

            if (this.queue.isEmpty())
                return;

            const inquiry = this.queue.pop();
            inquiry.removeFromQueue();
            // console.log('Remove inquiry from queue', inquiry, 'Queue length', this.queue.items.length);
            if (!inquiry)
                return;

            this._processInquiry(inquiry, this.processTime);
        }, 4);

        return new Promise(resolve => {
            setTimeout(function () {
                clearInterval(inquiryProcessorInterval);
                resolve(true);
            }, processingTime);
        });
    }

    _processInquiry (inquiry, processTime) {
        // console.log('Process inquiry', inquiry, 'processTime', processTime);
        this.isProcessing = true;
        inquiry.startProcess();
        const randomizedProcessTime = Math.ceil(Math.random() * processTime + processTime/2);

        setTimeout(() => {
            this.isProcessing = false;
            inquiry.endProcess();
            this.processedItems.push(inquiry);
        }, processTime);
    }
}

export default Pipe;