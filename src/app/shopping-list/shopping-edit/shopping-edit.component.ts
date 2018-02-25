import {Component, OnDestroy, OnInit} from '@angular/core';

import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';

@Component({
	selector: 'app-shopping-edit',
	templateUrl: './shopping-edit.component.html',
	styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
	ingredients = [];
	shoppingListForm: FormGroup;
	subscription: Subscription;
	editMode = false;
	editedItemIndex: number;
	editedItem: Ingredient;

	constructor(private slService: ShoppingListService) {}

	ngOnInit() {
		this.subscription = this.slService.startedEditing.subscribe((index: number) => {
				this.editedItemIndex = index;
				this.editMode = true;
				this.editedItem = this.slService.getIngredient(index);
				this.shoppingListForm.setValue({
					name: this.editedItem.name,
					amount: this.editedItem.amount
				});
			}
		);

		this.shoppingListForm = new FormGroup({
			name: new FormControl(null, Validators.required),
			amount: new FormControl(null, Validators.required)
		});
	}

	onAddItem() {
		const name = this.shoppingListForm.controls.name.value,
			amount = this.shoppingListForm.controls.amount.value,
			newIngredient = new Ingredient(name, amount);

		if (this.editMode) {
			this.slService.updateIngredient(this.editedItemIndex, newIngredient);
		} else {
			this.slService.addIngredient(newIngredient);
		}

		this.editMode = false;
		this.shoppingListForm.reset();
	}

	onClear() {
		this.shoppingListForm.reset();
		this.editMode = false;
	}

	onDelete() {
		this.slService.deleteIngredient(this.editedItemIndex);
		this.onClear();
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
