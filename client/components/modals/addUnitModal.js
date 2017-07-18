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

export default class AddUnitModal extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.state = {
            toggle: false,
            name: "",
            amountInGrams: null,
            units:[],
        };

        this.unitsArray = [];
    }
    componentDidMount(){
        $.material.init();
    }
    handleChange = (e) => this.setState({[e.target.id]: e.target.value});

    handleAddFoodClick(e){
        let unit = {
            name: this.state.name,
            amountInGrams: this.state.amountInGrams,
        };

        this.unitsArray.push(unit);
        this.setState({amountInGrams:null, name:"", units:this.unitsArray});
        this.refs.name.value = '';
        this.refs.amountInGrams.value = null;
    }
    handleUnitClick(e){
        let indexOfEl = e.target.parentElement.id;
        this.unitsArray = this.state.units;
        this.unitsArray.splice(indexOfEl, 1);
        this.setState({units:this.unitsArray});
    }
    toggle(e) {
        this.setState(prevState => ({
            toggle: !prevState.toggle
        }));

        this.props.sendData(this.state.units);
    }
    render() {
        let units = [];

        this.state.units.forEach(function (unit) {
            units.push(
                <div key={units.length} id={units.length}  className="col-xs-12 px-0">
                    <span className="f-size-1_5">{unit.name}  </span>
                    <span className="btn btn-danger mb-0 f-size-0_8" style={{float:"right", marginTop:"0.3rem"}}>remove</span>
                </div>
            );
        });

        const modal = <div className="modal modal-backdrop mr-1" style={this.state.toggle ? display : hide}>
                            <div id="addUnitModal" className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="closeBtn" onClick={this.toggle}>&times;</button>
                                    <h4 className="modal-title">Add or remove units</h4>
                                </div>
                                <div className="modal-body">
                                    <div className="col-xs-12 f-size-1_5"  onClick={this.handleUnitClick.bind(this)} style={{overflow:"auto", maxHeight:"13rem"}}>
                                        {units}
                                    </div>
                                    <div className="col-xs-12">
                                        <div className="form-group required label-floating">
                                            <label className="control-label">Name</label>
                                            <input id="name" type="text" ref="name" onChange={this.handleChange.bind(this)} className="form-control"/>
                                        </div>
                                        <div className="form-group required label-floating">
                                            <label className="control-label">Weight in grams</label>
                                            <input id="amountInGrams" type="number"  ref="amountInGrams" onChange={this.handleChange.bind(this)} className="form-control"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer full-width" style={{clear:"both"}}>
                                    <a className="btn btn-raised btn-success full-width" onClick={this.handleAddFoodClick.bind(this)}>Add Unit</a>
                                </div>
                            </div>
                        </div>;
        return (
            <div>
                <a className="btn btn-sm btn-default px-0 mx-0" onClick={this.toggle}>Add Unit</a>
                {modal}
            </div>
        );
    }
}