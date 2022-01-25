import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html'
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', {static: true}) nameInputContent: ElementRef;
  @ViewChild('amountInput', {static: true}) amountInputContent: ElementRef;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAddItem(){
    this.shoppingListService.addNewIngredient(
      new Ingredient(
        this.nameInputContent.nativeElement.value, 
        this.amountInputContent.nativeElement.value
      )
    );
    this.nameInputContent.nativeElement.value = '';
    this.amountInputContent.nativeElement.value = '';

  }


}
