import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
// import { RecipesModule } from './recipes/recipes.module';
// import { ShoppingModule } from './shopping-list/shopping.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';
// import { authReducer } from './auth/store/auth.reducer';

import * as fromApp from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import { environment } from 'src/environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { RecipesEffects } from './recipes/store/recipies.effect';

@NgModule({
    declarations: [AppComponent, HeaderComponent, AuthComponent],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        SharedModule,
        // RecipesModule,
        // ShoppingModule, - Eagerly Loaded
        CoreModule,

        // StoreModule.forRoot({ shoppingList: shoppingListReducer, auth: authReducer }),
        EffectsModule.forRoot([AuthEffects, RecipesEffects]),
        StoreModule.forRoot(fromApp.appReducer),
        StoreDevtoolsModule.instrument({ logOnly: environment.production }),
        StoreRouterConnectingModule.forRoot(),
    ],

    bootstrap: [AppComponent],
})
export class AppModule {}
