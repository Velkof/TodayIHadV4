/**
 * Created by Marjan on 22-Jun-17.
 */
import React, {Component} from 'react';
import { connect } from "react-redux"

import { fetchFoods, updateFood } from "../../../actions/foodActions";

@connect((store) => {
    return {
        foods: store.foods.foods,
    };
})


class EditFood extends Component {
    componentWillMount(){
        this.props.dispatch(fetchFoods());

        let id = this.props.match.params.id;

        this.currentFood = this.props.foods.filter(function(food){
            return food._id === id;
        });

        this.currentFood = this.currentFood[0];
    }

    updateFood() {
        this.props.dispatch(updateFood(this.state));
    }

    handleNameChange(e) {
        this.setState({id: this.currentFood._id, name: e.target.value});
    }

    render() {
        return (
            <div className="">

                <h1>Edit Food</h1>
                    <label>Food Name</label>
                    <input placeholder="Name" defaultValue={this.currentFood.name} onChange={this.handleNameChange.bind(this)}/>
                    <button onClick={this.updateFood.bind(this)}>Update Food</button>
            </div>
        );
    };
}

export default EditFood;