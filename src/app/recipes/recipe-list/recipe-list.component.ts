import {Component, OnInit, EventEmitter, Output} from '@angular/core';

import {Recipe} from '../recipe.model';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
    recipes: Recipe[] = [
        new Recipe(
            'A Test Recipe',
            'This is simply a test',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY0bPEh5ySYcpRUCJuiqCrCy-xIubL0xP0oxdZ7VH5oO65jFky'
        ),
        new Recipe(
            'Another Test Recipe',
            'This is also simply a test',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY0bPEh5ySYcpRUCJuiqCrCy-xIubL0xP0oxdZ7VH5oO65jFky'
        )
    ];

    @Output() recipeSelected = new EventEmitter<Recipe>();

    selectRecipe(recipe: Recipe) {
        this.recipeSelected.emit(recipe);
    }

    constructor() {
    }

    ngOnInit() {
    }
}
