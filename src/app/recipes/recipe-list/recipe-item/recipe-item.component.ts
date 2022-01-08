import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Output() recipeItemEvent: EventEmitter<Recipe> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onSelectRecipeItem() {
    this.recipeItemEvent.emit(this.recipe);
  }

}
