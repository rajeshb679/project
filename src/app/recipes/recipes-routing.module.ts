import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../auth/auth-guard.service';
import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipesResovlerService } from './recipes-resovler.service';

const appRoutes: Routes = [
    {
        path: 'recipes',
        canActivate: [AuthGuardService],
        component: RecipesComponent,
        children: [
            { path: '', component: RecipeStartComponent },
            // New should be before id as new will be considered as id and detail component will be loaded
            { path: 'new', component: RecipeEditComponent },
            { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResovlerService] },
            { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResovlerService] },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
})
export class RecipesRoutingModule {}
