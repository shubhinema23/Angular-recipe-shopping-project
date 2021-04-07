import { Ingredient } from '../shared/ingredient.model';

export class Recipe{
	public name: string;
	public description: string;
	public imagePath: string;
	public ingredients: Ingredient[];

//we give properties public sthat it can be access from outside. and whenever we call this 
//class the the type will be the class name "Recipe" 

	constructor(name: string, desc: string, imgPath: string, ingredients: Ingredient[]){
		this.name = name;
		this.description = desc;
		this.imagePath = imgPath;
		this.ingredients = ingredients;
	}
}