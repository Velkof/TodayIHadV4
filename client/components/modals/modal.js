/**
 * Created by Marjan on 11-Jul-17.
 */
import React, {Component} from 'react';
import styles from './modal.css';

const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            toggle: false
        }
    }
    toggle(event) {
        this.setState(prevState => ({
            toggle: !prevState.toggle
        }));
    }
    render() {
        const {header, body, footer } = this.props;
        const modal = [];
        modal.push(
            <div className="modal" style={this.state.toggle ? display : hide}>
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="closeBtn" onClick={this.toggle}>&times;</button>
                        <h4 className="modal-title">Modal Header</h4>
                        {header}
                    </div>
                    <div className="modal-body">
                        <p>Some text in the modal.</p>
                        {body}
                    </div>
                    <div className="modal-footer">
                        {footer}
                        <a className="btn" onClick={this.toggle}>Agree</a>
                    </div>
                </div>
            </div>
        );
        return (
            <div>
                <a className="btn" onClick={this.toggle}>Modal</a>
                {modal}
            </div>
        );
    }
}