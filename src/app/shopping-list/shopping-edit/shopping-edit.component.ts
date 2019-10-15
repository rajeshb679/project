import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from 'src/app/services/shopping.service';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
    @ViewChild('inputName', { static: true }) name: ElementRef;
    @ViewChild('inputAmount', { static: true }) amount: ElementRef;

    constructor(private shoppingService: ShoppingService) {}

    ngOnInit() {}

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
}
