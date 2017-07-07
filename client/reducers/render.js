/**
 * Created by Marjan on 07-Jul-17.
 */
export default function reducer(state={
    showFoodsNavBar: true,
    showAddRecipe: false,
    showAddFood: false,
    showFoods: true,
}, action) {
    switch (action.type) {
        case "SHOW_FOODS": {
            return {
                ...state,
                showFoodsNavBar: true,
                showAddRecipe: false,
                showAddFood: false,
                showFoods: true,
            };
        }
        case "SHOW_ADD_FOOD": {
            return {
                ...state,
                showFoodsNavBar: true,
                showAddRecipe: false,
                showAddFood: true,
                showFoods: false,
            };
        }
        case "SHOW_ADD_RECIPE":{
            return {
                ...state,
                showFoodsNavBar: true,
                showAddRecipe: true,
                showAddFood: false,
                showFoods: false,
            }
        }
        default:
            return state
    }
}
