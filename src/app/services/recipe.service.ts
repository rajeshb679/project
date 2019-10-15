import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';

@Injectable({
    providedIn: 'root',
})
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();
    private recipes: Recipe[] = [
        new Recipe(
            'A Test Recipe',
            'This is simply',
            'https://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/mrtrending0475.jpg?itok=ULkGk3Pn',
            [new Ingredient('Meat', 20), new Ingredient('Bread', 20)]
        ),
    ];
    constructor(private shoppingService: ShoppingService) {}

    getRecipes(): Recipe[] {
        return this.recipes.slice();
    }

    addIngredients(ingredients: Ingredient[]): void {
        this.shoppingService.addItems(ingredients);
    }
}
