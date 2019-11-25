import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { Observable } from 'rxjs';
import { RecipeService } from '../services/recipe.service';

@Injectable({
    providedIn: 'root',
})
export class RecipesResovlerService implements Resolve<Recipe[]> {
    constructor(private recipesDataStorageService: DataStorageService, private recipeService: RecipeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> {
        const recipes = this.recipeService.getRecipes();
        if (recipes.length === 0) {
            return this.recipesDataStorageService.fetchRecipes();
        }
    }
}
