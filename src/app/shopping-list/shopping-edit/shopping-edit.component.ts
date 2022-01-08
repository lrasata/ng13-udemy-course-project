import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', {static: true}) nameInputContent: ElementRef;
  @ViewChild('amountInput', {static: true}) amountInputContent: ElementRef;
  @Output() ingredientAdded: EventEmitter<Ingredient> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onAddItem(){
    this.ingredientAdded.emit(
      new Ingredient(
        this.nameInputContent.nativeElement.value, 
        this.amountInputContent.nativeElement.value
      )
    );
    this.nameInputContent.nativeElement.value = '';
    this.amountInputContent.nativeElement.value = '';
  }

}
