import { Component } from '@angular/core';
import { Recipe } from './recipes/recipe.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'ng13-udemy-course-project';
  featureDisplayed = 'recipe';

  onFeatureSelected(feature: string) {
    this.featureDisplayed = feature;
  }
}
