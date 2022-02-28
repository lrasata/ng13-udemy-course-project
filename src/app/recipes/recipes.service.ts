import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable({providedIn: 'root'})
export class RecipesService {
  recipesChanged = new Subject<Recipe[]>();

    // private recipeList: Recipe[] = [
    //     new Recipe(
    //       0,
    //       'Tasty Schnitzel',
    //       'A super-tasty Schnitzel - just awesome!',
    //       'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
    //       [
    //         new Ingredient('Meat', 1),
    //         new Ingredient('French Fries', 20)
    //       ]),
    //     new Recipe(
    //       1,
    //       'Big Fat Burger',
    //       'What else you need to say?',
    //       'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
    //       [
    //         new Ingredient('Buns', 2),
    //         new Ingredient('Meat', 1)
    //       ])
    //   ];

    private recipeList: Recipe[] = [];

    constructor(private slService: ShoppingListService) {}

    setRecipes(recipes: Recipe[]) {
      this.recipeList = recipes;
      this.recipesChanged.next(this.recipeList.slice());
    }

    getRecipe(id: number){
      for (let recipe of this.recipeList) {
        if (recipe.id === id) {
          return recipe;
        }
      }
    }

    getRecipeList() {
        return this.recipeList.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
      }

    addRecipe(recipe: Recipe) {
        const id = this.recipeList.length;
        recipe.id = id;
        this.recipeList.push(recipe);
        this.recipesChanged.next(this.recipeList.slice());
      }
    
    updateRecipe(index: number, newRecipe: Recipe) {
      newRecipe.id = index;
      this.recipeList[index] = newRecipe;
      console.log(newRecipe);
      this.recipesChanged.next(this.recipeList.slice());
    }

    deleteRecipe(id: number) {
      let index = 0;
      for (let recipe of this.recipeList) {
        if (recipe.id === id) {
          this.recipeList.splice(index, 1);
        }
        index ++;
      }
      this.recipesChanged.next(this.recipeList.slice());
    }

}