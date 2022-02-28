import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipeList : Recipe[] = [];
  subscription: Subscription;

  constructor(private recipesService: RecipesService, private dataStorageService: DataStorageService){}

  ngOnInit(): void {
    this.dataStorageService.fetchRecipes().subscribe();
    this.subscription = this.recipesService.recipesChanged
    .subscribe(
      (recipes: Recipe[]) => {
        this.recipeList = recipes;
      }
    );
    this.recipeList = this.recipesService.getRecipeList();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
