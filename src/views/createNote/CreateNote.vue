<template>
  <q-form @submit="createNote">
    <div class="q-mb-md">
      <q-input
          v-model="noteData.date"
          label="Дата"
          mask="##.##.####"
          lazy-rules
          :rules="[ (val) => validateDate(val) || 'Некорректная дата']"
      />
      <q-select v-model="noteData.type" label="Тип" :options="types" :rules="[ (val) => val && val.length > 0 || 'Выберите тип']" />
      <q-input v-model="noteData.value" label="Сумма" type="number" :rules="[ (val) => val && Number(val) >= 0 || 'Неверная сумма']" />
      <q-select
          v-model="noteData.currency"
          label="Валюта"
          :options="currencies.map((currency) => currency.name)"
          :rules="[ (val) => val && val.length > 0 || 'Выберите валюту']"
      />
      <q-select
          v-model="noteData.category"
          label="Категория"
          :options="categoriesLabels"
          :rules="[ (val) => val && val.length > 0 || 'Выберите категорию']"
      />
      <q-select v-model="noteData.goal" label="Цель" :options="goalsList.map((el) => el.name)" />
      <q-input v-model="noteData.comment" label="Комментарий" type="textarea" />
    </div>
    <div class="row justify-end">
      <q-btn color="primary" label="Создать" no-caps type="submit" />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { currencies } from '@/views/currenciesList'
import { Note } from './CreateNoteTypes'
import { Goal } from '@/views/goals/GoalsTypes'
import {GoalsModel} from "@/views/goals/GoalsModel";
import {GoalsController} from "@/views/goals/GoalsController";
import {CategoriesModel} from "@/views/categories/CategoriesModel";
import {CategoriesController} from "@/views/categories/CategoriesController";
import {HistoryModel} from "@/views/history/HistoryModel";
import {HistoryController} from "@/views/history/HistoryController";
import {validateDate} from "@/helpers/validateFunctions";
import moment from "moment";
import {AccountsModel} from "@/views/accounts/AccountsModel";
import {AccountsController} from "@/views/accounts/AccountsController";
import {Account} from "@/views/accounts/AccountsTypes";

const noteData = reactive<Note>({
  date: moment().format('DD.MM.YYYY'),
  type: 'Приход',
  value: 0,
  currency: '',
  category: '',
  goal: '',
  comment: '',
})

const types = ['Приход', 'Расход'];

const categoriesLabels = ref<string[]>([]);
const categoriesModel = new CategoriesModel();
const categoriesController = new CategoriesController(categoriesModel);
categoriesController.getCurrentCategories().then(data => {
  categoriesLabels.value = categoriesController.getCategoriesLabels(data);
})



const goalsList = ref<Goal[]>([]);
const goalsModel = new GoalsModel();
const goalsController = new GoalsController(goalsModel);

goalsController.getCurrentGoals().then(data => {
  goalsList.value = data;
})

const historyModel = new HistoryModel();
const historyController = new HistoryController(historyModel);
function createNote () {
  historyController.addHistoryRow({createdAt: moment().toDate(), ...noteData}).then(async () => {

    //Accounts
    const accountsModel = new AccountsModel();
    const accountsController = new AccountsController(accountsModel);
    const accounts = await accountsController.getCurrentAccounts();
    const editingAccount = accounts.find(el => el.currency === noteData.currency);

    if (editingAccount) {
      if (noteData.type === 'Приход') {
        editingAccount.currentValue += +noteData.value;
      } else if (noteData.type === 'Расход') {
        editingAccount.currentValue -= +noteData.value;
      }
    } else {
      alert('Счет не найден!');
      return;
    }

    //Goals
    const goalsModel = new GoalsModel();
    const goalsController = new GoalsController(goalsModel);
    const goals = await goalsController.getCurrentGoals();
    const goal = goals.find(el => el.name === noteData.goal);

    if (goal && noteData.currency === goal.currency) {
      if (noteData.type === 'Приход') {
        goal.currentValue += +noteData.value;
      } else if (noteData.type === 'Расход') {
        goal.currentValue -= +noteData.value;
      }
    } else if (goal && noteData.currency !== goal.currency) {
      alert('Валюта цели не соответствует заданной!');
      return;
    }

    await accountsController.editAccount(editingAccount as Account);
    if (goal) {
      await goalsController.editGoal(goal as Goal);
    }

    alert('Created!');
  });
}
</script>

<style scoped>

</style>
