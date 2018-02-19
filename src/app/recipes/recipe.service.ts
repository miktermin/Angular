import {EventEmitter, Injectable} from '@angular/core';

import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
	recipeSelected = new EventEmitter<Recipe>();

	private recipes: Recipe[] = [
		new Recipe(
			'A Test Recipe',
			'This is simply a test',
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY0bPEh5ySYcpRUCJuiqCrCy-xIubL0xP0oxdZ7VH5oO65jFky',
			[
				new Ingredient('Meat', 1),
				new Ingredient('Frencg Fries', 20)
			]
		),
		new Recipe(
			'Another Test Recipe',
			'This is also simply a test',
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY0bPEh5ySYcpRUCJuiqCrCy-xIubL0xP0oxdZ7VH5oO65jFky',
			[
				new Ingredient('Buns', 2),
				new Ingredient('Meat', 1)
			]
		)
	];

	constructor(private slService: ShoppingListService) {}

	getRecipes() {
		return this.recipes.slice();
	}

	addIngredientsToShoppingList(ingredients: Ingredient[]) {
		this.slService.addIngredients(ingredients);
	}
}
