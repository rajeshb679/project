import { Component, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css'],
})
export class HeaderComponent {
    // @Output() buttonClicked = new EventEmitter<{ buttonType: string }>();
    // @Output() feature = new EventEmitter<string>();
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private dataStorageService: DataStorageService
    ) {}

    loadRecipe(): void {
        // this.buttonClicked.emit({ buttonType: 'RECIPE' });
    }

    loadShoppingList(): void {
        // this.buttonClicked.emit({ buttonType: 'SHOPPING' });
    }

    featureSelected(feature: string): void {
        // this.feature.emit(feature);
        if (feature === 'Recipe') {
            this.router.navigate([`/recipes`]);
        } else {
            if (feature === 'Shopping') {
                this.router.navigate([`/shopping-list`]);
            }
        }
    }

    onSaveData(): void {
        this.dataStorageService.stroeRecipes();
    }

    onFetchData(): void {
        this.dataStorageService.fetchRecipes();
    }
}
