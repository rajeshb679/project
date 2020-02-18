import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import * as ShoppingListActins from '../shopping-list/store/shopping-list.actions';
// import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromApp from '../store/app.reducer';

@Injectable({
    providedIn: 'root',
})
export class RecipeService {
    recipesChange = new Subject<Recipe[]>();
    recipeSelected = new EventEmitter<Recipe>();
    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'A Test Recipe',
    //         'This is simply',
    //         'https://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/mrtrending0475.jpg?itok=ULkGk3Pn',
    //         [new Ingredient('Meat', 20), new Ingredient('Bread', 20)]
    //     ),
    //     new Recipe(
    //         'Recipe Two',
    //         'This is simply',
    //         'https://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/mrtrending0475.jpg?itok=ULkGk3Pn',
    //         [new Ingredient('chicken', 20), new Ingredient('fish', 20)]
    //     ),
    // ];

    private recipes: Recipe[] = [];

    constructor(private shoppingService: ShoppingService, private store: Store<fromApp.AppState>) {}

    getRecipes(): Recipe[] {
        return this.recipes.slice();
    }

    setRecipes(recipes: Recipe[]): void {
        this.recipes = recipes;
        this.recipesChange.next(this.recipes.slice());
    }
    getRecipesById(id: number): Recipe {
        return this.recipes[id];
    }

    addIngredients(ingredients: Ingredient[]): void {
        // this.shoppingService.addItems(ingredients);
        this.store.dispatch(new ShoppingListActins.AddIngredients(ingredients));
    }

    addRecipe(recipe: Recipe): void {
        this.recipes.push(recipe);
        this.recipesChange.next(this.recipes.slice());
    }

    updateRecipe(index: number, recipe: Recipe): void {
        this.recipes[index] = recipe;
        console.log(this.recipes);
        this.recipesChange.next(this.recipes.slice());
    }

    deleteRecipe(index: number): void {
        this.recipes.splice(index, 1);
        this.recipesChange.next(this.recipes.slice());
    }
}
