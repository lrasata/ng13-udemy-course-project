import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable({providedIn: 'root'})
export class RecipesService {
  recipesChanged = new Subject<Recipe[]>();

    private recipeList: Recipe[] = [
        new Recipe(
          0,
          'Tasty Schnitzel',
          'A super-tasty Schnitzel - just awesome!',
          'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
          [
            new Ingredient('Meat', 1),
            new Ingredient('French Fries', 20)
          ]),
        new Recipe(
          1,
          'Big Fat Burger',
          'What else you need to say?',
          'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
          [
            new Ingredient('Buns', 2),
            new Ingredient('Meat', 1)
          ])
      ];

    constructor(private slService: ShoppingListService) {}

    getRecipe(id: number){
      return this.recipeList[id];
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

    deleteRecipe(index: number) {
      this.recipeList.splice(index, 1);
      this.recipesChanged.next(this.recipeList.slice());
    }

}