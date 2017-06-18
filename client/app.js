import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"

import Layout from "./components/Layout"
import store from "./store"

import Test from './components/test/test.component';

// class App extends Component {
//     render() {
//         return <Test />
//     }
// }

// ReactDOM.render(<App />, document.getElementById('app'));

const app = document.getElementById('app')

ReactDOM.render(<Provider store={store}>
    <Layout />
</Provider>, app);