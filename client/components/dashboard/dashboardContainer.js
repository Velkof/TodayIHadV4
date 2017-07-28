/**
 * Created by Marjan on 19-Jun-17.
 */
import React from "react"
import { connect } from "react-redux"

import { fetchUser } from "../../actions/userActions"
import { fetchFoods } from "../../actions/foodActions"
import Footer from "../footer/footer";
import DashboardNavBar from "./dashboardNavBar/dashboardNavBar";
import {addLoggedFood, fetchLoggedFoods} from "../../actions/loggedFoodActions";
import FoodModal from "../modals/foodModal";
import DailyStats from "./dailyStats/dailyStats";


@connect((store) => {
    return {
        loggedFoods: store.loggedFoods.loggedFoods,
        foods: store.foods.foods,
    };
})

export default class DashboardContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showSearchPage:false,
            showFoodModal: false,
            clickedFood:{},
            search: '',
        };

        this.loggedFoodsForDay = [];
    }
    componentWillMount() {
        this.props.dispatch(fetchUser());
        this.props.dispatch(fetchLoggedFoods());
        this.props.dispatch(fetchFoods());
        $.material.init();
    }
    handleChange = (e) => this.setState({[e.target.id]: e.target.value});
    handleClick(e) {
        let showSearchPage = !this.state.showSearchPage;
        this.setState({showSearchPage:showSearchPage});
    }
    getFood(food){
        this.setState({showFoodModal:false, showSearchPage:false,});
        this.props.dispatch(addLoggedFood(food));

    }
    clickedFood(food) {
        this.setState({clickedFood: food, showFoodModal:true});
    }
    clickedLoggedFood(food){
        this.setState({clickedFood: food, showFoodModal:true});
    }
    closeModal(){
        this.setState({showFoodModal:false, showSearchPage:true});
    }
    updateSearch(e) {
        this.setState({
            search: e.target.value
        })
    }
    render() {
        const {foods, loggedFoods} = this.props;

        let _this = this;
        let mappedFoods = [];
        let mappedLoggedFoods = [];
        let dailyStats;
        let foodModal;

        let filteredFoods = foods.filter(
            (food) => {
                return food.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );

        if (filteredFoods.length > 0) {
            mappedFoods = filteredFoods.map(food =>
                <div className="container-mob-child" key={food._id} onClick={this.clickedFood.bind(this, food)}>
                    <div className="foodItem">
                        <div className="col-xs-12 px-0">
                            <span className="f-size-2 c-orange">{food.name}</span>
                            <div className="mt-0_5 mb-0_5">Calories: {food.calories} | Fat: {food.fat} | Carbs: {food.carbs} | Protein: {food.protein}</div>
                        </div>
                    </div>
                </div>);
        } else {
            mappedFoods = <p>No foods with that name</p>;
        }

        if (loggedFoods.length > 0) {
            mappedLoggedFoods = loggedFoods.map(food =>
                        <div className="container-mob-child" key={food._id} onClick={this.clickedLoggedFood.bind(this, food)}>
                            <div className="foodItem">
                                <div className="col-xs-10 px-0">
                                    <span className="f-size-2 c-green">{food.name}</span>
                                    <div className="mt-0_5 mb-0_5">Calories: {food.calories} | Fat: {food.fat} | Carbs: {food.carbs} | Protein: {food.protein}</div>
                                </div>
                                <div className="col-xs-2 lh-1 px-0">
                                    <span className="glyphicon glyphicon-pencil f-size-1_5 lh-3 c-grey-light" style={{float:"right"}}></span>
                                </div>
                            </div>
                        </div>);

            dailyStats = <DailyStats
                loggedFoods = {loggedFoods}
            />;
        }

        if (this.state.showFoodModal) {
            foodModal = <FoodModal
                food = {this.state.clickedFood}
                sendData={this.getFood.bind(this)}
                closeModal = {this.closeModal.bind(this)}
                calledFrom = "dashboard"
            />;
        }

        return (
            <div className="main-layout">
                { this.state.showSearchPage ? (
                    <div className="container-mob" style={{overflow:'hidden'}}>
                        <div className="px-0">
                            <div className="btn btn-default pl-0 f-size-1_5" onClick={this.handleClick.bind(this)}>
                                <span className="glyphicon glyphicon-chevron-left" style={{lineHeight:"1.2em"}}></span>
                                <span>dashboard</span>
                            </div>
                        </div>
                        <div id="searchAddRecipe" className="searchBar form-group has-feedback mt-1">
                            <input type="text" autoFocus  value={this.state.search || ''} onChange={this.updateSearch.bind(this)} placeholder="Search foods"/>
                            <i className="glyphicon glyphicon-search form-control-feedback"></i>
                        </div>
                        <div className="container-mob-child">
                            <div className="bg-c-white">
                                <ul className="pl-0">{mappedFoods}</ul>
                            </div>
                        </div>
                        {foodModal}
                    </div>
                ) : (
                    <div>
                        <div className="container-mob">

                            <div id="searchFoods" className="searchBar form-group has-feedback mt-1 pb-0">
                                <input type="text" onClick={this.handleClick.bind(this)} placeholder="Search food"/>
                                <i className="glyphicon glyphicon-search form-control-feedback"></i>
                            </div>

                            {dailyStats}
                            <div className="c-grey mt-1 f-size-1_5 pl-0_5">
                                <p>FOOD LOG</p>
                            </div>
                            <div className="col-xs-12 px-0 my-1">
                                <div className="col-xs-3 px-0 f-size-2" style={{textAlign:"center", WebkitTextStroke: "2px white"}}>
                                    <div className="bg-c-white c-green">
                                        <span className="lh-2 glyphicon glyphicon-chevron-left"></span>
                                    </div>
                                </div>
                                <div className="col-xs-6 f-size-2" style={{textAlign:"center",}}>
                                    <div className="bg-c-white px-0 c-green">
                                        <span className="lh-2">12.07.2017</span>
                                    </div>
                                </div>
                                <div className="col-xs-3 px-0 f-size-2" style={{textAlign:"center",  WebkitTextStroke: "2px white"}}>
                                    <div className="bg-c-white c-green">
                                        <span className="lh-2 glyphicon glyphicon-chevron-right"></span>
                                    </div>
                                </div>
                            </div>


                            {mappedLoggedFoods}
                            {foodModal}
                            <br/>
                        </div>
                    </div>
                )}
                <Footer/>
            </div>
        )
    }
}