import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editItemIndex: number;
  editItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startEditing.subscribe(
      (index: number) => {
        this.editItemIndex = index;
        this.editMode =  true;
        this.editItem = this.shoppingListService.getIngredient(index);
        this.slForm.setValue(
          {
            name: this.editItem.name,
            amount: this.editItem.amount
          }
        );
      }
    );
  }

  onAddItem(form: NgForm){
    const value = form.value;
    this.shoppingListService.addNewIngredient(
      new Ingredient(
        value.name, 
        value.amount
      )
    );

  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }


}
