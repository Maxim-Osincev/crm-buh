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
    <div v-if="obligationsList.length > 0">
      <q-card v-for="obligation in obligationsList" :key="obligation.id" class="my-card q-mb-md relative-position">
        <q-btn
            class="absolute"
            style="z-index: 1;top: -6px;right: -6px;background: #ffffff"
            size="8px"
            icon="close"
            round
            dense
            @click="deleteObligation(obligation.id)"
        />

        <q-card-section>
          <div class="q-mb-sm">
            <div class="text-h6">{{ obligation.name }}</div>
            <div style="color: rgba(63,63,63,0.85);">{{ obligation.description }}</div>
          </div>
          <div class="row justify-between">
            <div>
              <div class="text-weight-bold" style="font-size: 16px;">Дата платежа:</div>
              <div>
                <span class="text-weight-bold" style="margin-right: 3px;font-size: 14px;text-decoration: underline;">{{ obligation.paymentDate }}</span>
                <span>числа каждого месяца</span>
              </div>
            </div>
            <div>
              <div class="text-weight-bold" style="font-size: 16px;">Дата окончания:</div>
              <div class="text-right">{{ obligation.dateEnd }}</div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div v-else-if="!loading && obligationsList.length === 0">
      <div class="text-h6 text-center">Здесь еще ничего нет</div>
    </div>

    <add-button @click="showModalCreateObligation = true" />
    <q-dialog v-model="showModalCreateObligation" @hide="clearFieldsModal">
      <q-card class="full-width" style="max-width: 800px;">
        <q-card-section>
          <div class="text-h5">Создание обязательства</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input v-model="modalCreateFields.name" label="Название" />
          <q-input v-model="modalCreateFields.description" label="Описание" />
          <q-input v-model="modalCreateFields.paymentDate" hint="Дата платежа" />
          <q-input v-model="modalCreateFields.dateEnd" mask="##.##.####" hint="Дата окончания">
            <template v-slot:prepend>
              <q-icon name="event" />
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Отмена" v-close-popup />
          <q-btn flat label="Создать" v-close-popup @click="createObligation" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue';
import AddButton from '@/components/buttons/AddButton';
import {Obligation} from "@/views/obligations/ObligationsTypes";
import {CreateObligationFields} from "@/views/obligations/ObligationsTypes";
import {ObligationsModel} from "@/views/obligations/ObligationsModel";
import {ObligationsController} from "@/views/obligations/ObligationsController";

const model = new ObligationsModel();
const controller = new ObligationsController(model);

let obligationsList = ref<Obligation[]>([]);
const loading = ref<boolean>(false);

function getCurrentObligations () {
  loading.value = true;
  controller.getCurrentObligations().then(data => {
    obligationsList.value = data;
    loading.value = false;
  })
}
getCurrentObligations();

function deleteObligation (id: number): void {
  controller.deleteObligation(id).then(() => {
    getCurrentObligations();
  })
}

const showModalCreateObligation = ref<boolean>(false);
let modalCreateFields = reactive<CreateObligationFields>({
  name: '',
  description: '',
  paymentDate: '',
  dateEnd: '',
});

function createObligation (): void {
  controller.createObligation(modalCreateFields).then(() => {
    getCurrentObligations();
  })
}

function clearFieldsModal (): void {
  modalCreateFields = reactive({
    name: '',
    description: '',
    paymentDate: '',
    dateEnd: '',
  });
}

</script>

<style scoped>

</style>
