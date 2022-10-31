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
  test('should be able to create a pizza', () => {
    const pizza = new Pizza(margheritaReceipe)
    expect(pizza).toBeInstanceOf(Pizza)
  })

  test('should be able to check if a pizza has allergens', () => {
    const pizza = new Pizza(margheritaReceipe)
    expect(pizza.hasAllergens(['eggs'])).toBe(false)
    expect(pizza.hasAllergens(['milk'])).toBe(true)
  })

  test('should be able to check if a pizza has food types', () => {
    const pizza = new Pizza(margheritaReceipe)
    expect(pizza.hasFoodTypes(['veggie'])).toBe(true)
    expect(pizza.hasFoodTypes(['fish'])).toBe(false)
  })

  test('should be able to remove allergens from a pizza', () => {
    const pizza = new Pizza(margheritaReceipe)
    const newRecipe = pizza.removeAllergens(['milk'])
    expect(newRecipe.ingredients).toEqual([tomatoIngredient])
  })

  test('should be able to remove food types from a pizza', () => {
    const pizza = new Pizza(margheritaReceipe)
    const newRecipe = pizza.removeFoodTypes(['veggie'])
    expect(newRecipe.foodTypes).toEqual(['fat'])
  })

  test('should be able to remove ingredients from a pizza', () => {
    const pizza = new Pizza(margheritaReceipe)
    const newRecipe = pizza.removeIngredients([tomatoIngredient])
    expect(newRecipe.ingredients).toEqual([cheeseIngredient])
  })

  test('should be able to double ingredients from a pizza', () => {
    const pizza = new Pizza(margheritaReceipe)
    const newRecipe = pizza.doubleIngredients([tomatoIngredient])
    expect(newRecipe.ingredients).toEqual([
      { ...tomatoIngredient, caloriesPerUnit: 10 },
      cheeseIngredient
    ])
  })

  test('should be able to get the total calories of a pizza', () => {
    const pizza = new Pizza(margheritaReceipe)
    expect(pizza.getCalories()).toBe(1005)
  })

  test('should be able to get the total calories of a pizza with multiple ingredients', () => {
    const pizza = new Pizza(seaReceipe)
    expect(pizza.getCalories()).toBe(20)
  })
})
