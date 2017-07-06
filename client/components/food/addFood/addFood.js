/**
 * Created by Marjan on 22-Jun-17.
 */
import React, {Component} from 'react';
import { addFood } from "../../../actions/foodActions"
import {Link} from "react-router-dom";
import Footer from "../../footer/footer";


class AddFood extends Component {
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
            case "calories":
                this.setState({calories: e.target.value});
                break;
            case "protein":
                this.setState({protein: e.target.value});
                break;
            case "fat":
                this.setState({fat: e.target.value});
                break;
            case "carbs":
                this.setState({carbs: e.target.value});
                break;
            case "sugar":
                this.setState({sugar: e.target.value});
                break;
            case "fiber":
                this.setState({fiber: e.target.value});
                break;
            case "fatSat":
                this.setState({fatSat: e.target.value});
                break;
            case "fatMono":
                this.setState({fatMono: e.target.value});
                break;
            case "fatPoly":
                this.setState({fatPoly: e.target.value});
                break;
            case "sodium":
                this.setState({sodium: e.target.value});
                break;
            case "cholesterol":
                this.setState({cholesterol: e.target.value});
                break;
            default:
                break;
        }
    }
    render() {
        return (
            <div className="main-layout">
                <div className="container-mob bg-c-white" style={{overflow:'hidden'}}>

                    <br/>
                    <ul className="nav nav-tabs">
                        <li className="col-xs-4 nav-item">
                            <a className="nav-link active" href="#">Add food</a>
                        </li>
                        <li className="col-xs-4 nav-item">
                            <a className="nav-link" href="#">Add recipe</a>
                        </li>
                        <li className="col-xs-4 nav-item">
                            <a className="nav-link" href="#">My foods </a>
                        </li>
                    </ul>
                    <br/>
                    <br/>

                    <div className="form-group required label-floating">
                        <label className="control-label">Name</label>
                        <input id="name" type="text" value={this.state.name  || ''} onChange={this.handleChange.bind(this)} className="form-control"/>
                    </div>
                    <div className="col-xs-6 form-group required label-floating pl-0">
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
                    <div className="col-xs-12 form-group alert alert-dismissible f-size-1_2" style={{backgroundColor:"#f2dede", color:"#a94442",}}>
                        <button type="button" className="close" data-dismiss="alert">×</button>
                        <p className>All nutrient values should be per selected weight:<strong> 100 x gr or 100 grams</strong>.</p>
                    </div>
                    <div className="col-xs-6 form-group required label-floating pl-0">
                        <label className="control-label">Calories</label>
                        <input id="calories" type="number" value={this.state.calories  || ''} onChange={this.handleChange.bind(this)} className="form-control"/>
                    </div>
                    <div className="col-xs-6 form-group label-floating pl-0">
                        <label className="control-label">Protein (g)</label>
                        <input id="protein" type="number" value={this.state.protein  || ''} onChange={this.handleChange.bind(this)} className="form-control"/>
                    </div>
                    <div className="col-xs-6 form-group label-floating pl-0">
                        <label className="control-label">Fat (g)</label>
                        <input id="fat" type="number" value={this.state.fat  || ''} onChange={this.handleChange.bind(this)} className="form-control"/>
                    </div>
                    <div className="col-xs-6 form-group label-floating pl-0">
                        <label className="control-label">Carbs (g)</label>
                        <input id="carbs" type="number" value={this.state.carbs  || ''} onChange={this.handleChange.bind(this)} className="form-control"/>
                    </div>
                    <div className="col-xs-6 form-group label-floating pl-0">
                        <label className="control-label">Sat. Fat (g)</label>
                        <input id="fatSat" type="number" value={this.state.fatSat  || ''} onChange={this.handleChange.bind(this)} className="form-control"/>
                    </div>
                    <div className="col-xs-6 form-group label-floating pl-0">
                        <label className="control-label">Fiber (g)</label>
                        <input id="fiber" type="number" value={this.state.fiber  || ''} onChange={this.handleChange.bind(this)} className="form-control"/>
                    </div>
                    <div className="col-xs-6 form-group label-floating pl-0">
                        <label className="control-label">Mono. Fat (g)</label>
                        <input id="fatMono" type="number" value={this.state.fatMono  || ''} onChange={this.handleChange.bind(this)} className="form-control"/>
                    </div>
                    <div className="col-xs-6 form-group label-floating pl-0">
                        <label className="control-label">Sugar (g)</label>
                        <input id="sugar" type="number" value={this.state.sugar  || ''} onChange={this.handleChange.bind(this)} className="form-control"/>
                    </div>
                    <div className="col-xs-6 form-group label-floating pl-0">
                        <label className="control-label">Poly. Fat (g)</label>
                        <input id="fatPoly" type="number" value={this.state.fatPoly  || ''} onChange={this.handleChange.bind(this)} className="form-control"/>
                    </div>
                    <div className="col-xs-6 form-group label-floating pl-0">
                        <label className="control-label">Sodium (mg)</label>
                        <input id="sodium" type="number" value={this.state.sodium  || ''} onChange={this.handleChange.bind(this)} className="form-control"/>
                    </div>
                    <div className="col-xs-6 form-group label-floating pl-0">
                        <label className="control-label">Cholesterol (mg)</label>
                        <input id="cholesterol" type="number" value={this.state.cholesterol  || ''} onChange={this.handleChange.bind(this)} className="form-control"/>
                    </div>
                    <br/>
                    <button className="col-xs-12 btn btn-raised btn-primary" onClick={this.addFood.bind(this)}><Link className="c-white" to={'/foods'}>Add Food</Link> </button>
                </div>
                <Footer/>
            </div>
        );
    };
}

export default AddFood;