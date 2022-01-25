import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html'
})
export class RecipesComponent implements OnInit {
  recipeDetailToDisplay : Recipe;

  constructor(private recipesService: RecipesService) { }

  ngOnInit(): void {
    this.recipesService.recipeSelected
      .subscribe(
        (recipe: Recipe) => {
          this.recipeDetailToDisplay = recipe;
        }
      );
  }

}
