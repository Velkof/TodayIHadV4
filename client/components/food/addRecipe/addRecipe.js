/**
 * Created by Marjan on 06-Jul-17.
 */
import React, {Component} from 'react';
import styles from "./addRecipe.css";
import {addFood} from "../../../actions/foodActions";
import Search from "../../search/search";
import SetIngredientAmountModal from "../../modals/setIngredientAmountModall";

class AddRecipe extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name:"",
            amount: null,
            unit:"gr",
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
            showSearchPage:false,
            showIngredientsModal: false,
            clickedFood:{},
            search: "",
        };

    }
    componentDidMount(){
        $.material.init();
    }
    addFood() {
        this.props.dispatch(addFood(this.state));
    }
    handleChange(e) {
        switch(e.target.id) {
            case "name":
                this.setState({name: e.target.value});
                break;
            case "amount":
                this.setState({amount: e.target.value});
                break;
            case "unit":
                this.setState({unit: e.target.value});
                break;
            default:
                break;
        }
    }
    clickedFood(food) {
        this.setState({clickedFood: food, showIngredientsModal:true});
    }
    handleClick(e) {
        let showSearchPage = !this.state.showSearchPage;
        this.setState({showSearchPage:showSearchPage});
    }
    updateSearch(e) {
        this.setState({
            search: e.target.value
        })
    }
    render() {
        let mappedFoods;

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
                            <span className="f-size-2 c-green">{food.name}</span>

                            <div className="mt-0_5 mb-0_5">Calories: {food.calories} | Fat: {food.fat} | Carbs: {food.carbs} | Protein: {food.protein}</div>
                        </div>
                    </div>
                </div>);
        } else {
            mappedFoods = <p>No ingredients with that name</p>;
        }

        let ccc;

        if (this.state.showIngredientsModal) {
            ccc = <SetIngredientAmountModal
                food = {this.state.clickedFood}
            />;
        }

        return (
            <div className="main-layout">
                { this.state.showSearchPage ? (
                    <div className="container-mob" style={{overflow:'hidden'}}>
                        <div className="px-0">
                            <div className="btn btn-default pl-0 f-size-1_5" onClick={this.handleClick.bind(this)}>
                                <span className="glyphicon glyphicon-chevron-left" style={{float:"left", lineHeight:"1.2em"}}></span>
                                <span style={{float:"left",}}>Back to recipe</span>
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
                        {ccc}
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
                            <label className="control-label">Amount</label>
                            <input id="amount" type="number" value={this.state.amount  || ''} onChange={this.handleChange.bind(this)} className="form-control"/>
                        </div>
                        <div className="col-xs-5 form-group label-floating pl-0">
                            <label className="control-label">Select Unit</label>
                            <select id="unit" value={this.state.unit  || ''} onChange={this.handleChange.bind(this)} className="form-control">
                                <option>gr</option>
                                <option>oz</option>
                            </select>
                        </div>
                        <div className="col-xs-1 form-group label-floating px-0 mx-0">
                            <button className="btn btn-sm btn-default px-0 mx-0">Add</button>
                        </div>
                    </div>
                    <div className="c-grey mt-1 f-size-1_5 pl-0_5">
                        <p>INGREDIENTS</p>
                    </div>
                    <div id="searchAddRecipe" className="searchBar form-group has-feedback mt-1">
                        <input type="text"  defaultValue="" onClick={this.handleClick.bind(this)} placeholder="Search for ingredients" className=""/>
                        <i className="glyphicon glyphicon-search form-control-feedback"></i>
                    </div>

                    <div id="recipeIngredients" className="container-mob-child">
                    </div>
                    <div onClick={this.props.onShowFoodsClick}>
                        <button className="col-xs-12 btn btn-raised btn-success my-1 f-size-2" onClick={this.addFood.bind(this)}> Save Recipe </button>
                    </div>
                </div>
                )}
            </div>
        );
    };
}

export default AddRecipe;