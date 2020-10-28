import * as actionsTypes from '../actions/actionsTypes';
import { updatedObject } from '../../shared/utility';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
} 

const intitialState = {
    ingredients: null,
    totalPrice : 4,
    error: false,
    building: false
};

const addIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
    const updatedIngredients = updatedObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients : updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    
    return updatedObject(state, updatedState);
}

const removeIngredient = (state, action) => {
    const updatedIngredientRemove = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
    const updatedIngredientsRemove = updatedObject(state.ingredients, updatedIngredientRemove);
    const updatedStateRemove = {
        ingredients : updatedIngredientsRemove,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    
    return updatedObject(state, updatedStateRemove);
}

const setIngredients = (state, action) => {
    return updatedObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat,
            bacon: action.ingredients.bacon
        },
        totalPrice: 4,
        error: false,
        building: false
    });
}

const fetchIngredientsFailed = (state, action) => {
    return updatedObject(state, {error: true})
}

const reducer = (state = intitialState, action) => {
    switch (action.type) {
        case actionsTypes.ADD_INGREDIENT : return addIngredient(state, action);           

        case actionsTypes.REMOVE_INGREDIENT : return removeIngredient(state, action); 
           
        case actionsTypes.SET_INGREDIENTS : return setIngredients(state, action);            

        case actionsTypes.FETCH_INGREDIENTS_FAILED : return fetchIngredientsFailed(state, action);
            
        default:
            return state;
    }    
};

export default reducer;