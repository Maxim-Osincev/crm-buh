<template>
  <div v-if="loading" class="absolute-full z-max" style="background: rgba(255,255,255,0.8)">
    <q-spinner
        class="absolute-center"
        color="primary"
        size="3em"
        :thickness="2"
    />
  </div>
  <div class="row">
    <div class="row column col-md-3 col-12 q-col-gutter-md relative-position">
      <div v-for="account in accounts" :key="account.id">
        <q-card class="my-card relative-position">

          <q-btn class="absolute-top-right" style="top: 8px;right: 8px; z-index: 1" size="sm" unelevated round dense icon="more_vert">
            <q-menu style="z-index: 1" anchor="top right" self="top right">
              <q-list>
                <q-item @click="editAccountName(account)" clickable v-close-popup>
                  <q-item-section>Редактировать название счета</q-item-section>
                </q-item>
                <q-item @click="deleteAccount(account.id)" clickable v-close-popup>
                  <q-item-section>Удалить счет</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>

          <q-card-section>
            <div class="text-h6 q-pr-md ellipsis">{{ account.accountName }}</div>
            <div class="text-h5 text-weight-bold q-mb-md">{{ `${account.currentValue}${getIconCurrency(account.currency)}` }}</div>
            <div>Траты в текущем месяце:</div>
            <div class="text-weight-bold">{{ `${getMonthExpenses(account.currency)}${getIconCurrency(account.currency)}` }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="col-auto"></div>
  </div>

  <add-button
      @click="showModalCreateAccount = true"
  />
  <q-dialog v-model="showModalCreateAccount" @hide="clearFieldsModal">
    <q-card class="full-width" style="max-width: 800px;">
      <q-card-section>
        <div class="text-h5">Создание счета</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input v-model="modalCreateFields.accountName" label="Название" />
        <q-select v-model="modalCreateFields.currency" label="Валюта" :options="currencies.map(el => el.name)" />
        <q-input v-model="modalCreateFields.currentValue" label="Текущий баланс" type="number" />
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="Отмена" v-close-popup />
        <q-btn @click="createAccount(modalCreateFields)" flat label="Создать" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="showModalAccountName">
    <q-card class="full-width" style="max-width: 800px;">
      <q-card-section>
        <div class="text-h5">Название счета</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input v-model="editingAccount.accountName" label="Название" />
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn @click="saveAccountName(editingAccount)" flat label="Сохранить" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { currencies } from "@/views/currenciesList";
import AddButton from '@/components/buttons/AddButton';
import {AccountsModel} from "@/views/accounts/AccountsModel";
import {AccountsController} from "@/views/accounts/AccountsController";
import {Account, EditingAccountType} from "@/views/accounts/AccountsTypes";
import {HistoryModel} from "@/views/history/HistoryModel";
import {HistoryController} from "@/views/history/HistoryController";
import {HistoryRow} from "@/views/history/HistoryTypes";
import moment from "moment";

const accounts = ref<Account[]>([]);
const showModalCreateAccount = ref<boolean>(false);
const showModalAccountName = ref<boolean>(false);
const editingAccount = ref<Account | null>(null);
const modalCreateFields = ref<EditingAccountType>({
  accountName: '',
  currency: '',
  currentValue: 0,
});
const loading = ref<boolean>(false);

const model = new AccountsModel();
const controller = new AccountsController(model);

function getCurrentAccounts (): void {
  loading.value = true;
  controller.getCurrentAccounts().then(data => {
    accounts.value = data;
    loading.value = false;
  })
}
getCurrentAccounts();

function createAccount (modalCreateFields: EditingAccountType) {
  controller.createAccount(modalCreateFields).then(() => {
    getCurrentAccounts();
  })
}

function deleteAccount (id: number): void {
  controller.deleteAccount(id).then(() => {
    getCurrentAccounts();
  })
}

function saveAccountName (editingAccount: Account) {
  controller.editAccount(editingAccount).then(() => {
    getCurrentAccounts();
  })
}

function editAccountName (account: Account): void {
  showModalAccountName.value = true;
  editingAccount.value = { ...account };
}

function clearFieldsModal (): void {
  modalCreateFields.value = {
    accountName: '',
    currency: '',
    currentValue: 0,
  };
}

function getIconCurrency (currencyName: string): string {
  const currency = currencies.find(el => el.name === currencyName);
  if (currency) {
    return currency.icon;
  }
  return '';
}

const history = ref<HistoryRow[]>([]);
const historyModel = new HistoryModel();
const historyController = new HistoryController(historyModel);

historyController.getHistory().then(data => {
  history.value = data;
})
function getMonthExpenses (currencyName: string): number {
  return history.value.filter(row => {
    return row.currency === currencyName && row.type === 'Расход' && moment(row.date, 'DD.MM.YYYY').month() === moment().month()
  }).reduce((acc, row) => acc + +row.value, 0);
}
</script>

<style scoped>

</style>
