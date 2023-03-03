<template>
  <div>
    <div class="row justify-end items-center q-mb-md q-gutter-md">
      <q-input v-model="searchField" type="search" dense label="Поиск" :input-style="{ fontSize: '16px' }">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <div class="relative-position">
        <q-btn unelevated round dense icon="filter_alt">
          <q-menu :key="filterOptions" style="z-index: 1;" anchor="top right" self="top right">
            <q-list style="max-width: 400px;">
              <q-item clickable>
                <q-item-section>
                  <div class="row items-end q-col-gutter-md">
                    <q-input v-model="filterOptions.startDate" class="col-6" dense mask="##.##.####" hint="Начало периода">
                      <template v-slot:prepend>
                        <q-icon name="event" />
                      </template>
                    </q-input>
                    <q-input v-model="filterOptions.endDate" class="col-6" dense mask="##.##.####" hint="Конец периода">
                      <template v-slot:prepend>
                        <q-icon name="event" />
                      </template>
                    </q-input>
                  </div>
                </q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>
                  <q-select v-model="filterOptions.categories" label="Категория" :options="categories" multiple />
                </q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>
                  <q-select v-model="filterOptions.currencies" label="Валюта" :options="currencies.map((el) => el.name)" multiple />
                </q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>
                  <div class="row items-end q-col-gutter-md">
                    <q-input
                        v-model="filterOptions.minSum"
                        type="number"
                        class="col-6"
                        dense
                        hint="Сумма от"
                    />
                    <q-input
                        v-model="filterOptions.maxSum"
                        type="number"
                        class="col-6"
                        dense
                        hint="Сумма от"
                    />
                  </div>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <div class="row justify-end">
                    <q-btn color="primary" flat label="Сбросить" @click="resetFilterOptions" />
                    <q-btn color="primary" flat label="Применить" @click="applyFilterOptions" v-close-popup />
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <div v-if="isActiveFilters" style="position: absolute; bottom: 6px; right: 6px; width: 5px;height: 5px;background: #ff5858;border-radius: 100%;"></div>
      </div>
    </div>
    <q-select v-model="currencyChart" label="Валюта графиков" :options="currencies.map(el => el.name)" style="max-width: 200px;" />
    <div class="row">
      <div class="col-6 text-center text-h6 text-weight-bold">Приход</div>
      <div class="col-6 text-center text-h6 text-weight-bold">Расход</div>
    </div>
    <div class="row q-mb-lg">
      <div class="col-6">
        <Doughnut v-if="dataComing.labels.length > 0" :key="`${rows}${currencyChart}`" :data="dataComing" :options="options" />
        <div v-else class="text-center text-subtitle1 q-my-xl" style="font-style: italic;">Недостаточно данных для составления графика</div>
      </div>
      <div class="col-6">
        <Doughnut v-if="dataConsumption.labels.length > 0" :key="`${rows}${currencyChart}`" :data="dataConsumption" :options="options" />
        <div v-else class="text-center text-subtitle1 q-my-xl" style="font-style: italic;">Недостаточно данных для составления графика</div>
      </div>
    </div>
    <q-separator class="q-my-lg" />
    <q-table
        dense
        :rows="rows"
        :columns="columns"
        row-key="name"
        v-model:pagination="pagination"
        :rows-per-page-options="[15, 25, 50, 100, 200]"
        flat
        no-data-label="Записей не найдено"
    >

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              style="font-weight: 700; font-size: 16px;"
          >
            {{ col.label }}
          </q-th>
          <q-th auto-width />
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              class="ellipsis overflow-hidden"
              style="max-width: 150px;"
          >
            {{ col.value }}
          </q-td>
          <q-td auto-width>
            <q-btn size="sm" unelevated round dense icon="more_vert">
              <q-menu style="z-index: 1" anchor="top right" self="top right">
                <q-list>
                  <q-item clickable v-close-popup>
                    <q-item-section>Добавить комментарий</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section>Удалить запись</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-td>
        </q-tr>
      </template>

    </q-table>
    <div class="row justify-end q-mt-md">
      <q-pagination
          v-model="pagination.page"
          color="grey-8"
          :max="pagesNumber"
          size="sm"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, watch } from 'vue';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Doughnut } from 'vue-chartjs';
import { options } from './HistoryChartOptions';
import { currencies } from '@/views/currenciesList';
import moment from 'moment';

ChartJS.register(ArcElement, Tooltip, Legend, Title, BarElement, CategoryScale, LinearScale);

const columns = reactive([
  {
    name: 'date',
    required: true,
    label: 'Дата',
    align: 'left',
    field: row => row.date,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'type', align: 'left', label: 'Тип', field: 'type' },
  { name: 'value', align: 'left', label: 'Сумма', field: 'value', sortable: true },
  { name: 'currency', align: 'left', label: 'Валюта', field: 'currency' },
  { name: 'category', align: 'left', label: 'Категория', field: 'category' },
  { name: 'goal', align: 'left', label: 'Цель', field: 'goal' },
  { name: 'comment', align: 'left', label: 'Комментарий', field: 'comment' },
]);
const initRows = ref([
  {
    date: '21.02.2023',
    type: 'Приход',
    value: 15000,
    currency: '$',
    category: 'Продукты',
    goal: '-',
    comment: 'Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий ',
  },
  {
    date: '21.02.2023',
    type: 'Приход',
    value: 3000,
    currency: '$',
    category: 'Зарплата',
    goal: '-',
    comment: 'Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий ',
  },
  {
    date: '23.02.2023',
    type: 'Приход',
    value: 13000,
    currency: '₺',
    category: 'Бытовые расходы',
    goal: '-',
    comment: '',
  },
  {
    date: '17.02.2023',
    type: 'Приход',
    value: 4000,
    currency: '₽',
    category: 'Гулянки',
    goal: '-',
    comment: 'Комментарий 2',
  },
  {
    date: '19.02.2023',
    type: 'Расход',
    value: 5000,
    currency: '$',
    category: 'Гулянки',
    goal: '-',
    comment: 'Комментарий 2',
  },
  {
    date: '19.02.2023',
    type: 'Расход',
    value: 300,
    currency: '$',
    category: 'Продукты',
    goal: '-',
    comment: 'Комментарий 2',
  },
  {
    date: '24.02.2023',
    type: 'Расход',
    value: 8000,
    currency: '₺',
    category: 'Продукты',
    goal: '-',
    comment: '',
  },
  {
    date: '25.02.2023',
    type: 'Расход',
    value: 3000,
    currency: '₺',
    category: 'Продукты',
    goal: '-',
    comment: '',
  },
  {
    date: '27.02.2023',
    type: 'Расход',
    value: 2500,
    currency: '₽',
    category: 'Обязательства',
    goal: '-',
    comment: 'Аренда квартиры',
  },
]);
let rows = ref([
  {
    date: '21.02.2023',
    type: 'Приход',
    value: 15000,
    currency: '$',
    category: 'Продукты',
    goal: '-',
    comment: 'Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий ',
  },
  {
    date: '21.02.2023',
    type: 'Приход',
    value: 3000,
    currency: '$',
    category: 'Зарплата',
    goal: '-',
    comment: 'Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий Комментарий ',
  },
  {
    date: '23.02.2023',
    type: 'Приход',
    value: 13000,
    currency: '₺',
    category: 'Бытовые расходы',
    goal: '-',
    comment: '',
  },
  {
    date: '17.02.2023',
    type: 'Приход',
    value: 4000,
    currency: '₽',
    category: 'Гулянки',
    goal: '-',
    comment: 'Комментарий 2',
  },
  {
    date: '19.02.2023',
    type: 'Расход',
    value: 5000,
    currency: '$',
    category: 'Гулянки',
    goal: '-',
    comment: 'Комментарий 2',
  },
  {
    date: '19.02.2023',
    type: 'Расход',
    value: 300,
    currency: '$',
    category: 'Продукты',
    goal: '-',
    comment: 'Комментарий 2',
  },
  {
    date: '24.02.2023',
    type: 'Расход',
    value: 8000,
    currency: '₺',
    category: 'Продукты',
    goal: '-',
    comment: '',
  },
  {
    date: '25.02.2023',
    type: 'Расход',
    value: 3000,
    currency: '₺',
    category: 'Продукты',
    goal: '-',
    comment: '',
  },
  {
    date: '27.02.2023',
    type: 'Расход',
    value: 2500,
    currency: '₽',
    category: 'Обязательства',
    goal: '-',
    comment: 'Аренда квартиры',
  },
]);

let pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 15,
});
const pagesNumber = computed(() => Math.ceil(rows.value.length / pagination.value.rowsPerPage));


const searchField = ref('');
watch(searchField, (value) => {
  rows.value = ref(initRows.value.filter((el) => el.comment.toLowerCase().startsWith(value)));
})

const filterOptions = reactive({
  startDate: '',
  endDate: '',
  categories: [],
  currencies: [],
  minSum: '',
  maxSum: '',
});
const categories = reactive(['Обязательства', 'Бытовые расходы', 'Аренда квартиры', 'Коммуналка', 'Продукты', 'Еда', 'Алкоголь', 'Гулянки', 'Бары', 'Рестораны', 'Зарплата']);

function resetFilterOptions () {
  Object.keys(filterOptions).forEach((key) => {
    switch (typeof filterOptions[key]) {
      case 'string':
        filterOptions[key] = '';
        break;
      case 'object':
        Array.isArray(filterOptions[key] ? filterOptions[key] = [] : filterOptions[key] = {});
        break;
      case 'number':
        filterOptions[key] = 0;
        break;
      default:
        filterOptions[key] = null;
        break;
    }
  });
  rows.value = initRows.value;
  applyFilterOptions();
}

const isActiveFilters = computed(() => {
  const filters = Object.values(filterOptions);
  return filters.filter((el) => el.length > 0 ? el : false).length > 0;
});

function applyFilterOptions () {
  rows.value = initRows.value;

  if (filterOptions.startDate) {
    rows.value = rows.value.filter((el) => {
      const rowDate = moment(el.date, 'DD.MM.YYYY');
      const filterStartDate = moment(filterOptions.startDate, 'DD.MM.YYYY');

      return rowDate.isAfter(filterStartDate) || rowDate.isSame(filterStartDate);
    });
  }

  if (filterOptions.endDate) {
    rows.value = rows.value.filter((el) => {
      const rowDate = moment(el.date, 'DD.MM.YYYY');
      const filterEndDate = moment(filterOptions.endDate, 'DD.MM.YYYY');

      return rowDate.isBefore(filterEndDate) || rowDate.isSame(filterEndDate);
    });
  }

  if (filterOptions.categories.length > 0) {
    rows.value = rows.value.filter((row) => filterOptions.categories.includes(row.category));
  }

  if (filterOptions.currencies.length > 0) {
    const currenciesNames = currencies.filter((el) => filterOptions.currencies.includes(el.name)).map((el) => el.icon);

    rows.value = rows.value.filter((row) => {
      return currenciesNames.includes(row.currency);
    });
  }

  if (filterOptions.minSum) {
    rows.value = rows.value.filter((el) => Number(el.value) >= Number(filterOptions.minSum));
  }

  if (filterOptions.maxSum) {
    rows.value = rows.value.filter((el) => Number(el.value) <= Number(filterOptions.maxSum));
  }

  pagination.value = { ...pagination.value };
  updateList(currencyChart.value);
}


const dataComing = reactive({
  labels: [],
  datasets: [
    {
      backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
      data: [],
    },
  ]
});
const dataConsumption = reactive({
  labels: [],
  datasets: [
    {
      backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
      data: []
    }
  ]
});
let categoriesMatrix = reactive({
  'Приход': {},
  'Расход': {},
});

const currencyChart = ref('Доллар');

function getListCurrentCurrency (arr, currencyChart) {
  const currencyData = currencies.find((el) => el.name === currencyChart);
  const filterRows = arr.filter((el) => el.currency === currencyData.icon);
  filterRows.forEach((el) => {
    const type = el.type;
    const category = el.category;
    const value = el.value;
    if (!categoriesMatrix[type][category]) {
      categoriesMatrix[type][category] = value;
    } else {
      categoriesMatrix[type][category] += value;
    }
  });
  dataComing.labels = Object.keys(categoriesMatrix['Приход']);
  dataComing.datasets[0].data = Object.values(categoriesMatrix['Приход']);

  dataConsumption.labels = Object.keys(categoriesMatrix['Расход']);
  dataConsumption.datasets[0].data = Object.values(categoriesMatrix['Расход']);
}
getListCurrentCurrency(rows.value, currencyChart.value);

watch(currencyChart, (value) => updateList(value));

function updateList (value) {
  categoriesMatrix['Приход'] = {};
  categoriesMatrix['Расход'] = {};
  getListCurrentCurrency(rows.value, value);
}

</script>

<style scoped>

</style>
