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

        totalCalories = Math.round(totalCalories);

        const data = {
            labels: [
                'Fat',
                'Protein',
                'Carbs'
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
            <div className="container-mob-child">
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