import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RecipesService } from "../recipes/recipes.service";
import { Recipe } from "../recipes/recipe.model";
import { map, tap } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class DataStorageService{

    private url = 'https://ng13-recipebook-default-rtdb.firebaseio.com/recipes.json';

    constructor(private http : HttpClient, private recipeService: RecipesService){}

    storeRecipes() : void {
        const recipes = this.recipeService.getRecipeList();
        this.http.put(this.url, recipes)
        .subscribe( response => {
            console.log(response);
        });
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>(this.url)
        .pipe(
            map(recipes => {
              return recipes.map(recipe => {
                return {
                  ...recipe,
                  ingredients: recipe.ingredients ? recipe.ingredients : []
                };
              });
            }),
            tap(recipes => {
              this.recipeService.setRecipes(recipes);
            })
        )
    }
}