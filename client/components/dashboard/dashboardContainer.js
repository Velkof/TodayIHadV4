/**
 * Created by Marjan on 19-Jun-17.
 */
import React from "react"
import { connect } from "react-redux"

import { fetchFoods } from "../../actions/foodActions"
import {addLoggedFood, deleteLoggedFood, fetchLoggedFoods, updateLoggedFood} from "../../actions/loggedFoodActions";

import Footer from "../footer/footer";
import Header from "../header/header";
import FoodModal from "../modals/foodModal";
import DailyStats from "./dailyStats/dailyStats";
import Redirect from "react-router-dom/es/Redirect";
import moment from "moment";
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';


@connect((store) => {
    return {
        loggedFoods: store.loggedFoods.loggedFoods,
        foods: store.foods.foods,
        isAuthenticated:store.auth.isAuthenticated,
        loggedInUserId: store.auth.profile.user_id,
    };
})

export default class DashboardContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showSearchPage:false,
            showFoodModal: false,
            foodModalAction: "",
            clickedFood:{},
            search: '',
            date: moment(),
        };

        this.loggedFoodsForDay = [];
    }
    componentWillMount() {
        let _this = this;

        this.fetchLoggedFoodsForDate(this.state.date);
        this.props.dispatch(fetchFoods());
        $.material.init();
    }
    fetchLoggedFoodsForDate(date){
        let data = {
            loggedInUserId: this.props.loggedInUserId,
            date: date,
        };
        this.props.dispatch(fetchLoggedFoods(data));
    }
    handleChange = (e) => this.setState({[e.target.id]: e.target.value});
    handleClick(e) {
        let _this = this;
        let date = this.state.date;
        let dayBefore;
        let dayAfter;


        if(e && e.target && e.target.id) {
            if(e.target.id === "dayBefore") {
                dayBefore = new Date(date);
                dayBefore.setDate(dayBefore.getDate() -1);
                _this.setState({date:moment(dayBefore)});
                _this.fetchLoggedFoodsForDate(dayBefore);
            } else {
                dayAfter = new Date(date);
                dayAfter.setDate(dayAfter.getDate() + 1);
                _this.setState({date:moment(dayAfter)});
                _this.fetchLoggedFoodsForDate(dayAfter);
            }
        } else {
            let showSearchPage = !this.state.showSearchPage;
            this.setState({showSearchPage:showSearchPage});
        }

    }
    getFood(data){

        let addedBy;

        if(data.action === "deleteLoggedFood") {
            this.props.dispatch(deleteLoggedFood(data.food));
        } else if (data.action === "updateLoggedFood") {
            this.props.dispatch(updateLoggedFood(data.food));
        } else {
            data.food.addedBy = this.props.loggedInUserId;
            this.props.dispatch(addLoggedFood(data.food));
        }

        this.setState({showFoodModal:false, showSearchPage:false, search:""});
    }
    clickedFood(food) {
        this.setState({clickedFood: food, showFoodModal:true, foodModalAction:"logFood"});
    }
    clickedLoggedFood(food){
        this.setState({clickedFood: food, showFoodModal:true, foodModalAction:"updateLoggedFood"});
    }
    closeModal(){
        if( this.state.foodModalAction === "updateLoggedFood"  || this.state.foodModalAction === "deleteLoggedFood") {
            this.setState({showFoodModal:false, showSearchPage:false, });

        } else {
            this.setState({showFoodModal:false, showSearchPage:true});
        }
    }
    updateSearch(e) {
        this.setState({
            search: e.target.value
        })
    }
    toggleCalendar (e) {
        e && e.preventDefault()
        this.setState({isOpen: !this.state.isOpen})
    }
    handleSelect(date) {
        this.setState({date: date});
        this.fetchLoggedFoodsForDate(date);
        this.toggleCalendar();
    }
    render() {
        const {foods, loggedFoods, isAuthenticated} = this.props;

        if(!isAuthenticated){
            return <Redirect to='/homepage'/>;
        }

        let _this = this;
        let mappedFoods = [];
        let filteredFoods;
        let mappedLoggedFoods = [];
        let dailyStats;
        let foodModal;

        if(foods !== null) {
            filteredFoods = foods.filter(
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
        }


        if (loggedFoods.length > 0) {
            mappedLoggedFoods = loggedFoods.map(food =>
                        <div className="container-mob-child cursor-pointer" key={food._id} onClick={this.clickedLoggedFood.bind(this, food)}>
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


        }

        dailyStats = <DailyStats
            loggedFoods = {loggedFoods}
        />;

        if (this.state.showFoodModal) {
            foodModal = <FoodModal
                food = {this.state.clickedFood}
                sendData={this.getFood.bind(this)}
                closeModal = {this.closeModal.bind(this)}
                action = {this.state.foodModalAction}
            />;
        }

        return (
            <div className="main-layout">


                { this.state.showSearchPage ? (
                    <div>
                        <Header
                            mainComponent = "dashboard"
                            backToDashboard = {this.handleClick.bind(this)}
                        />
                        <div className="container-mob" style={{overflow:'hidden'}}>
                            <div id="searchAddRecipe" className="searchBar form-group has-feedback mt-1">
                                <input type="text" autoFocus  value={this.state.search || ''} onChange={this.updateSearch.bind(this)} placeholder="Search for food"/>
                                <i className="glyphicon glyphicon-search form-control-feedback"></i>
                            </div>
                            <div className="container-mob-child">
                                <div className="bg-c-white">
                                    <ul className="pl-0">{mappedFoods}</ul>
                                </div>
                            </div>
                    </div>
                        {foodModal}
                    </div>
                ) : (
                    <div>
                        <Header/>
                        <div className="container-mob">

                            <div id="searchFoods" className="searchBar form-group mt-1 pb-0" onClick={this.handleClick.bind(this)}>
                                <input type="text" value=""  placeholder="Search for food"/>
                                <i className="glyphicon glyphicon-search form-control-feedback"></i>
                            </div>

                            {dailyStats}

                            <div className="c-grey mt-1 f-size-1_5 pl-0_5">
                                <p>FOOD LOG</p>
                            </div>
                            <div className="col-xs-12 px-0 my-1">
                                <div className="col-xs-3 px-0 f-size-2 cursor-pointer" style={{textAlign:"center", WebkitTextStroke: "2px white"}} onClick={this.handleClick.bind(this)}>
                                    <div className="bg-c-white c-green">
                                        <span id="dayBefore" className="lh-2 glyphicon glyphicon-chevron-left  full-width"></span>
                                    </div>
                                </div>

                                <div className="col-xs-6 f-size-2 cursor-pointer" style={{textAlign:"center",}}>

                                    <div className="bg-c-white px-0 c-green example-custom-input"
                                         onClick={this.toggleCalendar.bind(this)}>
                                        <span className="lh-2">{moment(this.state.date).format("DD/MM/YYYY")}</span>
                                    </div>
                                    {
                                        this.state.isOpen && (
                                            <DatePicker
                                                selected={this.state.date}
                                                onSelect={this.handleSelect.bind(this)}
                                                withPortal
                                                inline  dropdownMode=""/>
                                        )
                                    }

                                </div>
                                <div className="col-xs-3 px-0 f-size-2 cursor-pointer" style={{textAlign:"center",  WebkitTextStroke: "2px white"}} onClick={this.handleClick.bind(this)}>
                                    <div className="bg-c-white c-green">
                                        <span id="dayAfter" className="lh-2 glyphicon glyphicon-chevron-right full-width"></span>
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