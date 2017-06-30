/**
 * Created by Marjan on 22-Jun-17.
 */
import React, {Component} from 'react';
import { addFood } from "../../../actions/foodActions"
import { connect } from "react-redux"
import {Link} from "react-router-dom";
import Footer from "../../footer/footer";


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
            <div>
                <div className="container-mob bg-c-white main-layout">
                    <h1>Add Food</h1>
                    <div className="form-group label-floating">
                        <label className="control-label">Name</label>
                        <input type="text" value={this.state.name} onChange={this.handleNameChange.bind(this)} className="form-control w-8"/>
                    </div>
                    <br/>
                    <button className="btn btn-raised btn-primary" onClick={this.addFood.bind(this)}><Link className="c-white" to={'/foods'}>Add Food</Link> </button>
                </div>
                <Footer/>
            </div>
        );
    };
}

export default AddFood;