import { Injectable, EventEmitter} from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable({providedIn: 'root'})
export class RecipesService {
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

    recipeSelected = new EventEmitter<Recipe>();

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

}