<template>
  <div>
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
import { ref, watch, reactive } from 'vue';

interface Category {
  label: string,
  children?: Category[],
}
const categoriesNodes = ref<Category[]>([
  {
    label: 'Бытовые расходы',
    children: [
      { label: 'Аренда квартиры', },
      { label: 'Коммуналка', },
    ]
  },
  {
    label: 'Продукты',
    children: [
      {
        label: 'Еда',
        children: [
          { label: 'Сладости', }
        ],
      },
      { label: 'Алкоголь', },
    ]
  },
  {
    label: 'Гулянки',
    children: [
      { label: 'Бары', },
      { label: 'Рестораны', },
      { label: 'Кальанные', },
    ]
  }
]);
const showModal = ref<boolean>(false);
const nameNewCategory = ref<string>('');
const parentNode = ref<string>('');
const expandedNodes = ref<string[]>([]);

watch(showModal, (value: boolean): void => {
  if (!value) {
    parentNode.value = '';
  }
})

function addCategory (): void {
  if (!parentNode.value) {
    categoriesNodes.value.push({
      label: nameNewCategory.value,
      children: [],
    });
  } else {
    categoriesNodes.value = reactive(editCategories(categoriesNodes.value));
  }
  nameNewCategory.value = '';
}

function editCategories (arr: any[]): Category[] {
  return arr.map((el) => {
    if (!el.children) {
      el.children = [];
    }

    if (el.label === parentNode.value) {
      el.children.push({ label: nameNewCategory.value, children: [] });
    } else if (el.children.length > 0) {
      el.children = editCategories(el.children);
    }

    return el;
  });
}

function clickParentNode (parentNodeLabel: string): void {
  showModal.value = true;
  parentNode.value = parentNodeLabel;
}
</script>

<style scoped>

</style>
