import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

	Ingredients: Ingredient[];

  private IngUnsubscribe: Subscription;


  constructor(private slService: ShoppingListService) { 

  }

  ngOnInit(): void {
    this.Ingredients = this.slService.getIngredients();
    this.IngUnsubscribe = this.slService.IngredientChanged.subscribe(
        (Ingredients: Ingredient[]) => {
          this.Ingredients = Ingredients;
        }
      )
  }

  onClickEdit(index: number){
    this.slService.startedEditing.next(index);
  }

  ngOnDestroy(){
    this.IngUnsubscribe.unsubscribe();
  }


}
