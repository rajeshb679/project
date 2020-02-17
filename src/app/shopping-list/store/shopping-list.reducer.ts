import { Ingredient } from '../../shared/ingredient.model';
// import { Action } from '@ngrx/store';
// import { ADD_INGREDIENT } from './shopping-list.actions';

import * as ShoppingListActins from './shopping-list.actions';

const initialState = {
    Ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
};

export function shoppingListReducer(state = initialState, action: ShoppingListActins.AddIngredient) {
    switch (action.type) {
        case ShoppingListActins.ADD_INGREDIENT:
            return {
                ...state,
                ingredient: [...state.Ingredients, action.payLoad],
            };
    }
}
