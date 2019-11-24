import { Injectable } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService) {}
    stroeRecipes(): void {
        const recipes = this.recipeService.getRecipes();
        this.http
            .put('https://ng-course-project-recipes.firebaseio.com/recipes.json', recipes)
            .subscribe(responseData => {
                console.log(responseData);
            });
    }
}
