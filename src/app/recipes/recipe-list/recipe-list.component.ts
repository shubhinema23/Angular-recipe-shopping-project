import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {


recipes: Recipe[];
subscription: Subscription;

  constructor(private recipeService: RecipeService,
  			  private router: Router,
  			  private route: ActivatedRoute) { }

  ngOnInit(){
     this.subscription = this.recipeService.RecipesChanged.subscribe(
        (recipe: Recipe[]) => {
          this.recipes = recipe;
        }
      )

    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe(){
  	this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}

//Now to be able to use a relative route in the navigate method though, we also need to
//inform the router about our current route, therefor we need to add relativeTo.