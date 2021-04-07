import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Recipe } from '../recipe.model';

import { Ingredient } from '../../shared/ingredient.model';

//import { ShoppingListService } from '../../shopping-list/shopping-list.service';

import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

//@Input() recipe: Recipe;

recipe;

id: number;

RecipeIngredients;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
  	
    // const id = +this.route.snapshot.params['id'];

    // this.recipe = this.recipeService.getRecipeObject(id);
    // console.log(this.recipe);

// this will only work for the first time if we loaded detail component. the recipe menu 
// where we can click on one is on the left, so we will be able to choose a new recipe while 
// we still see the details of another one. So we probably want to react to changes in our 
// recipe ID because that's absolutely possible in our app. Therefor we need to subscribe
// our route parameters(id) 

this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
      )

  }


	onAddToShoppingList(){

		this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
	}

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route});
    //this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe(){
    this.recipeService.DeleteRecipe(this.id);
    this.router.navigate(['../'], {relativeTo: this.route})
  }
}
