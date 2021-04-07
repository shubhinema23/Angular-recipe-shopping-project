import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

id: number;
editMode = false;
recipeForm: FormGroup;


  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit() {

  	this.route.params.subscribe(
  		(params: Params) => {
  			this.id = +params['id'];
  			this.editMode = params['id'] != null;
  			console.log(this.editMode);
        this.initForm();
  		}
  		)
  }


  onSubmit(){
    //const newrecipe = new Recipe(
       // this.recipeForm.value['name'],
       // this.recipeForm.value['description'],
       // this.recipeForm.value['imagePath'],
       // this.recipeForm.value['ingredients'],
      //);
    if(this.editMode){
      //this.recipeService.updateRecipe(this.id, newrecipe)
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }else{
      this.recipeService.addRecipe(this.recipeForm.value);
    }
     this.router.navigate(['../'], {relativeTo: this.route})
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
        new FormGroup({
          'name': new FormControl(null, Validators.required),
          'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
        })
      );

  }

  private initForm(){
    let recipeName = '';
    let recipeImg = '';
    let recipedescription = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImg = recipe.imagePath;
      recipedescription = recipe.description;
     // console.log(recipe);
     if(recipe['ingredients']){
       for(let ingredient of recipe.ingredients){
         recipeIngredients.push(
           new FormGroup({
             'name': new FormControl(ingredient.name, Validators.required),
             'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
           })
         )
     }
       }
       
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImg, Validators.required),
      'description': new FormControl(recipedescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }


  get controls() { // a getter!
    //console.log('hello');
    //return (this.recipeForm.get('ingredients') as FormArray).controls;
    return (<FormArray>this.recipeForm.get('ingredients')).controls;

  }


  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

}




// *********<FormArray>************
// this is a casting comment use to know ts to convert the result inti an array 


// *******removeAt()******
// used for deleteing the control

// Deleting all Items in a FormArray
// As of Angular 8+, there's a new way of clearing all items in a FormArray.

// (<FormArray>this.recipeForm.get('ingredients')).clear();
// The clear() method automatically loops through all registered FormControls (or FormGroups)
//  in the FormArray and removes them.

// It's like manually creating a loop and calling removeAt() for every item.