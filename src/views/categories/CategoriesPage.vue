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
    <q-tree
        :nodes="categoriesNodes"
        node-key="label"
        no-connectors
        v-model:expanded="expandedNodes"
    >
      <template v-slot:default-header="prop">
        <div class="row items-center full-width">
          <div>{{ prop.node.label }}</div>
          <q-space />
          <q-btn @click.stop="clickParentNode(prop.node.label)" icon="add" size="md" unelevated round dense />
        </div>
      </template>
    </q-tree>
    <q-separator class="q-my-sm" />

    <div class="row justify-end">
      <q-btn color="primary" label="Добавить категорию" size="md" no-caps unelevated dense @click="showModal = true" />
    </div>

    <q-dialog v-model="showModal">
      <q-card class="full-width" style="max-width: 800px;">
        <q-card-section>
          <div class="text-h5">Создать категорию</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input v-model="nameNewCategory" label="Название" />
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Отмена" v-close-popup />
          <q-btn flat label="Создать" v-close-popup @click="addCategory" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import {CategoriesModel} from "@/views/categories/CategoriesModel";
import {CategoriesController} from "@/views/categories/CategoriesController";
import {Category} from "@/views/categories/CategoriesTypes";

const categoriesNodes = ref<Category[]>([]);
const showModal = ref<boolean>(false);
const nameNewCategory = ref<string>('');
const parentNode = ref<string>('');
const expandedNodes = ref<string[]>([]);

const model = new CategoriesModel();
const controller = new CategoriesController(model);

const loading = ref<boolean>(false);

function getCurrentCategories () {
  loading.value = true;
  controller.getCurrentCategories().then(data => {
    categoriesNodes.value = data;
    loading.value = false;
  });
}
getCurrentCategories();

function addCategory () {
  controller.addCategory(nameNewCategory.value, parentNode.value).then(() => {
    nameNewCategory.value = '';
    getCurrentCategories();
  })
}

watch(showModal, (value: boolean): void => {
  if (!value) {
    parentNode.value = '';
  }
})

function clickParentNode (parentNodeLabel: string): void {
  showModal.value = true;
  parentNode.value = parentNodeLabel;
}
</script>

<style scoped>

</style>
