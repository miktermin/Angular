import {Component, ElementRef, OnInit, ViewChild, EventEmitter, Output} from '@angular/core';

import {Ingredient} from '../../shared/ingredient.model';

@Component({
	selector: 'app-shopping-edit',
	templateUrl: './shopping-edit.component.html',
	styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
	@ViewChild('nameInput') nameInputRef: ElementRef;
	@ViewChild('amountInput') amountInput: ElementRef;
	@Output() ingredientAdded = new EventEmitter<Ingredient>();

	ingredients = [];

	constructor() {
	}

	ngOnInit() {
	}

	onAddItem() {
		const ingName = this.nameInputRef.nativeElement.value;
		const ingAmount = this.amountInput.nativeElement.value;
		const newIngredient = new Ingredient(ingName, ingAmount);
		this.ingredientAdded.emit(newIngredient);
	}

}
