import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';

import Test from './components/test/test.component';

class App extends React.Component {
    render() {
        return <Test />
    }
}

ReactDOM.render(<App />, document.getElementById('app'));