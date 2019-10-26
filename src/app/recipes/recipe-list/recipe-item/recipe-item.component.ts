import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
    selector: 'app-recipe-item',
    templateUrl: './recipe-item.component.html',
    styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
    @Input() itemRecipe: Recipe;
    @Input() index: number;

    // constructor(private recipeService: RecipeService) {}

    ngOnInit() {}

    // onSelected(): void {
    //     this.recipeService.recipeSelected.emit(this.itemRecipe);
    // }
}
