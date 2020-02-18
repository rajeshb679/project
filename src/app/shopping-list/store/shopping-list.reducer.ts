import { Ingredient } from '../../shared/ingredient.model';
// import { Action } from '@ngrx/store';
// import { ADD_INGREDIENT } from './shopping-list.actions';

import * as ShoppingListActins from './shopping-list.actions';

export interface State {
    Ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

// export interface AppState {
//     shoppingList: State;
// }

const initialState: State = {
    Ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
    editedIngredient: null,
    editedIngredientIndex: -1,
};

export function shoppingListReducer(state: State = initialState, action: ShoppingListActins.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActins.ADD_INGREDIENT:
            return {
                ...state,
                Ingredients: [...state.Ingredients, action.payLoad],
            };
        case ShoppingListActins.ADD_INGREDIENTS:
            return {
                ...state,
                Ingredients: [...state.Ingredients, ...action.payLoad],
            };
        case ShoppingListActins.UPDATE_INGREDIENT:
            const ingredient = state.Ingredients[action.payLoad.index];
            const updatedIngredient = {
                ...ingredient,
                ...action.payLoad.ingredient,
            };

            const updatedIngredients = [...state.Ingredients];
            updatedIngredients[action.payLoad.index] = updatedIngredient;
            return {
                ...state,
                Ingredients: updatedIngredients,
            };
        case ShoppingListActins.DELETE_INGREDIENT:
            // const deleteIngredients = [...state.Ingredients];
            // deleteIngredients.slice(action.payLoad.index, 1);
            return {
                ...state,
                // Ingredients: deleteIngredients,
                Ingredients: state.Ingredients.filter((element, index) => {
                    return index !== action.payLoad.index;
                }),
            };
        case ShoppingListActins.START_EDIT:
            return {
                ...state,
                editedIngredient: { ...state.Ingredients[action.payLoad] },
                editedIngredientIndex: action.payLoad,
            };
        case ShoppingListActins.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1,
            };
        default:
            return { ...state };
    }
}
