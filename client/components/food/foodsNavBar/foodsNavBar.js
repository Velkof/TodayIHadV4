/**
 * Created by Marjan on 06-Jul-17.
 */
import React, {Component} from 'react';

class FoodsNavBar extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { onAddFoodClick, onAddRecipeClick, onShowFoodsClick, render } = this.props;

        let showFoodsActive = "";
        let addFoodActive = "";
        let addRecipeActive = "";

        if(render === "showFoods") {
            showFoodsActive = "active";
            addFoodActive = "";
            addRecipeActive = "";
        } else if (render === "addRecipe") {
            showFoodsActive = "";
            addFoodActive = "";
            addRecipeActive = "active";
        } else{
            showFoodsActive = "";
            addFoodActive = "active";
            addRecipeActive = "";
        }

        return (
            <div className="container-mob-child px-0">
                <ul className="nav nav-tabs">
                    <li className="col-xs-4 nav-item" onClick={onShowFoodsClick}>
                        <a className={"nav-link " + showFoodsActive} href="javascript:void(0)">My foods </a>
                    </li>
                    <li className="col-xs-4 nav-item" onClick={onAddRecipeClick}>
                        <a className={"nav-link "  + addRecipeActive} href="javascript:void(0)">Add recipe</a>
                    </li>
                    <li className="col-xs-4 nav-item" onClick={onAddFoodClick}>
                        <a className={"nav-link " + addFoodActive} href="javascript:void(0)">Add food</a>
                    </li>
                </ul>
            </div>
        );
    };
}

export default FoodsNavBar;