import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../services/shopping.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    Ingredients: Ingredient[];
    private addItemSubscription: Subscription;
    constructor(private shoppingService: ShoppingService) {}

    ngOnInit(): void {
        this.Ingredients = this.shoppingService.getIngredients();
        this.addItemSubscription = this.shoppingService.addItemEvent.subscribe(() => {
            this.Ingredients = this.shoppingService.getIngredients();
        });
    }

    ngOnDestroy(): void {
        this.addItemSubscription.unsubscribe();
    }

    onEditItem(index: number): void {
        this.shoppingService.editItemEvent.next(index);
    }
}
