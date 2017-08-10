/**
 * Created by Marjan on 06-Aug-17.
 */
import React, { Component } from 'react';
import loader from '../../assets/loaders/bars.svg';

export default class LoadingBars extends Component {
    render() {
        const style = {
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            height: "100%",
            width: "100%",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        };

        return (
            <div style={style}>
                <img src={loader} alt="loading"/>
            </div>
        );
    }
}