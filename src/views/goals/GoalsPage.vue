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
    <div v-if="goalsList.length > 0">
      <q-card v-for="goal in goalsList" :key="goal.id" class="my-card q-mb-md relative-position">
        <q-btn
            class="absolute"
            style="z-index: 1;top: -8px;right: -8px;background: #ffffff"
            size="8px"
            icon="close"
            round
            dense
            @click="deleteGoal(goal.id)"
        />

        <q-card-section>
          <div class="row justify-between">
            <div style="font-size: 18px;">
              {{ goal.name }}
            </div>
            <div class="q-pa-sm" style="border-radius: 3px;"
                 :style="{background: goal.type === 'Заработать' ? '#20a32099' : '#e4262699'}">
              {{ goal.type }}
            </div>
          </div>
          <div class="relative-position q-pb-lg">
            <div class="row justify-between absolute-bottom full-width">
              <div>{{ `${goal.currentValue}${goal.currencyIcon}` }}</div>
              <div>{{ `${goal.goalValue}${goal.currencyIcon}` }}</div>
            </div>
            <q-linear-progress :value="goal.currentValue / goal.goalValue" class="q-mt-md"/>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div v-else-if="!loading && goalsList.length === 0">
      <div class="text-h6 text-center">Здесь еще ничего нет</div>
    </div>

    <add-button @click="showModalCreateGoal = true"/>
    <q-dialog v-model="showModalCreateGoal" @hide="clearFieldsModal">
      <q-card class="full-width" style="max-width: 800px;">
        <q-card-section>
          <div class="text-h5">Создание цели</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input v-model="modalCreateFields.name" label="Название"/>
          <q-input v-model="modalCreateFields.goalValue" label="Итоговая сумма" type="number"/>
          <q-select v-model="modalCreateFields.currency" label="Валюта" :options="currencies.map(el => el.name)"/>
          <q-select v-model="modalCreateFields.type" label="Тип" :options="typesGoal"/>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Отмена" v-close-popup/>
          <q-btn flat label="Создать" v-close-popup @click="createGoal"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue';
import {currencies} from "@/views/currenciesList";
import AddButton from '@/components/buttons/AddButton';
import {Goal} from "@/views/goals/GoalsTypes";
import {CreateGoalFields} from "@/views/goals/GoalsTypes";
import {GoalsModel} from "@/views/goals/GoalsModel";
import {GoalsController} from "@/views/goals/GoalsController";

const model = new GoalsModel();
const controller = new GoalsController(model);

const goalsList = ref<Goal[]>([]);
const loading = ref<boolean>(false);

function getCurrentGoals (): void {
  loading.value = true;
  controller.getCurrentGoals().then(data => {
    goalsList.value = data;
    loading.value = false;
  })
}
getCurrentGoals();

const showModalCreateGoal = ref<boolean>(false);

let modalCreateFields = reactive<CreateGoalFields>({
  name: '',
  goalValue: 0,
  currency: null,
  type: null,
});

const typesGoal = ['Заработать', 'Потратить'];

function clearFieldsModal(): void {
  modalCreateFields = reactive({
    name: '',
    goalValue: 0,
    currency: null,
    type: null,
  });
}

function createGoal(): void {
  const currencyIcon = currencies.find((el) => el.name === modalCreateFields.currency);
  controller.createGoal({
    currentValue: 0,
    currencyIcon: currencyIcon ? currencyIcon.icon : '$',
    ...modalCreateFields
  }).then(() => {
    clearFieldsModal();
    getCurrentGoals();
  })
}

function deleteGoal(id: number): void {
  controller.deleteGoal(id).then(() => {
    getCurrentGoals();
  })
}
</script>

<style scoped>

</style>
