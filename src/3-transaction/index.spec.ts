import { describe, expect, test } from '@jest/globals'
import { newRebalancingTx } from '.'

describe('newRebalancingTx', () => {
  test('should be able to create a rebalancing transaction', () => {
    const closingAccounts = [
      {
        accountId: '1',
        amount: 100
      },
      {
        accountId: '2',
        amount: 200
      }
    ]
    const recipientAccounts = [
      {
        accountId: '3',
        credit: 50
      },
      {
        accountId: '4',
        credit: 150
      }
    ]
    const rebalancingTx = newRebalancingTx(closingAccounts, recipientAccounts)
    expect(rebalancingTx).toEqual( {'operationalFee': 40, 'transfers': [['1', '3', 50], ['1', '4', 50], ['2', '4', 100], ['2', null, 60]]})
  })
})