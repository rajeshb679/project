import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    // { path: '', redirectTo: '/recipes' },
    /*
    pathMatch = 'full' results in a route hit when the remaining, unmatched segments of the URL match is the prefix path

    pathMatch = 'prefix' tells the router to match the redirect route when the remaining URL begins with the redirect route's prefix path.

    Ref: https://angular.io/guide/router#set-up-redirects

    pathMatch: 'full' means, that the whole URL path needs to match and is consumed by the route matching algorithm.

    pathMatch: 'prefix' means, the first route where the path matches the start of the URL is chosen, but then the route matching algorithm is continuing searching for matching child routes where the rest of the URL matches.
    */
    { path: 'login', component: AuthComponent },
    // { path: 'shopping-list', component: ShoppingListComponent },
    // {
    //     path: 'recipes',
    //     canActivate: [AuthGuardService],
    //     component: RecipesComponent,
    //     children: [
    //         { path: '', component: RecipeStartComponent },
    //         // New should be before id as new will be considered as id and detail component will be loaded
    //         { path: 'new', component: RecipeEditComponent },
    //         { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResovlerService] },
    //         { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResovlerService] },
    //     ],
    // },
    // { path: 'new', component: RecipeEditComponent },
    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },
    { path: 'shopping-list', loadChildren: './shopping-list/shopping.module#ShoppingModule' },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
