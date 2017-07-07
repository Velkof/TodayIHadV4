/**
 * Created by Marjan on 06-Jul-17.
 */

import React from "react";
import { connect } from "react-redux";

import Footer from "../../components/footer/footer";
import Foods from "../foods/foods";
import AddFood from "../../components/food/addFood/addFood";
import EditFood from "../../components/food/editFood/editFood";
import AddRecipe from "../../components/food/addRecipe/addRecipe";
import FoodsNavBar from "../../components/food/foodsNavBar/foodsNavBar";

import {showAddFood, showAddRecipe, showFoods} from "../../actions/renderActions";
import { fetchFoods } from "../../actions/foodActions";

@connect((store) => {
    return {
        foods: store.foods.foods,
        render:store.render,
    };
})

class FoodsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handleShowFoodsClick = this.handleShowFoodsClick.bind(this);
        this.handleAddFoodClick = this.handleAddFoodClick.bind(this);
        this.handleAddRecipeClick = this.handleAddRecipeClick.bind(this);
    }
    handleAddFoodClick() {
        this.props.showAddFood()
    }
    handleAddRecipeClick() {
        this.props.showAddRecipe()
    }
    handleShowFoodsClick() {
        this.props.showFoods()
    }
    componentWillMount() {
        this.props.dispatch(fetchFoods());
    }

    render() {
        const {render } = this.props;

        let foodComponentsToRender = null;

        if (this.props.render.showAddRecipe === true) {
            foodComponentsToRender = <AddRecipe/>;
        } else if (this.props.render.showAddFood === true) {
            foodComponentsToRender = <AddFood/>;
        } else {
            foodComponentsToRender = <Foods foods={this.props.foods}/>;
        }

        return (
            <div className="main-layout">

                <div className="container-mob" style={{overflow:'hidden'}}>
                    <FoodsNavBar
                        showAddFood = {this.props.render.showAddFood}
                        showAddRecipe = {this.props.render.showAddRecipe}
                        showFoods = {this.props.render.showFoods}
                        onAddFoodClick={this.handleAddFoodClick}
                        onAddRecipeClick={this.handleAddRecipeClick}
                        onShowFoodsClick={this.handleShowFoodsClick}
                    />
                    {foodComponentsToRender}
                </div>
                <Footer/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { render } = state;
    const { showAddFood, showAddRecipe, showFoods } = render;
    return {
        showAddFood,
        showAddRecipe,
        showFoods,
    }
}

export default connect(mapStateToProps, {
    showAddFood,
    showAddRecipe,
    showFoods,
})(FoodsContainer)