const express = require('express')
const app = express()
const port = 5000

const accountsActions = require('./accounts/accountsActions');
const categoriesActions = require('./categories/categoriesActions');
const goalsActions = require('./goals/goalsActions');
const obligationsActions = require('./obligations/obligationsActions');
const historyActions = require('./history/historyActions');

app.use(express.json())


app.get('/accounts', accountsActions.getAccounts)
app.patch('/accounts', accountsActions.addAccount)
app.delete('/accounts', accountsActions.deleteAccount)
app.patch('/accounts/:id', accountsActions.editAccount)


app.get('/categories', categoriesActions.getCategories)
app.patch('/categories', categoriesActions.addCategories)
app.patch('/categories', categoriesActions.addCategories)


app.get('/history', historyActions.getHistory)
app.delete('/history', historyActions.deleteHistoryRow)
app.patch('/history', historyActions.addHistoryRow)


app.get('/goals', goalsActions.getGoals)
app.post('/goals', goalsActions.createGoal)
app.delete('/goals', goalsActions.deleteGoal)
app.patch('/goals/:id', goalsActions.editGoal)

app.get('/obligations', obligationsActions.getCurrentObligations)
app.post('/obligations', obligationsActions.createObligations)
app.delete('/obligations', obligationsActions.deleteObligations)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
