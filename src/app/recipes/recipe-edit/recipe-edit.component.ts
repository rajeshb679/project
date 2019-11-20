import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html',
    styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
    id: number;
    editMode: boolean;
    recipeForm: FormGroup;
    constructor(private route: ActivatedRoute, private recipeService: RecipeService) {}

    ngOnInit(): void {
        this.route.params.subscribe((param: Params) => {
            this.id = +param['id'];
            this.editMode = param['id'] != null;
            this.initForm();
        });
    }

    private initForm(): void {
        let recipeName = '';
        let recipeImagePath = '';
        let recipeDescription = '';

        let recipe: Recipe;
        if (this.editMode) {
            recipe = this.recipeService.getRecipesById(this.id);
            recipeName = recipe.name;
            recipeImagePath = recipe.imagePath;
            recipeDescription = recipe.description;
        }
        this.recipeForm = new FormGroup({
            name: new FormControl(recipeName),
            imagePath: new FormControl(recipeImagePath),
            description: new FormControl(recipeDescription),
            ingredients: new FormArray([]),
        });
    }
    onSubmit(): void {}
}
