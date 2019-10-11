import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
    @ViewChild('inputName', { static: true }) name: ElementRef;
    @ViewChild('inputAmount', { static: true }) amount: ElementRef;
    @Output() itemAdded = new EventEmitter<Ingredient>();

    constructor() {}

    ngOnInit() {}

    addItem(): void {
        const name = this.name.nativeElement.value;
        const amount = this.amount.nativeElement.value;
        const ingredient = new Ingredient(name, amount);
        this.itemAdded.emit(ingredient);
    }

    addItemWay2(name: ElementRef, amount: ElementRef): void {
        const inname = this.name.nativeElement.value;
        const inamount = this.amount.nativeElement.value;
        const ingredient = new Ingredient(inname, inamount);
        this.itemAdded.emit(ingredient);
    }
}
