<template>
  <div>
    <div v-if="loading" class="absolute-full z-max" style="background: rgba(255,255,255,0.8)">
      <q-spinner
          class="absolute-center"
          color="primary"
          size="3em"
          :thickness="2"
      />
    </div>
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
                  <q-item clickable v-close-popup @click="deleteHistoryRow(props.row.id)">
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
import { ref } from 'vue';
import { currencies } from '@/views/currenciesList';
import { Doughnut } from 'vue-chartjs';
import { options } from "@/views/history/HistoryChartOptions";
import { HistoryModel } from "@/views/history/HistoryModel";
import { HistoryController } from "@/views/history/HistoryController";
import { initRows, rows, columns, pagination, pagesNumber } from "@/views/history/tableOptions";
import {
  filterOptions,
  categories,
  resetFilterOptions,
  applyFilterOptions,
  updateList,
  currencyChart,
  dataComing,
  dataConsumption,
  searchField,
  isActiveFilters,
} from "@/views/history/filterOptions";

const model = new HistoryModel();
const controller = new HistoryController(model);

const loading = ref(false);

function getHistory () {
  loading.value = true;
  controller.getHistory().then(data => {
    rows.value = [...data];
    initRows.value = [...data];

    updateList();
    loading.value = false;
  })
}
getHistory();

function deleteHistoryRow (id) {
  controller.deleteHistoryRow(id).then(() => {
    getHistory();
  })
}

</script>

<style scoped>

</style>
