let categories = [
    {
        label: 'Бытовые расходы',
        children: [
            { label: 'Аренда квартиры', },
            { label: 'Коммуналка', },
        ]
    },
    {
        label: 'Продукты',
        children: [
            {
                label: 'Еда',
                children: [
                    { label: 'Сладости', }
                ],
            },
            { label: 'Алкоголь', },
        ]
    },
    {
        label: 'Гулянки',
        children: [
            { label: 'Бары', },
            { label: 'Рестораны', },
            { label: 'Кальянные', },
        ]
    }
];

const getCategories = (req, res) => {
    res.send(categories);
}
const addCategories = (req, res) => {
    if (!req.body.parentNode) {
        categories.push({
            id: categories.length + 1,
            ...req.body,
        });
        res.send(categories);
    } else {
        function editCategories (arr) {
            return arr.map((el) => {
                if (!el.children) {
                    el.children = [];
                }

                if (el.label === req.body.parentNode) {
                    el.children.push({ label: req.body.category.label, children: [] });
                } else if (el.children.length > 0) {
                    el.children = editCategories(el.children);
                }

                return el;
            });
        }
        categories = editCategories(categories);
        res.send(categories);
    }
}

module.exports = {
    getCategories,
    addCategories,
}
