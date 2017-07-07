/**
 * Created by Marjan on 19-Jun-17.
 */

import React from "react";
import {Link} from "react-router-dom";

export default class Foods extends React.Component {
    render() {

        const mappedFoods = this.props.foods.map(food =>
            <div className="container-mob-child" key={food._id}>
                {food.name}
                <Link to={'/foods/edit/'+ food._id}>    Edit food     </Link>
                <Link to={'/foods/view/'+ food._id}>    View food     </Link>
                <Link to={'/foods/delete/'+ food._id}>  Delete food   </Link>
            </div>);

        return (
            <div>
                <div className="c-grey mt-1 f-size-1_5 pl-0_5">
                    <p>MY FOODS AND RECIPES</p>
                </div>
                <ul className="pl-0">{mappedFoods}</ul>
            </div>
        )
    }
}