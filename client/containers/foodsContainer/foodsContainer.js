/**
 * Created by Marjan on 06-Jul-17.
 */

import React from "react";
import { connect } from "react-redux";

import Footer from "../../components/footer/footer";
import Foods from "../../components/food/foods/foods";
import EditFood from "../../components/food/editFood/editFood";
import AddRecipe from "../../components/food/addRecipe/addRecipe";
import FoodsNavBar from "../../components/food/foodsNavBar/foodsNavBar";
import AddFood from "../../components/food/addFood/addFood";
import DeleteFood from "../../components/food/deleteFood/deleteFood";
import FoodNavBar from "../../components/food/foodNavBar/foodNavBar";

import {addFood, fetchFoods, updateFood, deleteFood} from "../../actions/foodActions";

@connect((store) => {
    return {
        foods: store.foods.foods,
    };
})

export default class FoodsContainer extends React.Component {
    constructor(props) {
        super(props);

        this.handleShowFoodsClick = this.handleShowFoodsClick.bind(this);
        this.handleAddFoodClick = this.handleAddFoodClick.bind(this);
        this.handleAddRecipeClick = this.handleAddRecipeClick.bind(this);
        this.handleEditFoodClick = this.handleEditFoodClick.bind(this);
        this.handleDeleteFoodClick = this.handleDeleteFoodClick.bind(this);

        this.state = {
            render: "showFoods",
        };
    }
    handleShowFoodsClick() {
        this.setState({render:"showFoods"});
    }
    handleAddFoodClick() {
        this.setState({render:"addFood"});
    }
    handleAddRecipeClick() {
        this.setState({render:"addRecipe"});
    }
    handleEditFoodClick() {
        this.setState({render:"editFood"});
    }
    handleDeleteFoodClick() {
        this.setState({render:"deleteFood"});
    }
    componentWillMount() {
        this.props.dispatch(fetchFoods());
    }
    getFoodFromClickedFood(val){
        this.clickedFood = val;
    }
    render() {

        let foodComponentsToRender = null;

        let foodsNavBar =  <FoodsNavBar
            render = {this.state.render}
            onAddFoodClick={this.handleAddFoodClick}
            onAddRecipeClick={this.handleAddRecipeClick}
            onShowFoodsClick={this.handleShowFoodsClick}
        />;

        let foodNavBar =  <FoodNavBar
            render = {this.state.render}
            onEditFoodClick = {this.handleEditFoodClick}
            onDeleteFoodClick = {this.handleDeleteFoodClick}
            onShowFoodsClick = {this.handleShowFoodsClick}
        />;

        if(this.state.render === "showFoods"){
            foodComponentsToRender = <Foods
                onEditFoodClick = {this.handleEditFoodClick}
                onDeleteFoodClick = {this.handleDeleteFoodClick}
                sendData={this.getFoodFromClickedFood.bind(this)}
                foods={this.props.foods}
                foodsNavBar={foodsNavBar}
                foodNavBar={foodNavBar}
            />;

        }
        else if (this.state.render === "addRecipe") {
            foodComponentsToRender = <AddRecipe foods={this.props.foods} foodsNavBar={foodsNavBar}/>;

        } else if (this.state.render === "addFood"){
            foodComponentsToRender = <AddFood  dispatch={this.props.dispatch} foodsNavBar={foodsNavBar}/>;

        } else if (this.state.render === "showFoods"){
            foodComponentsToRender = <Foods
                                        onEditFoodClick = {this.handleEditFoodClick}
                                        onDeleteFoodClick = {this.handleDeleteFoodClick}
                                        sendData={this.getFoodFromClickedFood.bind(this)}
                                        foods={this.props.foods}
                                        // foodsNavBar={foodsNavBar}
                                        // foodNavBar={foodNavBar}
                                    />;
        } else if (this.state.render === "editFood"){
            foodComponentsToRender = <EditFood
                                        dispatch={this.props.dispatch}
                                        foodNavBar={foodNavBar}
                                        food = {this.clickedFood}
                                    />
        } else {
            foodComponentsToRender = <DeleteFood
                                        dispatch={this.props.dispatch}
                                        foodNavBar={foodNavBar}
                                        food = {this.clickedFood}
                                    />
        }

        return (
                <div>
                    {foodComponentsToRender}
                    <Footer/>
                </div>
        )
    }
}