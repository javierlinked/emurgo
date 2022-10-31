import { Allergen, FoodType, Ingredient, Recipe } from './types'

export class Pizza {
  recipe: Recipe

  constructor (recipe: Recipe) {
    this.recipe = recipe
  }

  /**
     * when user wants to highlight any pizzas that might contain soy in it
     * @param allergens
     * @returns receipts that contain any of the allergens
     */
  hasAllergens (allergens: Allergen[]): boolean {
    return this.recipe.ingredients.some(ingredient => allergens.includes(ingredient.alergen))
  }

  hasFoodTypes (foodTypes: FoodType[]): boolean {
    return this.recipe.foodTypes.some(foodType => foodTypes.includes(foodType))
  }

  removeAllergens (allergens: Allergen[]): Recipe {
    return {
      ...this.recipe,
      ingredients: this.recipe.ingredients.filter(ingredient => !allergens.includes(ingredient.alergen))
    }
  }

  removeFoodTypes (foodTypes: FoodType[]): Recipe {
    return {
      ...this.recipe,
      foodTypes: this.recipe.foodTypes.filter(foodType => !foodTypes.includes(foodType))
    }
  }

  removeIngredients (ingredients: Ingredient[]): Recipe {
    return {
      ...this.recipe,
      ingredients: this.recipe.ingredients.filter(ingredient => !ingredients.includes(ingredient))
    }
  }

  doubleIngredients (ingredients: Ingredient[]): Recipe {
    return {
      ...this.recipe,
      ingredients: this.recipe.ingredients.map(ingredient => {
        if (ingredients.includes(ingredient)) {
          return {
            ...ingredient,
            caloriesPerUnit: ingredient.caloriesPerUnit * 2
          }
        }

        return ingredient
      })
    }
  }

  getCalories (): number {
    return this.recipe.ingredients.reduce((acc, ingredient) => acc + ingredient.caloriesPerUnit, 0)
  }
}
