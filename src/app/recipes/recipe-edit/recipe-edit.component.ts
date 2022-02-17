import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html'
})
export class RecipeEditComponent implements OnInit {
  id: number;
  recipe: Recipe;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipesService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (param: Params) => {
        this.id = +param['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
        this.editMode =  param['id'] != null;
        this.initForm();
      }
    );
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

  private initForm(): void {
    let recipeName =  '';
    let recipeImgPath = '';
    let recipeDescription = ';'

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName =  recipe.name;
      recipeImgPath = recipe.imagePath;
      recipeDescription = recipe.description;
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImgPath),
      'description': new FormControl(recipeDescription)
    });
  }

}
