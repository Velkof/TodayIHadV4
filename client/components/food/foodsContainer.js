/**
 * Created by Marjan on 06-Jul-17.
 */
import React from "react";
import { connect } from "react-redux";

import Foods from "./foods/foods";
import AddFood from "./addFood/addFood";
import EditFood from "./editFood/editFood";
import DeleteFood from "./deleteFood/deleteFood";
import AddRecipe from "./addRecipe/addRecipe";
import FoodNavBar from "./foodNavBar/foodNavBar";
import FoodsNavBar from "./foodsNavBar/foodsNavBar";
import Footer from "../footer/footer";
import BackToFoodsNav from "./backToFoodsNav/backToFoodsNav";

import {addFood, fetchFoods, updateFood, deleteFood} from "../../actions/foodActions";
import EditRecipe from "./editRecipe/editRecipe";

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
        this.handleEditRecipeClick = this.handleEditRecipeClick.bind(this);
        this.handleDeleteFoodClick = this.handleDeleteFoodClick.bind(this);

        this.state = {
            render: "showFoods",
        };
        this.clickedFood = {};
    }
    componentWillMount() {
        this.props.dispatch(fetchFoods());
    }
    getFoodFromClickedFood(val){
        this.clickedFood = val;
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
    handleEditRecipeClick() {
        this.setState({render:"editRecipe"});
    }
    handleDeleteFoodClick() {
        this.setState({render:"deleteFood"});
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
                            onEditRecipeClick = {this.handleEditRecipeClick}
                            onDeleteFoodClick = {this.handleDeleteFoodClick}
                            foodType = {this.clickedFood.type}
                        />;

        let backToFoodsNav = <BackToFoodsNav
                                 onShowFoodsClick={this.handleShowFoodsClick}
                        />;

        if(this.state.render === "showFoods"){
            foodComponentsToRender = <Foods
                                        onEditFoodClick = {this.handleEditFoodClick}
                                        onEditRecipeClick = {this.handleEditRecipeClick}
                                        onDeleteFoodClick = {this.handleDeleteFoodClick}
                                        sendData={this.getFoodFromClickedFood.bind(this)}
                                        foods={this.props.foods}
                                        foodsNavBar={foodsNavBar}
                                    />;
        }
        else if (this.state.render === "addRecipe") {
            foodComponentsToRender = <AddRecipe
                                        foods={this.props.foods}
                                        foodsNavBar={foodsNavBar}
                                        dispatch={this.props.dispatch}
                                        onShowFoodsClick = {this.handleShowFoodsClick}
                                    />;

        } else if (this.state.render === "addFood"){
            foodComponentsToRender = <AddFood
                                        dispatch={this.props.dispatch}
                                        onShowFoodsClick = {this.handleShowFoodsClick}
                                        foodsNavBar={foodsNavBar}
                                    />;
        } else if (this.state.render === "editFood"){
            foodComponentsToRender = <EditFood
                                        dispatch={this.props.dispatch}
                                        foodNavBar={foodNavBar}
                                        backToFoodsNav = {backToFoodsNav}
                                        onShowFoodsClick = {this.handleShowFoodsClick}
                                        food = {this.clickedFood}
                                    />
        } else if (this.state.render === "editRecipe"){
            foodComponentsToRender = <EditRecipe
                                        dispatch={this.props.dispatch}
                                        foods={this.props.foods}
                                        foodNavBar={foodNavBar}
                                        backToFoodsNav = {backToFoodsNav}
                                        onShowFoodsClick = {this.handleShowFoodsClick}
                                        food = {this.clickedFood}
                                    />
        } else {
            foodComponentsToRender = <DeleteFood
                                        dispatch={this.props.dispatch}
                                        foodNavBar={foodNavBar}
                                        backToFoodsNav = {backToFoodsNav}
                                        onShowFoodsClick = {this.handleShowFoodsClick}
                                        food = {this.clickedFood}
                                    />
        }
        return (
                <div>
                    {foodComponentsToRender}
                    <Footer
                        onShowFoodsClick = {this.handleShowFoodsClick}
                    />
                </div>
        )
    }
}