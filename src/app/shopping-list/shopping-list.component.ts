import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../services/shopping.service';
import { Subscription, Observable } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Store } from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducer';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    Ingredients: Observable<{ Ingredients: Ingredient[] }>;
    private addItemSubscription: Subscription;
    constructor(
        private shoppingService: ShoppingService,
        private loggingService: LoggingService,
        private store: Store<fromShoppingList.AppState>
    ) {}

    ngOnInit(): void {
        // this.Ingredients = this.shoppingService.getIngredients();
        // this.addItemSubscription = this.shoppingService.addItemEvent.subscribe(() => {
        //     this.Ingredients = this.shoppingService.getIngredients();
        // });
        this.Ingredients = this.store.select('shoppingList');
        this.loggingService.printLog('From Shopping List component - Lazy loaded so Sepearte instance of service');
    }

    ngOnDestroy(): void {
        this.addItemSubscription.unsubscribe();
    }

    onEditItem(index: number): void {
        this.shoppingService.editItemEvent.next(index);
    }
}
