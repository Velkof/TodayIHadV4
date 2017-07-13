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

export default class SetIngredientAmountModal extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.state = {
            toggle: true,
            name: "",
        };

        console.log("prooooooooooops", this.props);
    }
    componentDidMount(){
        $.material.init();
    }
    handleChange(e){

    }
    toggle(e) {
        this.setState(prevState => ({
            toggle: !prevState.toggle
        }));
    }
    render() {
        let unitsArray = [];
        this.props.food.units.forEach(function (unit) {
            unitsArray.push(<option key={unitsArray.length} defaultValue={unit.amountInGrams}>{unit.name}</option>);
        });
        const modal = <div className="modal modal-backdrop mr-1" style={this.state.toggle ? display : hide}>
            <div id="recipeIngredientsModal" className="modal-content">
                <div className="modal-header">
                    <button type="button" className="closeBtn" onClick={this.toggle}>&times;</button>
                    <h4 className="modal-title"></h4>
                </div>
                <div className="modal-body">
                    <div className="col-xs-5 form-group required label-floating pl-0">
                        <label className="control-label">Amount</label>
                        <input id="amount" type="number" value={this.props.food.amount  || ''} onChange={this.handleChange.bind(this)} className="form-control"/>
                    </div>
                    <div className="col-xs-5 form-group required label-floating pl-0">
                        <label className="control-label">Select Unit</label>
                        <select id="unit" value={this.props.food.unit  || ''} onChange={this.handleChange.bind(this)} className="form-control">
                            {unitsArray}
                        </select>
                    </div>
                    <table className="col-xs-12 f-size-1_7" id="">
                        <tbody><tr><th>Info</th></tr>
                        <tr>
                            <td className="">Fat: </td>
                            <td className=""><span id="">{this.props.food.fat}</span> g &nbsp;</td>
                            <td className=""> Prot: </td>
                            <td className=""><span id="">{this.props.food.protein}</span> g &nbsp;</td>
                        </tr>
                        <tr>
                            <td className="">Sat. </td>
                            <td className=""><span id="">{this.props.food.fatSat}</span> g &nbsp;</td>
                            <td className=""> Carb: </td>
                            <td className=""><span id="">{this.props.food.carbs}</span> g &nbsp;</td>
                        </tr>
                        <tr>
                            <td className="">Mono. </td>
                            <td className=""> <span id="">{this.props.food.fatMono}</span> g &nbsp;</td>
                            <td className="">Fiber: </td>
                            <td className=""><span id="">{this.props.food.fiber}</span> g &nbsp;</td>
                        </tr>
                        <tr>
                            <td className="">Poly.</td>
                            <td className=""><span id="">{this.props.food.fatPoly}</span> g &nbsp;</td>
                            <td className="">Sugar:</td>
                            <td className=""><span id="">{this.props.food.sugar}</span> g &nbsp;</td>
                        </tr>
                        <tr>
                            <td className="">Choles:</td>
                            <td className=""><span id="">{this.props.food.cholesterol}</span> mg</td>
                            <td className="">Sodium:</td>
                            <td className=""><span id="">{this.props.food.sodium}</span> mg</td>
                        </tr>
                        </tbody>
                    </table>
                    <div id="" className="col-xs-12"><h3>{this.props.food.calories}</h3> calories</div>

                </div>
                <div className="modal-footer full-width" style={{clear:"both"}}>
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