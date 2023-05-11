let obligations = [
    {
        id: 1,
        name: 'Кредит',
        description: 'Кредит на машину',
        paymentDate: '28',
        dateEnd: '28.04.2024',
    },
    {
        id: 2,
        name: 'Аренда',
        description: 'Аренда за квартиру в Турции',
        paymentDate: '20',
        dateEnd: '20.01.2024',
    },
    {
        id: 3,
        name: 'ТО',
        description: 'ТО по машине',
        paymentDate: '10',
        dateEnd: '10.05.2024',
    },
];

const getCurrentObligations = (req, res) => {
    res.send(obligations);
}

const createObligations = (req, res) => {
    obligations.push({
        id: obligations.length + 1,
        ...req.body,
    })

    res.send(obligations);
}

const deleteObligations = (req, res) => {
    obligations = obligations.filter(el => el.id !== req.body.id);

    res.send(obligations);
}

module.exports = {
    getCurrentObligations,
    createObligations,
    deleteObligations,
}
