import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    constructor(private authService: AuthService) {}
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
    feature = 'Recipe';
    onNavigation(feature): void {
        this.feature = feature;
    }

    ngOnInit(): void {
        this.authService.autoLogin();
    }
}
