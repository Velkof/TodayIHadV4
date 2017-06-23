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
                <br/>
                <label>FoodName</label><br/>
                <input placeholder="Name" value={this.state.name}  onChange={this.handleNameChange.bind(this)}/>

                <button onClick={this.addFood.bind(this)}>Add Food</button>
            </div>
        );
    };
}

export default AddFood;