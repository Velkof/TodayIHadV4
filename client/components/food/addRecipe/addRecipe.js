/**
 * Created by Marjan on 06-Jul-17.
 */
import React, {Component} from 'react';
import styles from "./addRecipe.css";
import {addFood} from "../../../actions/foodActions";

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
    render() {
        return (
            <div className="main-layout">
                <div className="container-mob" style={{overflow:'hidden'}}>
                    {this.props.foodsNavBar}

                    <div id="searchAddRecipe" className="form-group has-feedback mt-1">
                        <input type="text"  defaultValue="" placeholder="Add ingredients" className=""/>
                        <i className="glyphicon glyphicon-search form-control-feedback"></i>
                    </div>
                    <div className="c-grey mt-1 f-size-1_5 pl-0_5">
                        <p>INGREDIENTS</p>
                    </div>
                    <div id="recipeIngredients" className="container-mob-child">
                    </div>
                    <div className="c-grey mt-1 f-size-1_5 pl-0_5">
                        <p>RECIPE INFO</p>
                    </div>
                    <div className="container-mob-child">
                        <div className="form-group required label-floating ">
                            <label className="control-label">Name</label>
                            <input id="name" type="text" value={this.state.name  || ''} onChange={this.handleChange.bind(this)} className="form-control"/>
                        </div>
                        <div className="col-xs-12 form-group alert alert-dismissible f-size-1_2" style={{backgroundColor:"#f2dede", color:"#a94442",}}>
                            <button type="button" className="close" data-dismiss="alert">×</button>
                            <p className>By default, only the gram and ounce units are created. You can add your own units below <strong>(optional)</strong>.</p>
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
                    <div onClick={this.props.onShowFoodsClick}>
                        <button className="col-xs-12 btn btn-raised btn-success my-1 f-size-2" onClick={this.addFood.bind(this)}> Save Recipe </button>
                    </div>
                </div>
            </div>
        );
    };
}

export default AddRecipe;