/**
 * Created by Marjan on 06-Jul-17.
 */
import React, {Component} from 'react';
import styles from "./addRecipe.css";
import {addFood} from "../../../actions/foodActions";
import Search from "../../search/search";
import IngredientModal from "../../modals/ingredientModal";
import AddUnitModal from "../../modals/addUnitModal";

class AddRecipe extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name:"",
            amount: null,
            unit:"gr",
            units: [{
                name:"g",
                amountInGrams: 1,
            }, {
                name:"oz",
                amountInGrams: 28.35
            }, {
                name: "recipe",
                amountInGrams: null,
            }],
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
            ingredients: [],
            showSearchPage:false,
            showIngredientsModal: false,
            clickedFood:{},
            search: "",
        };

        this.ingredients = [];

    }
    componentDidMount(){
        $.material.init();
    }
    addRecipe() {

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

        this.props.dispatch(addFood(recipe));
    }
    handleChange(e) {
        switch(e.target.id) {
            case "name":
                this.setState({name: e.target.value});
                break;
            case "unit":
                this.setState({unit: e.target.value});
                break;
            default:
                break;
        }
    }
    handleClick(e) {
        let showSearchPage = !this.state.showSearchPage;
        this.setState({showSearchPage:showSearchPage});
    }
    getUserAddedUnits(val){
        let _this = this;

        this.userAddedUnits = this.state.units;

        val.forEach(function (unit) {
            _this.userAddedUnits.push(unit);
        });

        let lastUnitInArray = this.userAddedUnits[this.userAddedUnits.length - 1].name;

        this.setState({units:this.userAddedUnits, unit:lastUnitInArray});
    }
    clickedFood(food) {
        this.setState({clickedFood: food, showIngredientsModal:true});
    }
    updateSearch(e) {
        this.setState({
            search: e.target.value
        })
    }
    getIngredient(val){
        this.setState({showIngredientsModal:false, showSearchPage:false,});
        this.ingredients.push(val);

        this.setState({ingredients: this.ingredients});
    }
    removeIngredient(e){
        const _this = this;
        this.setState({ingredients: this.ingredients});
        console.log("remove ing state", this.state.ingredients);

        if(e.target.id.length > 0) {
            for( let i=_this.ingredients.length-1; i>=0; i--) {
                if( _this.ingredients[i]._id === e.target.id){
                    e.target.parentNode.remove();
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
                return food.name.indexOf(this.state.search) !== -1;
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

        let ingredientModal;

        if (this.state.showIngredientsModal) {
            ingredientModal = <IngredientModal
                food = {this.state.clickedFood}
                sendData={this.getIngredient.bind(this)}
            />;
        }

        let mappedIngredients = [];

        if (this.ingredients.length > 0) {
            mappedIngredients = this.ingredients.map(food =>
                <div className="px-0 col-xs-12 f-size-2 mt-0_4" key={food._id} onClick={this.clickedFood.bind(this, food)}>
                                <span className="c-orange col-xs-7 px-0">{food.name}</span>
                                <span className="col-xs-4 px-0">{food.amount} x {food.unit}</span>
                                <span id={food._id} className="col-xs-1 f-size-0_8 mt-0_4 px-0 glyphicon glyphicon-trash"></span>
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
                        <div className="px-0">
                            <div className="btn btn-default pl-0 f-size-1_5" onClick={this.handleClick.bind(this)}>
                                <span className="glyphicon glyphicon-chevron-left" style={{lineHeight:"1.2em"}}></span>
                                <span>recipe</span>
                            </div>
                        </div>
                        <div id="searchAddRecipe" className="searchBar form-group has-feedback mt-1">
                            <input type="text" autoFocus  value={this.state.search || ''} onChange={this.updateSearch.bind(this)} placeholder="Search for ingredients"/>
                            <i className="glyphicon glyphicon-search form-control-feedback"></i>
                        </div>
                        <div className="container-mob-child">
                            <div className="bg-c-white">
                                <ul className="pl-0">{mappedFoods}</ul>
                            </div>
                        </div>
                        {ingredientModal}
                    </div>
                ) : (

                <div className="container-mob" style={{overflow:'hidden'}}>
                    {this.props.foodsNavBar}

                    <div className="c-grey mt-1 f-size-1_5 pl-0_5">
                        <p>RECIPE INFO</p>
                    </div>
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
                        <button className="col-xs-12 btn btn-raised btn-success my-1 f-size-2" onClick={this.addRecipe.bind(this)}> Save Recipe </button>
                    </div>
                </div>
                )}
            </div>
        );
    };
}

export default AddRecipe;