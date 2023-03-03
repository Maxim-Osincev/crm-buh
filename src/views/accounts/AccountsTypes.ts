export interface Account {
    id: number,
    currency: string | null,
    currentValue: number,
    accountName: string,
}

export interface EditingAccountType {
    accountName: string,
    currency: string | null,
    currentValue: number,
}
