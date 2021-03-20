import { Component} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	//styleUrl: []
})
export class HeaderComponent{
	constructor(private datastorage: DataStorageService){}

OnSaveData(){
	this.datastorage.StoreRecipes();
}

OnFetchData(){
	this.datastorage.fetchRecipes();
}

// onRecipeClick(selectedlink){

// 	this.linkclicked.emit(this.Recipe);
// }

// onShoppingClick(selectedlink){

// 	this.linkclicked.emit(this.Shoppinglist);
// }

}
