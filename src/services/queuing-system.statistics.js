'use strict';
import Inquiry from '../models/Inquiry';

/**
 * Calculate average queue length of inquiries
 * @param {Array<Inquiry>} inquires
 */
function calculateAverageQueueLength (inquires) {
    if (!inquires.length)
        return 0;

    const itemsAmount = inquires.length;
    const summaryQueueLength = inquires.reduce((sum, inquiry) => {
        if (!inquiry.queueLength)
            return sum;
        return sum + inquiry.queueLength;
    }, 0);

    return summaryQueueLength / itemsAmount;
}

/**
 * Calculate average inquiry wait time
 * @param {Array<Inquiry>} inquires
 * @return {Number} Average wait time in ms
 */
function calculateAverageWaitTime (inquires) {
    if (!inquires.length)
        return 0;

    const itemsAmount = inquires.length;
    const summaryWaitTime = inquires.reduce((sum, inquiry) => {
        return sum + (inquiry.processEnded - inquiry.createdAt);
    }, 0);

    return summaryWaitTime / itemsAmount;
}

/**
 * Calculate Average Idle time of idle logs
 * @param {Array<Object>} idleLogs
 */
function calculateAverageIdleTime (idleLogs) {

}

export default {
    calculateAverageQueueLength,
    calculateAverageWaitTime,
    calculateAverageIdleTime
};