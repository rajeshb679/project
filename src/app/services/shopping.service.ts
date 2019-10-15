import { Injectable, EventEmitter } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
@Injectable({
    providedIn: 'root',
})
export class ShoppingService {
    addItemEvent = new EventEmitter<any>();
    private Ingredients: Ingredient[] = [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)];

    constructor() {}

    addItem(ingredient: Ingredient): void {
        this.Ingredients.push(ingredient);
        this.addItemEvent.emit();
    }

    getIngredients(): Ingredient[] {
        return this.Ingredients.slice();
    }

    addItems(ingredient: Ingredient[]): void {
        this.Ingredients.push(...ingredient);
        this.addItemEvent.emit();
    }
}
