let goals = [
    {
        id: 1,
        name: 'Отдых',
        currentValue: 30000,
        goalValue: 40000,
        currency: 'Доллар',
        currencyIcon: '$',
        type: 'Заработать',
    },
    {
        id: 2,
        name: 'Подарки',
        currentValue: 3000,
        goalValue: 20000,
        currency: 'Доллар',
        currencyIcon: '$',
        type: 'Потратить',
    },
    {
        id: 3,
        name: 'Ipad',
        currentValue: 2000,
        goalValue: 5000,
        currency: 'Доллар',
        currencyIcon: '$',
        type: 'Заработать',
    },
    {
        id: 4,
        name: 'Еда и рестораны',
        currentValue: 0,
        goalValue: 2000,
        currency: 'Доллар',
        currencyIcon: '$',
        type: 'Потратить',
    },
];

const getGoals = (req, res) => {
    res.send(goals);
}
const createGoal = (req, res) => {
    goals.push({
        id: goals.length + 1,
        ...req.body
    });

    res.send(goals);
}
const deleteGoal = (req, res) => {
    goals = goals.filter(el => el.id !== req.body.id);

    res.send(goals);
}
const editGoal = (req, res) => {
    const { id } = req.params;
    let editingGoal = goals.find(el => el.id === Number(id));
    editingGoal = Object.assign(editingGoal, req.body);
    res.send(goals);
}

module.exports = {
    getGoals,
    createGoal,
    deleteGoal,
    editGoal,
}
