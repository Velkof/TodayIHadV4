/**
 * Created by Marjan on 19-Jun-17.
 */
// import React from "react"
// import { connect } from "react-redux"
//
// import { fetchUser } from "../../actions/userActions"
// import Test from '../../components/test/test';
//
//
// @connect((store) => {
//     return {
//         user: store.user.user,
//         userFetched: store.user.fetched,
//     };
// })
//
// export default class FoodContainer extends React.Component {
//     componentWillMount() {
//         this.props.dispatch(fetchUser())
//     }
//
//
//     render() {
//         const { user } = this.props;
//         return(
//             <div>
//                 <h1>{user.name}</h1>
//                 <Test/>
//             </div>
//         );
//     }
// }

import React from "react"
import { connect } from "react-redux"

import { fetchUser } from "../../actions/userActions"
import { fetchFoods } from "../../actions/foodActions"


@connect((store) => {
    return {
        foods: store.foods.foods,
    };
})

export default class FoodContainer extends React.Component {
    componentWillMount() {
        this.props.dispatch(fetchUser());
    }

    fetchFoods() {
        this.props.dispatch(fetchFoods());
    }

    render() {
        const {  foods } = this.props;


        if (!foods.length) {
            return (
                <div>
                    <h1>FOODS</h1>
                    <button onClick={this.fetchFoods.bind(this)}>load foods</button>
                </div>
            );
        }

        const mappedFoods = foods.map(food => <li key={food._id}>{food.name}</li>);

        return <div>
            <h1>FOODS</h1>

            <ul>{mappedFoods}</ul>
        </div>
    }
}