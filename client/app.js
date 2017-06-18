import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import bootstrap from './bootstrap';

import Test from './components/test/test.component';

class App extends Component {
    render() {
        return <Test />
    }
}

ReactDOM.render(<App />, document.getElementById('app'));