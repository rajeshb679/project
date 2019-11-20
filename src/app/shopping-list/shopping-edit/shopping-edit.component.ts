import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from 'src/app/services/shopping.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

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

    constructor(private shoppingService: ShoppingService) {}

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
            this.shoppingService.updateItem(this.editedItemIndex, ingredient);
        } else {
            this.shoppingService.addItem(ingredient);
        }
    }
}
