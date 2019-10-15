import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingService } from 'src/app/services/shopping.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
    @Input() recipe: Recipe;

    // constructor(private shoppingService: ShoppingService) {}

    ngOnInit() {}

    // sendToShoppingList(): void {
    //     this.recipe.ingredient.forEach(ingredient => {
    //         this.shoppingService.addItem(ingredient);
    //     });
    // }
    constructor(private recipeService: RecipeService) {}

    sendToShoppingList(): void {
        this.recipeService.addIngredients(this.recipe.ingredient);
    }
}
