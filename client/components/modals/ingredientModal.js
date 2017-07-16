/**
 * Created by Marjan on 13-Jul-17.
 */
import React, {Component} from 'react';
import styles from './modal';

const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

export default class IngredientModal extends React.Component {
    constructor(props) {
        super(props);

        console.log("this.props", this.props);

        this.toggle = this.toggle.bind(this);

        //we set unit and amount to these values as nutrient values are calculated per 100g
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
    sendIngredientToParent(){
        this.props.sendData(this.state.food);

    }
    handleChange(e){

        const _this = this;
        let amount;
        let unit;
        let times100g;
        this.food = this.state.food;

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
                id: this.food._id,
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
        let unitsArray = [];
        this.state.food.units.forEach(function (unit) {
            unitsArray.push(<option key={unitsArray.length} defaultValue={unit.amountInGrams}>{unit.name}</option>);
        });
        const modal = <div className="modal modal-backdrop mr-1" style={this.state.toggle ? display : hide}>
            <div id="recipeIngredientsModal" className="modal-content">
                <div className="modal-header">
                    <button type="button" className="closeBtn" onClick={this.toggle}>&times;</button>
                    <h4 className="modal-title">Select ingredient amount and unit</h4>
                </div>
                <div className="modal-body">
                    <div className="col-xs-5 form-group required label-floating pl-0">
                        <label className="control-label">Amount</label>
                        <input id="amount" type="number" value={this.state.food.amount  || ''} onChange={this.handleChange.bind(this)} className="form-control"/>
                    </div>
                    <div className="col-xs-5 form-group required label-floating pl-0">
                        <label className="control-label">Select Unit</label>
                        <select id="unit" value={this.state.food.unit  || ''} onChange={this.handleChange.bind(this)} className="form-control">
                            {unitsArray}
                        </select>
                    </div>
                    <table className="col-xs-12 f-size-1_7" id="">
                        <tbody><tr><th>Info</th></tr>
                        <tr>
                            <td className="">Fat: </td>
                            <td className=""><span id="">{this.state.food.fat}</span> g &nbsp;</td>
                            <td className=""> Prot: </td>
                            <td className=""><span id="">{this.state.food.protein}</span> g &nbsp;</td>
                        </tr>
                        <tr>
                            <td className="">Sat. </td>
                            <td className=""><span id="">{this.state.food.fatSat}</span> g &nbsp;</td>
                            <td className=""> Carb: </td>
                            <td className=""><span id="">{this.state.food.carbs}</span> g &nbsp;</td>
                        </tr>
                        <tr>
                            <td className="">Mono. </td>
                            <td className=""> <span id="">{this.state.food.fatMono}</span> g &nbsp;</td>
                            <td className="">Fiber: </td>
                            <td className=""><span id="">{this.state.food.fiber}</span> g &nbsp;</td>
                        </tr>
                        <tr>
                            <td className="">Poly.</td>
                            <td className=""><span id="">{this.state.food.fatPoly}</span> g &nbsp;</td>
                            <td className="">Sugar:</td>
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
                    <div id="" className="col-xs-12"><h3>{this.state.food.calories}</h3> calories</div>

                </div>
                <div className="modal-footer full-width" style={{clear:"both"}} onClick={this.sendIngredientToParent.bind(this)}>
                    <a className="btn btn-raised btn-success full-width" >Save ingredient</a>
                </div>
            </div>
        </div>;
        return (
            <div>
                {modal}
            </div>
        );
    }
}