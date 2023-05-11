export interface Note {
    date: string | Date,
    type: 'Приход' | 'Расход',
    value: number,
    currency: string,
    category: string,
    goal: string,
    comment: string,
}
