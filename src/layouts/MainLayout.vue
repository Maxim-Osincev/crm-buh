<template>
  <q-layout>
    <q-header elevated class="bg-black">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title>Бухгалтерия</q-toolbar-title>
<!--        <q-space></q-space>-->
<!--        <q-btn color="primary" :label="currentCurrency.icon">-->
<!--          <q-menu anchor="top right" self="top left" :offset="[5, 0]">-->
<!--            <q-list>-->
<!--              <q-item v-for="currency in currencies" :key="currency.id" clickable v-close-popup @click="setCurrentCurrency(currency)">-->
<!--                <q-item-section>-->
<!--                  {{ currency.name }}-->
<!--                </q-item-section>-->
<!--              </q-item>-->
<!--            </q-list>-->
<!--          </q-menu>-->
<!--        </q-btn>-->
      </q-toolbar>
    </q-header>

    <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="500"
        bordered
        class="bg-grey-3"
    >
      <q-scroll-area class="fit">
        <q-list>

          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item
                clickable
                :active="menuItem.name === currentRoute.name"
                v-ripple
                @click="() => onClickMenuItem(menuItem)"
            >
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index"  v-if="menuItem.separator" />
          </template>

        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page class="relative-position">
        <q-scroll-area class="absolute-full" :content-style="{ padding: '16px' }" :content-active-style="{ padding: '16px' }">
          <slot></slot>
        </q-scroll-area>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { currencies } from "@/views/currenciesList";

const menuList = [
  {
    icon: 'attach_money',
    label: 'Счета',
    name: 'accounts',
    separator: true
  },
  {
    icon: 'history',
    label: 'История',
    name: 'history',
    separator: true
  },
  {
    icon: 'category',
    label: 'Категории',
    name: 'categories',
    separator: true
  },
  {
    icon: 'next_plan',
    label: 'Цели',
    name: 'goals',
    separator: true
  },
  {
    icon: 'account_balance',
    label: 'Обязательства',
    name: 'obligations',
    separator: true
  },
  {
    icon: 'add',
    label: 'Новая запись',
    name: 'create-note',
    separator: true
  },
]

export default {
  name: "MainLayout",
  setup () {
    const activeItem = ref('Счета');
    const router = useRouter();
    const currentRoute = useRoute();

    function onClickMenuItem (item: {label: string, name: string}) {
      activeItem.value = item.label;
      router.push({name: item.name});
    }

    const currentCurrency = ref({id: 1, name: 'Доллар', icon: '$',});
    const getCurrentCurrency = computed(() => currentCurrency.value.icon)
    function setCurrentCurrency (currency: {id: number, name: string, icon: string}) {
      currentCurrency.value = currency;
    }

    return {
      drawer: ref(false),
      activeItem,
      menuList,
      currencies,
      onClickMenuItem,
      currentCurrency,
      getCurrentCurrency,
      setCurrentCurrency,
      currentRoute,
    }
  }
}
</script>

<style scoped>

</style>
