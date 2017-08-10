import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import styles from './assets/stylesheets/main.css';
import sizesAndPositioning from './assets/stylesheets/sizesAndPositioning.css';
import colors from './assets/stylesheets/colors.css';
import overrides from './assets/stylesheets/overrides.css';
import animations from './assets/stylesheets/animations.css';

import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import BootstrapMaterialDesign from "bootstrap-material-design/dist/css/bootstrap-material-design.css";
import Ripples from "bootstrap-material-design/dist/css/ripples.css";

import '../node_modules/bootstrap/dist/js/bootstrap.js';
import '../node_modules/bootstrap/dist/js/npm.js';
import '../node_modules/bootstrap-material-design/dist/js/material.js';
import '../node_modules/bootstrap-material-design/dist/js/ripples.js';

import { Routes } from './routes';

const routes = Routes();
const app = document.getElementById('app');

ReactDOM.render(
    routes
, app);
