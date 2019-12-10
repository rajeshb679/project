import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
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
    constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) {}

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
            name: new FormControl(recipeName, Validators.required),
            imagePath: new FormControl(recipeImagePath, Validators.required),
            description: new FormControl(recipeDescription, Validators.required),
            ingredient: new FormArray([]),
        });

        if (this.editMode && recipe.ingredient) {
            recipe.ingredient.forEach(ingredient => {
                // console.log(ingredient);
                (this.recipeForm.get('ingredient') as FormArray).push(
                    new FormGroup({
                        name: new FormControl(ingredient.name, Validators.required),
                        amount: new FormControl(ingredient.amount, [
                            Validators.required,
                            Validators.pattern('^[1-9]+[0-9]*$'),
                        ]),
                    })
                );
            });
            // console.log(this.recipeForm.get('ingredient'));
        }
    }

    get getIngredients(): any {
        // console.log(this.recipeForm);
        console.log((this.recipeForm.get('ingredient') as FormArray).controls);

        return (this.recipeForm.get('ingredient') as FormArray).controls;
    }

    onDeleteIngredient(index: number): void {
        (this.recipeForm.get('ingredient') as FormArray).removeAt(index);
    }

    onSubmit(): void {
        if (this.editMode) {
            // console.log(this.recipeForm.value);
            this.recipeService.updateRecipe(this.id, this.recipeForm.value);
        } else {
            this.recipeService.addRecipe(this.recipeForm.value);
        }
        this.router.navigate(['recipes']);
    }

    onAddIngredient(): void {
        (this.recipeForm.get('ingredient') as FormArray).push(
            new FormGroup({
                name: new FormControl(' ', Validators.required),
                amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
            })
        );
    }

    onCancel(): void {
        this.router.navigate(['../'], { relativeTo: this.route });
    }
}
