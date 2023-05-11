export interface Account {
    id: number,
    currency: string,
    currentValue: number,
    accountName: string,
    expenses: number,
}

export interface EditingAccountType {
    accountName: string,
    currency: string,
    currentValue: number,
}
