let historiesList = [
    {
        id: 1,
        date: '21.02.2023',
        type: 'Приход',
        value: 15000,
        currency: 'Доллар',
        category: 'Продукты',
        goal: '-',
        comment: 'Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий ',
    },
    {
        id: 2,
        date: '21.02.2023',
        type: 'Приход',
        value: 3000,
        currency: 'Доллар',
        category: 'Зарплата',
        goal: '-',
        comment: 'Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий ',
    },
    {
        id: 3,
        date: '23.02.2023',
        type: 'Приход',
        value: 13000,
        currency: 'Лира',
        category: 'Бытовые расходы',
        goal: '-',
        comment: '',
    },
    {
        id: 4,
        date: '17.02.2023',
        type: 'Приход',
        value: 4000,
        currency: 'Рубль',
        category: 'Гулянки',
        goal: '-',
        comment: 'Комментарий 2',
    },
    {
        id: 5,
        date: '19.02.2023',
        type: 'Расход',
        value: 5000,
        currency: 'Доллар',
        category: 'Гулянки',
        goal: '-',
        comment: 'Комментарий 2',
    },
    {
        id: 6,
        date: '19.02.2023',
        type: 'Расход',
        value: 300,
        currency: 'Доллар',
        category: 'Продукты',
        goal: '-',
        comment: 'Комментарий 2',
    },
    {
        id: 7,
        date: '24.02.2023',
        type: 'Расход',
        value: 8000,
        currency: 'Лира',
        category: 'Продукты',
        goal: '-',
        comment: '',
    },
    {
        id: 8,
        date: '25.02.2023',
        type: 'Расход',
        value: 3000,
        currency: 'Лира',
        category: 'Продукты',
        goal: '-',
        comment: '',
    },
    {
        id: 9,
        date: '27.02.2023',
        type: 'Расход',
        value: 2500,
        currency: 'Рубль',
        category: 'Обязательства',
        goal: '-',
        comment: 'Аренда квартиры',
    },
];

const getHistory = (req, res) => {
    res.send(historiesList);
}

const deleteHistoryRow = (req, res) => {
    historiesList = historiesList.filter(el => el.id !== req.body.id);

    res.send(historiesList);
}

const addHistoryRow = (req, res) => {
    historiesList.push({
        id: historiesList.length + 1,
        ...req.body
    });

    res.send(historiesList);
}

module.exports = {
    getHistory,
    deleteHistoryRow,
    addHistoryRow,
}
