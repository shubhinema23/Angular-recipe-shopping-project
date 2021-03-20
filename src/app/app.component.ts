import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'recipe-shopping-project';

ClickedLink: string = 'recipe';

  onLinkClick(LinkName){
  	console.log(LinkName);
  	this.ClickedLink = LinkName;

  }
}
