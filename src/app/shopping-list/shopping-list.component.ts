import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../services/shopping.service';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
    Ingredients: Ingredient[];

    constructor(private shoppingService: ShoppingService) {}

    ngOnInit(): void {
        this.Ingredients = this.shoppingService.getIngredients();
        this.shoppingService.addItemEvent.subscribe(() => {
            this.Ingredients = this.shoppingService.getIngredients();
        });
    }
}
