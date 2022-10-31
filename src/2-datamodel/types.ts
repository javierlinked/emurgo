export type Allergen =
  | 'eggs'
  | 'fish'
  | 'milk'
  | 'molluscs'
  | 'mustard'
  | 'peanuts'
  | 'sesame'
  | 'tomato'

export type FoodType =
  | 'veggie'
  | 'sweet'
  | 'grains and cereal'
  | 'meat'
  | 'fish'
  | 'proteic'
  | 'dairy'
  | 'fruit'
  | 'vegetable'
  | 'fat'

export interface Ingredient {
  name: String
  caloriesPerUnit: number
  alergen: Allergen
}

export interface Recipe {
  name: String
  ingredients: Ingredient[]
  foodTypes: FoodType[]
}
