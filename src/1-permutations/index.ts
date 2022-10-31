// LOG
// O(2^n) time complexity

export const getPermutations = (input: string): string[] => {
  const results: string[] = []

  const recurse = (index: number, current: string): void => {
    if (index === input.length) {
      results.push(current)
      return
    }

    if (input[index] === '*') {
      recurse(index + 1, current + '0')
      recurse(index + 1, current + '1')
    } else {
      recurse(index + 1, current + input[index])
    }
  }

  recurse(0, '')

  return results
}
