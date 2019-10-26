import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css'],
})
export class HeaderComponent {
    // @Output() buttonClicked = new EventEmitter<{ buttonType: string }>();
    @Output() feature = new EventEmitter<string>();

    loadRecipe(): void {
        // this.buttonClicked.emit({ buttonType: 'RECIPE' });
    }

    loadShoppingList(): void {
        // this.buttonClicked.emit({ buttonType: 'SHOPPING' });
    }

    featureSelected(feature: string): void {
        this.feature.emit(feature);
    }
}
