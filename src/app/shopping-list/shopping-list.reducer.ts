import { Ingredient } from '../shared/ingredient.model';

const initialState = {
    Ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
};

export function shoppingListReducer(state = initialState, action) {}
