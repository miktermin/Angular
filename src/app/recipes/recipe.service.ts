import { Injectable } from '@angular/core';

import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class RecipeService {
	recipesChanged = new Subject<Recipe[]>();

	private recipes: Recipe[] = [
		new Recipe(
			'A Test Recipe',
			'This is simply a test',
			'https://c.pxhere.com/photos/4e/68/tenderloin_beef_beef_tenderloin_horseradish_salad_kale_piement_food-1376527.jpg!d',
			[
				new Ingredient('Meat', 1),
				new Ingredient('Frencg Fries', 20)
			]
		),
		new Recipe(
			'Another Test Recipe',
			'This is also simply a test',
			'https://c.pxhere.com/photos/46/ff/steaks_food_dinner_meal_meat_food_plate-1412335.jpg!d',
			[
				new Ingredient('Buns', 2),
				new Ingredient('Meat', 1)
			]
		),
		new Recipe(
			'Also Test Recipe',
			'Another recipe',
			'https://c.pxhere.com/photos/4b/79/steak_delicious_food_dinner_grill_grilled_steak_dinner_lunch-608139.jpg!d',
			[
				new Ingredient('Bread', 1),
				new Ingredient('Butter', 2)
			]
		)
	];

	constructor(private slService: ShoppingListService) {}

	setRecipes(recipes: Recipe[]) {
		this.recipes = recipes;
		this.recipesChanged.next(this.recipes.slice());
	}

	getRecipes() {
		return this.recipes.slice();
	}

	addIngredientsToShoppingList(ingredients: Ingredient[]) {
		this.slService.addIngredients(ingredients);
	}

	getRecipeById(id: number) {
		return this.recipes.slice()[id];
	}

	addRecipe(recipe: Recipe) {
		this.recipes.push(recipe);
		this.recipesChanged.next(this.recipes.slice());
	}

	updateRecipe(index: number, newRecipe: Recipe) {
		this.recipes[index] = newRecipe;
		this.recipesChanged.next(this.recipes.slice());
	}

	deleteRecipe(index: number) {
		this.recipes.splice(index, 1);
		this.recipesChanged.next(this.recipes.slice());
	}
}
