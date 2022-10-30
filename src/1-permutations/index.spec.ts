import { describe, expect, test } from '@jest/globals'
import { getPermutations } from './index'

describe('permutations module', () => {
  test('given input expected results are shown returned', () => {
    const expected = ['110000', '110001', '111000', '111001']
    const results = getPermutations('11*00*')

    expect(results).toEqual(expect.arrayContaining(expected))
    expect(results.length).toEqual(4)
  })

  test('given input with no * same values are returned', () => {
    const expected = ['11100']
    const results = getPermutations('11100')

    expect(results).toEqual(expect.arrayContaining(expected))
    expect(results.length).toEqual(1)
  })

  test('given input with just * all permutations are returned', () => {
    const expected = ['111', '000', '100', '110', '101', '011', '001', '010']
    const results = getPermutations('***')

    expect(results).toEqual(expect.arrayContaining(expected))
    expect(results.length).toEqual(8)
  })
})
