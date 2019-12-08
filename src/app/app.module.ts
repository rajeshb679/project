import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { DropDownDirectiveDirective } from './shared/drop-down-directive.directive';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/LoadingSpinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AlertComponent } from './shared/alert.component';
import { PlaceHolderDirective } from './shared/PlaceHolder/place-holder-directive.directive';
import { RecipesModule } from './recipes/recipes.module';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ShoppingListComponent,
        ShoppingEditComponent,
        DropDownDirectiveDirective,
        AuthComponent,
        LoadingSpinnerComponent,
        AlertComponent,
        PlaceHolderDirective,
    ],
    imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule, RecipesModule],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
    bootstrap: [AppComponent],
    entryComponents: [AlertComponent],
})
export class AppModule {}
