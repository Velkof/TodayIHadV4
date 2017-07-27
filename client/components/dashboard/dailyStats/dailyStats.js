/**
 * Created by Marjan on 25-Jul-17.
 */
import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';


class DailyStats extends Component {
    constructor(props){
        super(props);
    }
    render() {
        let _this = this;

        let totalFat = 0;
        let totalProtein = 0;
        let totalCarbs = 0;
        let totalCalories = 0;

        if(this.props.loggedFoods.length > 0) {
            _this.props.loggedFoods.forEach(function (food) {
                    totalCarbs += food.carbs;
                    totalProtein += food.protein;
                    totalFat += food.fat;
                    totalCalories += food.calories;
                });
        }

        totalCarbs = Math.round(totalCarbs);
        totalProtein = Math.round(totalProtein);
        totalFat = Math.round(totalFat);
        totalCalories = Math.round(totalCalories);

        let labelFat = "Fat: " + totalFat;
        let labelProtein = "Prot: " + totalProtein;
        let labelCarbs = "Carbs: " + totalCarbs;


        const data = {
            labels: [
                labelFat,
                labelProtein,
                labelCarbs
            ],
            datasets: [{
                data: [totalFat, totalProtein, totalCarbs],
                backgroundColor: [
                    'blue',
                    'green',
                    '#FFCE56'
                ],
                hoverBackgroundColor: [
                    'blue',
                    'green',
                    '#FFCE56'
                ]
            }]
        };
        return (
            <div className="container-mob-child px-0">
                <Doughnut
                    data={data}
                />
                <div style={{textAlign:"center"}}>
                    <h3 className="my-0_5">{totalCalories} calories</h3>
                </div>
            </div>
        );
    };
}

export default DailyStats;