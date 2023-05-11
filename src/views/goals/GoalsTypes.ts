export interface Goal {
    readonly id?: number,
    name: string,
    currentValue: number,
    goalValue: number,
    currency: string | null,
    currencyIcon: string,
    type: string | null,
}

export interface CreateGoalFields {
    name: string,
    goalValue: number,
    currency: string | null,
    type: string | null,
}
