import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import styles from './assets/stylesheets/main.css';
import colors from './assets/stylesheets/colors.css';
import overrides from './assets/stylesheets/overrides.css';

import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import BootstrapMaterialDesign from "bootstrap-material-design/dist/css/bootstrap-material-design.css";
import Ripples from "bootstrap-material-design/dist/css/ripples.css";

import { makeMainRoutes } from './routes';

const routes = makeMainRoutes();
const app = document.getElementById('app');

ReactDOM.render(
    routes
, app);