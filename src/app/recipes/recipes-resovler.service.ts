import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RecipesResovlerService implements Resolve<Recipe[]> {
    constructor(private recipesDataStorageService: DataStorageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> {
        return this.recipesDataStorageService.fetchRecipes();
    }
}
