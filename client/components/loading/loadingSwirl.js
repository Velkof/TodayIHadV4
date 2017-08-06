/**
 * Created by Marjan on 06-Aug-17.
 */
import React, { Component } from 'react';
import loading from '../../assets/loaders/loading.svg';


export default class LoadingSwirl extends Component {
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
                <img src={loading} alt="loading"/>
            </div>
        );
    }
}