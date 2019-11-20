import { Injectable, EventEmitter } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
@Injectable({
    providedIn: 'root',
})
export class ShoppingService {
    // addItemEvent = new EventEmitter<any>();
    addItemEvent = new Subject<any>();
    editItemEvent = new Subject<number>();
    private Ingredients: Ingredient[] = [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)];

    constructor() {}

    addItem(ingredient: Ingredient): void {
        this.Ingredients.push(ingredient);
        // this.addItemEvent.emit();
        this.addItemEvent.next();
    }

    getIngredients(): Ingredient[] {
        return this.Ingredients.slice();
    }

    getIngredient(index: number): Ingredient {
        return this.Ingredients[index];
    }

    updateItem(index: number, item: Ingredient): void {
        this.Ingredients[index] = item;
        this.addItemEvent.next();
    }

    addItems(ingredient: Ingredient[]): void {
        this.Ingredients.push(...ingredient);
        // this.addItemEvent.emit();
        this.addItemEvent.next();
    }
}
