export interface HistoryRow {
    date: string | Date,
    type: 'Приход' | 'Расход',
    value: number,
    currency: string,
    category: string,
    goal: string,
    comment: string,
    createdAt: Date | string,
}

export interface FilterTypes {
    [key: number | string]: any,
    startDate: string,
    endDate: string,
    categories: string[],
    currencies: string[],
    minSum: string,
    maxSum: string,
}
