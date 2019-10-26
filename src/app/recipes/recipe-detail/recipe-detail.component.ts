import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingService } from 'src/app/services/shopping.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { Router, ActivatedRouteSnapshot, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
    // @Input() recipe: Recipe;
    recipe: Recipe;
    id = 0;
    // constructor(private shoppingService: ShoppingService) {}
    constructor(private recipeService: RecipeService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params.subscribe((param: Params) => {
            this.id = +param['id'];
            this.recipe = this.recipeService.getRecipesById(this.id);
        });
    }

    // sendToShoppingList(): void {
    //     this.recipe.ingredient.forEach(ingredient => {
    //         this.shoppingService.addItem(ingredient);
    //     });
    // }

    // sendToShoppingList(): void {
    //     this.recipeService.addIngredients(this.recipe.ingredient);
    // }
}
