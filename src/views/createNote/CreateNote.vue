<template>
  <div class="q-mb-md">
    <q-input v-model="noteData.date" label="Дата" />
    <q-select v-model="noteData.type" label="Тип" :options="types" />
    <q-input v-model="noteData.value" label="Сумма" type="number" />
    <q-select v-model="noteData.currency" label="Валюта" :options="currencies.map((currency) => currency.name)" />
    <q-select v-model="noteData.category" label="Категория" :options="categories" />
    <q-select v-model="noteData.goal" label="Цель" :options="goalsList.map((el) => el.name)" />
    <q-input v-model="noteData.comment" label="Комментарий" type="textarea" />
  </div>
  <div class="row justify-end">
    <q-btn color="primary" label="Создать" no-caps />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { currencies } from '@/views/currenciesList'

interface Note {
  date: string | Date,
  type: string,
  value: number,
  currency: string,
  category: string,
  goal: string,
  comment: string,
}

const noteData = reactive<Note>({
  date: '',
  type: '',
  value: 0,
  currency: '',
  category: '',
  goal: '',
  comment: '',
})

const types = ['Приход', 'Расход'];

const categories = ref(['Обязательства', 'Бытовые расходы', 'Аренда квартиры', 'Коммуналка', 'Продукты', 'Еда', 'Алкоголь', 'Гулянки', 'Бары', 'Рестораны', 'Зарплата']);

interface Goal {
  readonly id: number,
  name: string,
  currentValue: number,
  goalValue: number,
  currency: string | null,
  currencyIcon: string,
  type: string | null,
}
const goalsList = ref<Goal[]>([]);
goalsList.value = [
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
</script>

<style scoped>

</style>
