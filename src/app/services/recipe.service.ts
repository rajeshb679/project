import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';

@Injectable({
    providedIn: 'root',
})
export class RecipeService {
    private recipes: Recipe[] = [
        new Recipe(
            'A Test Recipe',
            'This is simply',
            'https://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/mrtrending0475.jpg?itok=ULkGk3Pn'
        ),
    ];
    constructor() {}

    getRecipes(): Recipe[] {
        return this.recipes.slice();
    }
}
