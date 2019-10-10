import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css'],
})
export class HeaderComponent {
    @Output() buttonClicked = new EventEmitter<{ buttonType: string }>();
    loadRecipe(): void {
        this.buttonClicked.emit({ buttonType: 'RECIPE' });
    }

    loadShoppingList(): void {
        this.buttonClicked.emit({ buttonType: 'SHOPPING' });
    }
}
