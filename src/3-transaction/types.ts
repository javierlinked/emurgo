export interface Account {
  accountId: String
}

export interface ClosingAccount extends Account {
  amount: number
}

export interface RecipientAccount extends Account {
  credit: number
}

export interface RebalancingTx {
  transfers: any[]
  operationalFee: number
}
