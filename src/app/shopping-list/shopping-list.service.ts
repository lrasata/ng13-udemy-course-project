import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({providedIn: 'root'})
export class ShoppingListService {
    private ingredientList: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
      ];

    ingredientsChanged = new Subject<Ingredient[]>();

    getIngredientList() {
        return this.ingredientList.slice();
    }

    addNewIngredient(ingredient: Ingredient) {
        this.ingredientList.push(ingredient);
        this.ingredientsChanged.next(this.ingredientList.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredientList.push(...ingredients); //Here we need to emit only one event, if we loop with addIngredient(), too much uncessary event will be emitted
        this.ingredientsChanged.next(this.ingredientList.slice());
      }

}