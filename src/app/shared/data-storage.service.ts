import { Injectable } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';

import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

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

    fetchRecipes(): Observable<Recipe[]> {
        return this.http.get<Recipe[]>('https://ng-course-project-recipes.firebaseio.com/recipes.json').pipe(
            map(recipes => {
                return recipes.map(recipe => {
                    console.log({ ...recipe });
                    return { ...recipe, ingredient: recipe.ingredient ? recipe.ingredient : [] };
                });
            }),
            tap(responseData => {
                this.recipeService.setRecipes(responseData);
            })
        );
        // .subscribe(responseData => {
        //     // this.recipeService.addRecipe(responseData.body);
        //     console.log(responseData);
        //     this.recipeService.setRecipes(responseData);
        //     // responseData.forEach((index, recipe) => {
        //     //     this.recipeService.addRecipe(recipe);
        //     // });
        // });
    }
}
