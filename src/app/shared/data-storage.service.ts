import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService{

	constructor(private http: HttpClient, private recipeservice: RecipeService){

	}

	StoreRecipes(){
		const recipes = this.recipeservice.getRecipes();
		this.http.put(
			'https://ng-recipe-shopping-1d486-default-rtdb.firebaseio.com/recipes.json', 
			recipes
			)
		.subscribe(response => {
				console.log('save recipes');
			});
	}

	fetchRecipes(){
		this.http.get<Recipe>(
			'https://ng-recipe-shopping-1d486-default-rtdb.firebaseio.com/recipes.json'
			)
		.pipe(map(recipes => {
			return recipes.map(recipes => {
				return{
					...recipe,
					ingredients: recipe.ingredients ? recipe.ingredients : []
				}
			})
		}))
		.subscribe(recipes => {
			this.recipeservice.setRecipes(recipes);
		})
	}
}