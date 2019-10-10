import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    title = 'project';
    loadRecipe = false;
    loadShopping = false;
    loadComponent(buttonAction: { buttonType: string }): void {
        if (buttonAction.buttonType === 'RECIPE') {
            this.loadRecipe = true;
            this.loadShopping = false;
        } else {
            this.loadRecipe = false;
            this.loadShopping = true;
        }
    }
}
