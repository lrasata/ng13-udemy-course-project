import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html'
})
export class ShoppingListComponent implements OnInit {
  ingredientList: Ingredient[] = [];
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredientList = this.shoppingListService.getIngredientList();
    this.shoppingListService.ingredientsChanged
    .subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredientList = ingredients;
      }
    );
  }

}
