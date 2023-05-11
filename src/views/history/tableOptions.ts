import {computed, reactive, ref} from "vue";
import {HistoryRow} from "@/views/history/HistoryTypes";

export const initRows = ref([]);
export const rows = ref([]);

export const columns = reactive([
    {
        name: 'date',
        required: true,
        label: 'Дата',
        align: 'left',
        field: (row: HistoryRow) => row.date,
        format: (val: any) => `${val}`,
        sortable: true
    },
    { name: 'type', align: 'left', label: 'Тип', field: 'type' },
    { name: 'value', align: 'left', label: 'Сумма', field: 'value', sortable: true },
    { name: 'currency', align: 'left', label: 'Валюта', field: 'currency' },
    { name: 'category', align: 'left', label: 'Категория', field: 'category' },
    { name: 'goal', align: 'left', label: 'Цель', field: 'goal' },
    { name: 'comment', align: 'left', label: 'Комментарий', field: 'comment' },
]);

export const pagination = ref({
    sortBy: 'desc',
    descending: false,
    page: 1,
    rowsPerPage: 15,
});
export const pagesNumber = computed(() => Math.ceil(rows.value.length / pagination.value.rowsPerPage));
