import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from 'src/app/services/shopping.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AddIngredient, UpdateIngredient, DeleteIngredient } from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
    @ViewChild('inputName', { static: true }) name: ElementRef;
    @ViewChild('inputAmount', { static: true }) amount: ElementRef;
    @ViewChild('f', { static: true }) itemForm: NgForm;
    Subscription: Subscription;
    editMode = false;
    editedItemIndex: number;
    editIngredient: Ingredient;

    constructor(private shoppingService: ShoppingService, private store: Store<fromShoppingList.AppState>) {}

    ngOnInit(): void {
        this.shoppingService.editItemEvent.subscribe(index => {
            this.editMode = true;
            this.editedItemIndex = index;
            this.editIngredient = this.shoppingService.getIngredient(index);
            this.itemForm.setValue({
                name: this.editIngredient.name,
                amount: this.editIngredient.amount,
            });
        });
    }

    addItem(): void {
        const name = this.name.nativeElement.value;
        const amount = this.amount.nativeElement.value;
        const ingredient = new Ingredient(name, amount);
        // this.itemAdded.emit(ingredient);
    }

    addItemWay2(name: ElementRef, amount: ElementRef): void {
        const inname = this.name.nativeElement.value;
        const inamount = this.amount.nativeElement.value;
        const ingredient = new Ingredient(inname, inamount);
        this.shoppingService.addItem(ingredient);
    }

    addItemWay3(form: NgForm): void {
        const value = form.value;
        const ingredient = new Ingredient(value.name, value.amount);
        if (this.editMode) {
            // this.shoppingService.updateItem(this.editedItemIndex, ingredient);
            this.store.dispatch(new UpdateIngredient({ index: this.editedItemIndex, ingredient: ingredient }));
        } else {
            // this.shoppingService.addItem(ingredient);
            this.store.dispatch(new AddIngredient(ingredient));
            console.log(new AddIngredient(ingredient));
        }
        this.editMode = false;
        this.itemForm.reset();
    }

    clear(): void {
        this.itemForm.reset();
        this.editMode = false;
    }

    deleteItem(): void {
        // this.shoppingService.deleteItem(this.editedItemIndex);
        this.store.dispatch(new DeleteIngredient({ index: this.editedItemIndex }));
        this.clear();
    }
}
