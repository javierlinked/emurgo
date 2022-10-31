/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, test } from '@jest/globals'
import { Pizza } from '.'
import { Ingredient, Recipe } from './types'

const eggIngredient: Ingredient = {
  name: 'egg',
  caloriesPerUnit: 80,
  alergen: 'eggs'
}

const moluscIngredients: Ingredient = {
  name: 'molusc',
  caloriesPerUnit: 15,
  alergen: 'molluscs'
}

const cheeseIngredient: Ingredient = {
  name: 'cheese',
  caloriesPerUnit: 1000,
  alergen: 'milk'
}

const tomatoIngredient: Ingredient = {
  name: 'tomato',
  caloriesPerUnit: 5,
  alergen: 'tomato'
}

const margheritaReceipe: Recipe = {
  name: 'margherita pizza',
  ingredients: [tomatoIngredient, cheeseIngredient],
  foodTypes: ['fat', 'veggie']
}

const seaReceipe: Recipe = {
  name: 'Sea pizza',
  ingredients: [moluscIngredients, tomatoIngredient],
  foodTypes: ['fish', 'proteic']
}

describe('Pizza', () => {
  test('should calculate the total calories', () => {
    const pizza = new Pizza(margheritaReceipe)
    expect(pizza.getCalories()).toBe(1005)
  })
})
