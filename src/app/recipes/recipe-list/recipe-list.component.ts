import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
    recipes: Recipe[];
    constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.recipeService.recipesChange.subscribe((recipe: Recipe[]) => {
            this.recipes = recipe;
        });
        this.recipes = this.recipeService.getRecipes();
    }
    // navigateTo(): void {
    //     this.router.navigate(['/new']);
    // }
    navigateTo(): void {
        this.router.navigate(['new'], { relativeTo: this.route });
    }
}
