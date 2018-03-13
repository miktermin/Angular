import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {Subscription} from 'rxjs/Subscription';
import {AuthService} from '../../auth/auth.service';

@Component({
	selector: 'app-recipe-list',
	templateUrl: './recipe-list.component.html',
	styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
	recipes: Recipe[];
	recipeChangeSubscription: Subscription;

	constructor(private recipeService: RecipeService,
				private router: Router,
				private route: ActivatedRoute,
				private authService: AuthService) {}

	ngOnInit() {
		this.recipeChangeSubscription = this.recipeService.recipesChanged.subscribe((recipes: Recipe[]) => {
			this.recipes = recipes;
		});

		this.recipes = this.recipeService.getRecipes();
	}

	ngOnDestroy() {
		this.recipeChangeSubscription.unsubscribe();
	}

	onNewRecipe() {
		return this.authService.isAuthenticated() ?
			this.router.navigate(['new'], {relativeTo: this.route}) :
			this.router.navigate(['/signin']);
	}
}
