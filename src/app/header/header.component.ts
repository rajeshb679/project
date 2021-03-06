import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Subscription } from 'rxjs';

import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { LOGOUT } from '../auth/store/auth.actions';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated = false;
    private userSub: Subscription;
    // @Output() buttonClicked = new EventEmitter<{ buttonType: string }>();
    // @Output() feature = new EventEmitter<string>();
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private dataStorageService: DataStorageService,
        private authService: AuthService,
        private store: Store<fromApp.AppState>
    ) {}

    ngOnInit(): void {
        // this.userSub = this.authService.user.subscribe((user: User) => {
        this.userSub = this.store
            .select('auth')
            .pipe(
                map(authState => {
                    return authState.user;
                })
            )
            .subscribe((user: User) => {
                this.isAuthenticated = !!user;
                console.log(user);
                console.log(!!user);
                console.log(!user);
            });
    }

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
        this.dataStorageService.fetchRecipes().subscribe();
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }

    onLogout(): void {
        // this.authService.logout();
        this.store.dispatch({ type: LOGOUT });
        this.router.navigate(['/login']);
    }
}
