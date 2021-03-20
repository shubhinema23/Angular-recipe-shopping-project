import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

const appRoutes: Routes = [
	{path: '', redirectTo: '/recipes', pathMatch: 'full'},
	{path: 'recipes', component: RecipesComponent, children: [
		{path: '', component: RecipeStartComponent},
		{path: 'new', component: RecipeEditComponent},
		{path: ':id', component: RecipeDetailComponent},
		{path: ':id/edit', component: RecipeEditComponent}
	]},
	{path: 'shopping-list', component: ShoppingListComponent},
];


@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes)
	],
	exports: [RouterModule]
})

export class AppRoutingModule{

}








// *******pathMatch********
// this route here uses an empty path and therefore, this is part of any route we visit 
// because again, the default matching strategy is prefix, so it will check if this empty 
// path is a part of the total path therefor pathMatch property here set this to full, 
// this overrides the default of prefix and says now only redirect if the full path is 
// empty, so we won't redirect on any other paths.



// *******if recipe child path new before id path********
// If we visit recipes/new, due to the way how we ordered our routes, it will try to parse 
// new as an ID because the route with the dynamic ID parameter comes before the route 
// definition where we have 'new' hardcoded into the path.

// So we should switch these two routes, so that the new route comes before the route with 
// the dynamic parameter, otherwise how would Angular know if whatever we pass right now 
// should be interpreted as the 'new' hardcoded path or as a dynamic parameter.

// So with this order, now we should be able to load new without any issues.