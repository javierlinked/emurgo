import { ClosingAccount, RebalancingTx, RecipientAccount } from './types'

export const newRebalancingTx = (
  closingAccounts: ClosingAccount[],
  recipientAccounts: RecipientAccount[]
): RebalancingTx => {
  validateEmptyAccounts(closingAccounts, recipientAccounts)

  const totalClosingAmount = getTotal(closingAccounts.map(x => x.amount))
  const totalRecipientAmount = getTotal(recipientAccounts.map(x => x.credit))

  if (totalClosingAmount <= totalRecipientAmount) {
    throw new Error('Not enough funds for rebalance')
  }

  let transfers: any[] = []
  let closingIdx = 0
  let recipientIdx = 0

  let currentClosingAccount = closingAccounts[closingIdx]
  let currentRecipientAccount = recipientAccounts[recipientIdx]

  while (currentClosingAccount && currentRecipientAccount) {
    const amount = currentClosingAccount.amount
    const credit = currentRecipientAccount.credit
    const transferAmount = Math.min(amount, credit)

    transfers = [
      ...transfers,
      [
        currentClosingAccount.accountId,
        currentRecipientAccount.accountId,
        transferAmount
      ]
    ]

    if (transferAmount === amount) {
      closingIdx++
      currentClosingAccount = closingAccounts[closingIdx]
    } else {
      currentClosingAccount = {
        ...currentClosingAccount,
        amount: amount - transferAmount
      }
    }

    if (transferAmount === credit) {
      recipientIdx++
      currentRecipientAccount = recipientAccounts[recipientIdx]
    } else {
      currentRecipientAccount = {
        ...currentRecipientAccount,
        credit: credit - transferAmount
      }
    }
  }

  const currentNumberOfTransfers = transfers.length


  checkTotalFunds(totalClosingAmount, totalRecipientAmount, currentNumberOfTransfers)

  // If totalClosingAmount greater than sum of totalRecipientAmount and fee => there are will be addition transfers
  if (
    totalClosingAmount >
    totalRecipientAmount + currentNumberOfTransfers * 10
  ) {
    // Subtract fee from remainder amount
    const remainderClosingAccounts = [
      ...[currentClosingAccount],
      ...closingAccounts.slice(closingIdx + 1, undefined)
    ]

    // Here we need to create addition transfers for remainderClosingAccounts and also consider about fee subtraction
    // So the number of addition transfers will be between 1 and remainderClosingAccounts's lenght
    let numberOfAdditionTransfers = remainderClosingAccounts.length
    let totalFee = (currentNumberOfTransfers + numberOfAdditionTransfers) * 10
    let lastClosingAccountRemainAmount = 0
    let sum = 0
    for (let i = remainderClosingAccounts.length - 1; i >= 0; i--) {
      sum = sum + remainderClosingAccounts[i]!.amount
      if (sum > totalFee) {
        lastClosingAccountRemainAmount = sum - totalFee
        break
      }
      numberOfAdditionTransfers--
      totalFee = (currentNumberOfTransfers + numberOfAdditionTransfers) * 10
    }

    if (numberOfAdditionTransfers < 1) {
      throw new Error('not enough funds for rebalance')
    }

    // Add transfers to newly created recipient account with accountId equal null
    for (let i = 0; i < numberOfAdditionTransfers; i++) {
      const isLast = i === numberOfAdditionTransfers - 1
      transfers = [
        ...transfers,
        [
          remainderClosingAccounts[i]!.accountId,
          null,
          isLast
            ? lastClosingAccountRemainAmount
            : remainderClosingAccounts[i]!.amount
        ]
      ]
    }
  }

  return {
    transfers,
    operationalFee: transfers.length * 10
  }
}

// If totalClosingAmount less than sum of totalRecipientAmount and fee => throw not enough funds error
function checkTotalFunds(totalClosingAmount: number, totalRecipientAmount: number, currentNumberOfTransfers: number): void {
  if (totalClosingAmount <
    totalRecipientAmount + currentNumberOfTransfers * 10) {
    throw new Error('Not enough funds for rebalance')
  }
}

function validateEmptyAccounts (closingAccounts: ClosingAccount[], recipientAccounts: RecipientAccount[]): void {
  if (closingAccounts.some(item => item.amount <= 0) ||
    recipientAccounts.some(item => item.credit <= 0)) {
    throw new Error('Invalid transaction')
  }
}

function getTotal (values: number[]): number {
  return values.reduce(
    (acc, value) => acc + value,
    0
  )
}
