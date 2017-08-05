/**
 * Created by Marjan on 13-Jul-17.
 */
import React, {Component} from 'react';
import styles from './modal.css';

const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

export default class FoodModal extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);

        this.props.food.unit = "g";
        this.props.food.amount = 100;

        this.state = {
            toggle: true,
            name: "",
            food: this.props.food,
        };
    }
    componentDidMount(){
        $.material.init();
    }
    sendFoodToParent(e) {


        let data = {
            action: e.target.id,
            food: this.state.food
        };

        this.props.sendData(data);
    }
    closeModal(e){
        this.props.closeModal();
    }
    handleChange(e){

        const _this = this;
        let amount;
        let unit;
        let times100g;
        this.food = this.props.food;

        if(e.target.id === "unit") {
            unit = _this.state.food.units.filter(function ( unit ) {
                return unit.name === e.target.value;
            })[0];
            times100g = unit.amountInGrams / 100;
            amount = _this.state.food.amount;

        } else {
            const unitName = _this.state.food.unit;
            unit = _this.state.food.units.filter(function ( unit ) {
                return unit.name === _this.state.food.unit;
            })[0];
            times100g = unit.amountInGrams / 100;
            amount = e.target.value;
        }

        function valuesToSelectedUnitAndAmount(value){
            if(value === null){
                return null;
            }
            return Math.round(value * times100g * amount * 10) / 10;
        }

        this.setState({
            food:{
                _id: this.food._id,
                name: this.food.name,
                unit: unit.name,
                amount: amount,
                units: this.food.units,
                calories:  valuesToSelectedUnitAndAmount(this.props.food.calories),
                protein: valuesToSelectedUnitAndAmount(this.props.food.protein),
                fat: valuesToSelectedUnitAndAmount(this.props.food.fat),
                carbs: valuesToSelectedUnitAndAmount(this.props.food.carbs),
                sugar: valuesToSelectedUnitAndAmount(this.props.food.sugar),
                fiber: valuesToSelectedUnitAndAmount(this.props.food.fiber),
                fatSat: valuesToSelectedUnitAndAmount(this.props.food.fatSat),
                fatMono: valuesToSelectedUnitAndAmount(this.props.food.fatMono),
                fatPoly: valuesToSelectedUnitAndAmount(this.props.food.fatPoly),
                sodium:  valuesToSelectedUnitAndAmount(this.props.food.sodium),
                cholesterol: valuesToSelectedUnitAndAmount(this.props.food.cholesterol),
            }
        });

    }
    toggle(e) {
        this.setState(prevState => ({
            toggle: !prevState.toggle
        }));
    }
    render() {
        let actionButtons = "";
        let title = "";
        if(this.props.action === "logFood"){
            title = "Log food - " + this.state.food.name;
            actionButtons = <div className="modal-footer full-width" style={{clear:"both"}} onClick={this.sendFoodToParent.bind(this)}>
                                <a id="logFood" className="btn c-white bg-c-green-success full-width" >Log Food</a>
                            </div>
        } else if (this.props.action === "updateLoggedFood") {
            title = "Update food - " + this.state.food.name;
            actionButtons =  <div className="modal-footer full-width p-0 f-size-2" style={{clear:"both"}} onClick={this.sendFoodToParent.bind(this)}>
                                <div  className="col-xs-6 mx-0 px-0">
                                    <a id="deleteLoggedFood" className="btn c-white bg-c-red-danger full-width m-0 f-size-1">Delete</a>
                                </div>
                                <div className="col-xs-6 mx-0 px-0 ">
                                    <a  id="updateLoggedFood" className="btn c-white bg-c-green-success full-width m-0 f-size-1" style={{borderLeft:"1px solid white"}}>Update</a>
                                </div>
                            </div>;
        }
        else {
            title = "Save ingredient - " + this.state.food.name;
            actionButtons = <div className="modal-footer full-width" style={{clear:"both"}} onClick={this.sendFoodToParent.bind(this)}>
                                <a id="saveIngredient" className="btn c-white bg-c-green-success full-width" >Save Ingredient</a>
                            </div>
        }

        let unitsArray = [];
        this.state.food.units.forEach(function (unit) {
            unitsArray.push(<option key={unitsArray.length} defaultValue={unit.amountInGrams}>{unit.name}</option>);
        });

        const modal = <div className="modal modal-backdrop mr-1" style={this.state.toggle ? display : hide}>
            <div id="foodModal" className="modal-content">
                <div className="modal-header">
                    <button type="button" className="closeBtn" onClick={this.closeModal.bind(this)}>&times;</button>
                    <h4 className="modal-title" style={{paddingLeft:"1.3em"}}>{title  || ''}</h4>
                </div>
                <div className="modal-body">
                    <div className="form-group required label-floating pl-0">
                        <label className="control-label">Amount</label>
                        <input id="amount" type="number" value={this.state.food.amount  || ''} onChange={this.handleChange.bind(this)} className="form-control"/>
                    </div>
                    <div className="form-group required label-floating pl-0 mb-1">
                        <label className="control-label">Select Unit</label>
                        <select id="unit" value={this.state.food.unit  || ''} onChange={this.handleChange.bind(this)} className="form-control">
                            {unitsArray}
                        </select>
                    </div>
                    <table id="foodInfoTable" className="col-xs-10 col-xs-offset-1 f-size-1_7">
                        <tbody><tr><th>Info</th><th></th><th></th><th></th></tr>
                        <tr>
                            <td className="">Fat: </td>
                            <td className=""><span id="">{this.state.food.fat}</span> g &nbsp;</td>
                            <td className=""> Prot: </td>
                            <td className=""><span id="">{this.state.food.protein}</span> g &nbsp;</td>
                        </tr>
                        <tr>
                            <td className="pl-1">Sat. </td>
                            <td className=""><span id="">{this.state.food.fatSat}</span> g &nbsp;</td>
                            <td className=""> Carb: </td>
                            <td className=""><span id="">{this.state.food.carbs}</span> g &nbsp;</td>
                        </tr>
                        <tr>
                            <td className="pl-1">Mono. </td>
                            <td className=""> <span id="">{this.state.food.fatMono}</span> g &nbsp;</td>
                            <td className="pl-1">Fiber: </td>
                            <td className=""><span id="">{this.state.food.fiber}</span> g &nbsp;</td>
                        </tr>
                        <tr>
                            <td className="pl-1">Poly.</td>
                            <td className=""><span id="">{this.state.food.fatPoly}</span> g &nbsp;</td>
                            <td className="pl-1">Sugar:</td>
                            <td className=""><span id="">{this.state.food.sugar}</span> g &nbsp;</td>
                        </tr>
                        <tr>
                            <td className="">Choles:</td>
                            <td className=""><span id="">{this.state.food.cholesterol}</span> mg</td>
                            <td className="">Sodium:</td>
                            <td className=""><span id="">{this.state.food.sodium}</span> mg</td>
                        </tr>
                        </tbody>
                    </table>
                    <div id="" className="col-xs-12" style={{textAlign:"center"}}><h3>{this.state.food.calories} calories</h3></div>

                </div>

                {actionButtons}

            </div>
        </div>;
        return (
            <div>
                {modal}
            </div>
        );
    }
}