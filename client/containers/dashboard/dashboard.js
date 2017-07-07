/**
 * Created by Marjan on 19-Jun-17.
 */
import React from "react"
import { connect } from "react-redux"

import { fetchUser } from "../../actions/userActions"
import { fetchFoods } from "../../actions/foodActions"
import Footer from "../../components/footer/footer";


@connect((store) => {
    return {
        foods: store.foods.foods,
    };
})

export default class Dashboard extends React.Component {
    componentWillMount() {
        this.props.dispatch(fetchUser())
    }

    fetchFoods() {
        this.props.dispatch(fetchFoods());
    }

    render() {
        return (
            <div className="main-layout">
                <a id="searchBtn" href="javascript:void(0)" className="btn btn-fab btn-success">
                    <i className="material-icons glyphicon glyphicon-search"></i>
                </a>
                <div className="container-mob">
                    <div className="container-mob-child">
                        <span className="f-size-2">DASHSOARSFFRSDDF</span>


                        <div className="line-in-middle"></div>
                        <div className="divlevel1 c-white">
                            <div className="divlevel2 c-white  f-size-11">
                                <div className="divlevel3 c-white  f-size-11">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}