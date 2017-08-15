/**
 * Created by Marjan on 16-Jul-17.
 */
import React, {Component} from 'react';
import styles from "../addRecipe/addRecipe.css";
import {updateFood} from "../../../actions/foodActions";
import FoodModal from "../../modals/foodModal";
import AddUnitModal from "../../modals/addUnitModal";

class EditRecipe extends Component {
    constructor(props) {
        super(props);
        const _this = this;
        this.food = this.props.food;
        this.foods = this.props.foods;

        this.ingredients = [];

        this.food.ingredients.forEach(function (ingredient) {
            let fullIngredient = _this.foods.filter(x => x._id === ingredient.id);

            fullIngredient[0].amount = ingredient.amount;

            if(fullIngredient.length > 0){
                _this.ingredients.push(fullIngredient[0])
            }
        });

        this.state = {
            id: this.food._id,
            name: this.food.name,
            amount: 100,
            unit:"gr",
            units: this.food.units,
            calories: this.food.calories,
            protein: this.food.protein,
            fat: this.food.fat,
            carbs: this.food.carbs,
            sugar: this.food.sugar,
            fiber: this.food.fiber,
            fatSat: this.food.fatSat,
            fatMono: this.food.fatMono,
            fatPoly: this.food.fatPoly,
            sodium: this.food.sodium,
            cholesterol: this.food.cholesterol,
            ingredients: this.ingredients,
            showSearchPage:false,
            showFoodModal: false,
            clickedFood:{},
            search: "",
        };
    }
    componentWillMount(){
        $.material.init();
    }
    updateRecipe() {

        let _this = this;

        let ingredientsIdAndAmount = [];

        let combinedIngredients = {
            weightInGrams: null,
            calories: null,
            protein:null,
            fat:null,
            carbs:null,
            sugar:null,
            fiber:null,
            fatSat:null,
            fatMono:null,
            fatPoly:null,
            sodium: null,
            cholesterol:null,
        };

        this.state.ingredients.forEach(function (ingredient) {

            let unit = ingredient.units.filter(function (unit) {
                return unit.name === ingredient.unit;
            });

            let ingredientWeightInGramsTotal = unit[0].amountInGrams * ingredient.amount;

            combinedIngredients = {
                weightInGrams: combinedIngredients.weightInGrams + ingredientWeightInGramsTotal,
                calories: combinedIngredients.calories + ingredient.calories,
                protein: combinedIngredients.protein + ingredient.protein,
                fat: combinedIngredients.fat + ingredient.fat,
                carbs: combinedIngredients.carbs + ingredient.carbs,
                sugar: combinedIngredients.sugar + ingredient.sugar,
                fiber: combinedIngredients.fiber + ingredient.fiber,
                fatSat: combinedIngredients.fatSat + ingredient.fatSat,
                fatMono: combinedIngredients.fatMono + ingredient.fatMono,
                fatPoly: combinedIngredients.fatPoly + ingredient.fatPoly,
                sodium: combinedIngredients.sodium + ingredient.sodium,
                cholesterol: combinedIngredients.cholesterol + ingredient.cholesterol,
            };

            let ingredientIdAndAmount = {
                id: ingredient._id,
                unit: ingredient.unit,
                amount: ingredient.amount,
            };

            ingredientsIdAndAmount.push(ingredientIdAndAmount);
        });


        let units = [...this.state.units];
        let recipeUnit = units.filter(x => x.name === 'recipe');
        recipeUnit[0].amountInGrams = combinedIngredients.weightInGrams;

        let times100g = combinedIngredients.weightInGrams / 100;

        function valuePer100g(value){
            if(value === null){
                return null;
            }
            return Math.round(value / times100g * 10) / 10;
        }

        let recipe = {
            id: this.state.id,
            name: this.state.name,
            amount: 100,
            unit: "g",
            units: units,
            type:"recipe",
            calories: valuePer100g(combinedIngredients.calories),
            protein: valuePer100g(combinedIngredients.protein),
            fat: valuePer100g(combinedIngredients.fat),
            carbs: valuePer100g(combinedIngredients.carbs),
            sugar: valuePer100g(combinedIngredients.sugar),
            fiber: valuePer100g(combinedIngredients.fiber),
            fatSat: valuePer100g(combinedIngredients.fatSat),
            fatMono: valuePer100g(combinedIngredients.fatMono),
            fatPoly: valuePer100g(combinedIngredients.fatPoly),
            sodium: valuePer100g(combinedIngredients.sodium),
            cholesterol:valuePer100g(combinedIngredients.cholesterol),
            ingredients: ingredientsIdAndAmount,
        };

        this.props.dispatch(updateFood(recipe));
    }
    handleChange = (e) => this.setState({[e.target.id]: e.target.value});

    handleClick(e) {
        let showSearchPage = !this.state.showSearchPage;
        this.setState({showSearchPage:showSearchPage});
    }
    getUserAddedUnits(val){
        let _this = this;

        this.userAddedUnits  = this.food.units.slice();

        val.forEach(function (unit) {
            _this.userAddedUnits.push(unit);
        });

        let lastUnitInArray = this.userAddedUnits[this.userAddedUnits.length - 1].name;

        this.setState({units:this.userAddedUnits, unit:lastUnitInArray});
    }
    clickedFood(food) {
        this.setState({clickedFood: food, showFoodModal:true});
    }
    updateSearch(e) {
        this.setState({
            search: e.target.value
        })
    }
    getFood(val){
        this.setState({showFoodModal:false, showSearchPage:false});
        this.ingredients.push(val.food);

        this.setState({ingredients: this.ingredients});
    }
    closeModal(){
        this.setState({showFoodModal:false, showSearchPage:true});
    }
    removeIngredient(e){
        const _this = this;
        this.setState({ingredients: this.ingredients});

        if(e.target.id.length > 0) {
            for( let i=_this.ingredients.length-1; i>=0; i--) {
                if( i + _this.ingredients[i]._id === e.target.id){
                    _this.ingredients.splice(i,1);
                }
            }
        }
    }
    render() {
        let mappedFoods;
        let _this = this;

        let filteredFoods = this.props.foods.filter(
            (food) => {
                return food.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );

        if (filteredFoods.length > 0) {
            mappedFoods = filteredFoods.map(food =>
                <div className="container-mob-child" key={food._id} onClick={this.clickedFood.bind(this, food)}>
                    <div className="foodItem">
                        <div className="col-xs-12 px-0">
                            <span className="f-size-2 c-orange">{food.name}</span>
                            <div className="mt-0_5 mb-0_5">Calories: {food.calories} | Fat: {food.fat} | Carbs: {food.carbs} | Protein: {food.protein}</div>
                        </div>
                    </div>
                </div>);
        } else {
            mappedFoods = <p>No ingredients with that name</p>;
        }

        let foodModal;

        if (this.state.showFoodModal) {
            foodModal = <FoodModal
                food = {this.state.clickedFood}
                sendData={this.getFood.bind(this)}
                closeModal = {this.closeModal.bind(this)}
                action = "addIngredient"
            />;
        }

        let mappedIngredients = [];

        if (this.ingredients.length > 0) {
            mappedIngredients = this.ingredients.map((food, index) =>
                <div className="px-0 col-xs-12 f-size-2 mt-0_4" key={index + food._id} onClick={this.clickedFood.bind(this, food)}>
                    <span className="c-orange col-xs-7 px-0">{food.name}</span>
                    <span className="col-xs-4 px-0">{food.amount} x {food.unit}</span>
                    <span id={index + food._id} className="col-xs-1 f-size-0_8 mt-0_4 px-0 glyphicon glyphicon-trash"></span>
                </div>);
        }

        let unitsArray = [];
        this.state.units.forEach(function (unit) {
            unitsArray.push(<option key={unitsArray.length} defaultValue={unit.amountInGrams}>{unit.name}</option>);
        });

        return (
            <div className="main-layout">
                { this.state.showSearchPage ? (
                    <div className="container-mob" style={{overflow:'hidden'}}>
                        <div id="searchAddRecipe" className="searchBar form-group has-feedback mt-1">
                            <input type="text" autoFocus  value={this.state.search || ''} onChange={this.updateSearch.bind(this)} placeholder="Search for ingredients"/>
                            <i className="glyphicon glyphicon-search form-control-feedback"></i>
                        </div>
                        <div className="container-mob-child">
                            <div className="bg-c-white">
                                <ul className="pl-0">{mappedFoods}</ul>
                            </div>
                        </div>
                        {foodModal}
                    </div>
                ) : (
                    <div className="container-mob" style={{overflow:'hidden'}}>

                        {this.props.foodNavBar}

                        <div className="container-mob-child">
                            <div className="form-group required label-floating ">
                                <label className="control-label">Name</label>
                                <input id="name" type="text" value={this.state.name  || ''} onChange={this.handleChange.bind(this)} className="form-control"/>
                            </div>
                            <div className="col-xs-6 form-group label-floating pl-0">
                                <label className="control-label">Units</label>
                                <select id="unit" value={this.state.unit  || ''} onChange={this.handleChange.bind(this)} className="form-control">
                                    {unitsArray}
                                </select>
                            </div>
                            <div className="col-xs-2 form-group px-0">
                                <AddUnitModal
                                    sendData={this.getUserAddedUnits.bind(this)}
                                />
                            </div>

                        </div>
                        <div className="c-grey mt-1 f-size-1_5 pl-0_5">
                            <p>INGREDIENTS</p>
                        </div>
                        <div id="searchAddRecipe" className="searchBar form-group has-feedback mt-1 pr-0">
                            <input type="text"  defaultValue="" onClick={this.handleClick.bind(this)} placeholder="Search for ingredients" className=""/>
                            <i className="glyphicon glyphicon-search form-control-feedback"></i>
                        </div>
                        <div id="recipeIngredients" className="container-mob-child" onClick={this.removeIngredient.bind(this)}>
                            {mappedIngredients}
                        </div>
                        <div onClick={this.props.onShowFoodsClick}>
                            <button className="col-xs-12 btn  c-white bg-c-blue-info my-1 f-size-2 mx-0"
                                    onClick={this.updateRecipe.bind(this)}> Update Recipe
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    };
}

export default EditRecipe;