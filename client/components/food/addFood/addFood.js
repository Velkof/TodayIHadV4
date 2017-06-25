/**
 * Created by Marjan on 22-Jun-17.
 */
import React, {Component} from 'react';
import { addFood } from "../../../actions/foodActions"
import { connect } from "react-redux"


@connect((store) => {
    return {};
})

class AddFood extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
        };
    }
    addFood() {
        this.props.dispatch(addFood(this.state));
    }
    handleNameChange(e) {
        this.setState({name: e.target.value});
    }
    render() {
        return (
            <div className="">
                <h1>Add Food</h1>
                <div className="form-group label-floating">
                    <label className="control-label">Name</label>
                    <input type="text" value={this.state.name} onChange={this.handleNameChange.bind(this)} className="form-control"/>
                </div>
                <br/>
                <button className="btn btn-raised btn-primary" onClick={this.addFood.bind(this)}>Add Food</button>
            </div>
        );
    };
}

export default AddFood;