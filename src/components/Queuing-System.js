'use strict';

import React, { Component } from 'react';
import queuingSystem from '../services/queuing-system';

class QueuingSystem extends Component {
    start () {
        const inquiryIntensity = 20; // for both pipes
        const processIntensity = 5; // for single pipe
        const simulationTime = 5; // simulation time in Milliseconds
        queuingSystem.startSingleQueueSimulation(inquiryIntensity, processIntensity, simulationTime)
            .then(() => queuingSystem.startDoubleQueueSimulation(inquiryIntensity, processIntensity, simulationTime));
    }

    render () {
        return (
            <div>
                <button onClick={this.start}>Start Processing</button>
            </div>
        )
    }
}

export default QueuingSystem;
