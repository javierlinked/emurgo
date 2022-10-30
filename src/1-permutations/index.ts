// given a string with characters 0, 1 and *, return all possible combinations of 0 and 1
// for example, given '11*00*' return ['110000', '110001', '111000', '111001']

export const getPermutations = (input: string): string[] => {
  const results: string[] = []

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const recurse = (index: number, current: string) => {
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
