import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
//import { RecipeService } from '../recipes/recipe.service';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class ShoppingListService{

IngredientChanged = new Subject<Ingredient[]>();
startedEditing = new Subject<number>();

	private Ingredients: Ingredient[]= [
	  	new Ingredient('Apple', 5),
  		new Ingredient('Mango', 3),
        new Ingredient('Bnana', 10)
	];

	getIngredients(){
		return this.Ingredients.slice();
	}

	getEditIngredients(index: number){
		return this.Ingredients[index];
	}

	addIngredient(ingredients: Ingredient){
		this.Ingredients.push(ingredients);
		this.IngredientChanged.next(this.Ingredients);
	}


	updateIngredient(index: number, updatedIngredients: Ingredient){
		this.Ingredients[index] = updatedIngredients;
		this.IngredientChanged.next(this.Ingredients);
	}

	deleteIngredient(index: number){
		this.Ingredients.splice(index, 1);
		this.IngredientChanged.next(this.Ingredients);
	}


	addIngredientsfromRecipe(recipeIngredients: Ingredient[]){
		// for(let ingredient of recipeIngredients){
		// 	this.addIngredient(ingredient);
		// }
// this method is absolutely fine,the only downside probably is that we emit a lot of events. 
// Now it won't be too bad because even a recipe with like 30 ingredients wouldn't blow up our 
// app but still, there are a lot of unnecessary event emissions.


		this.Ingredients.push(...recipeIngredients);
		this.IngredientChanged.next(this.Ingredients);

// So we could access our ingredients here and call the push method and now we can use an ES6 
// feature, the spread operator which allows us to basically turn an array of elements into a 
// list of elements because the push method here is able to handle multiple objects. However, 
// it is not able to handle an array or to be precise, it can handle an array but then it would 
// push this array as a single object to the other array.

// So by adding the spread operator which is simply three dots, we can now simply spread our 
// ingredients into a list of single ingredients which are now pushed without issues to our 
// ingredients array.
	}

	

	// onAddRecipeIngredients(recipe){
	// 	//console.log(recipe.length);

	// 	for (var i=0; i<=recipe.length; i++) {

	// 		//console.log(recipe[i]);
	// 		this.Ingredients.push(recipe[i]);
	// 	}

	// 	this.IngredientChanged.emit(this.Ingredients);
		
	// 	//console.log(recipe.ingredients);
	// }

	//one more method
}

//here we used event emitter because on getIngredient method we are using slice() method
//which is creating a copy of real array therefor when we are adding ingredients to the array
//it is added on the real array but not reflacting on the browser(coz browser showing a copy
//of the array not real array).
//so on each event(on add ingredient) we are emitting a new copy of the ingredients array so
//that a new copy of the ingredient array is reflacting on the browser. 