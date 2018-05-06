import React, { Component } from 'react';
import QueuingSystem from './components/Queuing-System';
import logo from './logo.svg';

class App extends Component {
  render() {
    return (
        <div>
            <div>The application works</div>
            <QueuingSystem/>
        </div>
    );
  }
}

export default App;
