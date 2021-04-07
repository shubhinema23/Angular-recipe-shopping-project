import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import {Recipe} from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

RecipesChanged = new Subject<Recipe[]>();

	//RecipeSelected = new EventEmitter<Recipe>();
//receiving this recipe from recipe-item(onSelectRecipe) and sending it to recipes component


	private recipes: Recipe[] = [
	new Recipe('South Indian Dosa', 
		'Simply great!', 
		'https://sukhis.com/wp-content/uploads/2020/01/Dosa-500x400.jpg', 
		[
			new Ingredient('Coconut', 1),
			new Ingredient('Potato', 5),
			new Ingredient('rice', 1)
		]), 
	new Recipe('Veg Burger', 
		'Just loving it!', 
		'https://ampmstore.in/wp-content/uploads/2019/02/bg.jpg', 
		[
			new Ingredient('Buns', 2),
			new Ingredient('Potato', 4)
		]),
	];
//here we gave recipe property private so that it can't be access from outside.


getRecipes(){
	return this.recipes.slice();

}

setRecipes(recipes: Recipe[] ){
	this.recipes = recipes;
	this.RecipesChanged.next(this.recipes.slice());
}

getRecipe(index: number){
	//console.log(this.recipes[index])
	return this.recipes[index];
}

// if we now change something on this array, we will change it on the array in this service.
// Therefore, we will call slice with no arguments, this will simply return a new array which is 
// an exact copy of the one in this service file. So therefore, we really can't access the 
// recipes array stored here from outside.


constructor(private slService: ShoppingListService){

}


addIngredientsToShoppingList(ingredients: Ingredient[]){
	this.slService.addIngredientsfromRecipe(ingredients);
}


addRecipe(recipe: Recipe){
	this.recipes.push(recipe);
	this.RecipesChanged.next(this.recipes.slice());
}


updateRecipe(index: number, newrecipe: Recipe){
	this.recipes[index] = newrecipe;
	this.RecipesChanged.next(this.recipes.slice());
}

DeleteRecipe(index: number){
	this.recipes.splice(index, 1);
	this.RecipesChanged.next(this.recipes.slice());
	console.log('recipeservice');
}

}