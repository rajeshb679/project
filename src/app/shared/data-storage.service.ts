import { Injectable } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';

import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipes.actions';

@Injectable({
    providedIn: 'root',
})
export class DataStorageService {
    constructor(
        private http: HttpClient,
        private recipeService: RecipeService,
        private store: Store<fromApp.AppState>
    ) {}
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
                // this.recipeService.setRecipes(responseData);
                this.store.dispatch(new RecipesActions.SetRecipes(responseData));
            })
        );

        /*
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
        */

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
