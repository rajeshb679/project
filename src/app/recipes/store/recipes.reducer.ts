import { Recipe } from '../recipe.model';
import * as RecipesActions from './recipes.actions';

export interface State {
    recipies: Recipe[];
}

const initialState: State = {
    recipies: [],
};

export function recipiesReducer(state = initialState, actions: RecipesActions.RecipesActions) {
    switch (actions.type) {
        case RecipesActions.SET_RECIPES:
            return {
                ...state,
                recipies: [...actions.payload],
            };
        default:
            return { ...state };
    }
}
