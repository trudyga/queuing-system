'use strict';

import Queue from '../models/Queue';
import Pipe from '../models/Pipe';

import statistics from '../services/queuing-system.statistics';

function startSingleQueueSimulation (inquiryIntensity, processIntensity, simulationTime = 1) {
    simulationTime = simulationTime * 1000;
    const queue = new Queue("first queue");
    const pipe1 = new Pipe(queue, inquiryIntensity, processIntensity);
    const pipe2 = new Pipe(queue, inquiryIntensity, processIntensity);

    return Promise.all([
        pipe1.generateInquires(simulationTime),
        pipe1.processInquires(simulationTime),
        pipe2.processInquires(simulationTime)
    ]).then(() => {
        const processedItems = pipe1.processedItems.concat(pipe2.processedItems);
        const averageWaitTime = statistics.calculateAverageWaitTime(processedItems);
        const averageQueueLength = statistics.calculateAverageQueueLength(processedItems);

        console.log('Single Queue Simulation');
        console.log('-Average Wait Time', averageWaitTime);
        console.log('-Average Queue Length', averageQueueLength);
    });
}

function startDoubleQueueSimulation (inquiryIntensity, processIntensity, simulationTime = 1) {
    simulationTime = simulationTime * 1000;
    const queue1 = new Queue("first queue");
    const queue2 = new Queue("second queue");

    const pipe1 = new Pipe(queue1, inquiryIntensity/2, processIntensity);
    const pipe2 = new Pipe(queue2, inquiryIntensity/2, processIntensity);

    return Promise.all([
        pipe1.generateInquires(simulationTime),
        pipe2.generateInquires(simulationTime),
        pipe1.processInquires(simulationTime),
        pipe2.processInquires(simulationTime)
    ]).then(() => {
        const processedItems = pipe1.processedItems.concat(pipe2.processedItems);
        const averageWaitTime = statistics.calculateAverageWaitTime(processedItems);
        const averageQueueLength = statistics.calculateAverageQueueLength(processedItems);

        console.log('Double Queue Simulation ');
        console.log('-Average Wait Time', averageWaitTime);
        console.log('-Average Queue Length', averageQueueLength);
    });
}

export default {
    startSingleQueueSimulation,
    startDoubleQueueSimulation
};