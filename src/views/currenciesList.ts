export interface Currency {
    id: number,
    name: string,
    icon: string,
}

export const currencies: Currency[] = [
    {
        id: 1,
        name: 'Доллар',
        icon: '$',
    },
    {
        id: 2,
        name: 'Лира',
        icon: '₺',
    },
    {
        id: 3,
        name: 'Рубль',
        icon: '₽',
    },
]
