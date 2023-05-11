import {computed, reactive, ref, watch} from "vue";
import {initRows, pagination, rows} from "@/views/history/tableOptions";
import moment from "moment/moment";
import {currencies} from "@/views/currenciesList";

export const currencyChart = ref('Доллар');

export const filterOptions = reactive({
    startDate: '',
    endDate: '',
    categories: [],
    currencies: [],
    minSum: '',
    maxSum: '',
});
export const categories = reactive(['Обязательства', 'Бытовые расходы', 'Аренда квартиры', 'Коммуналка', 'Продукты', 'Еда', 'Алкоголь', 'Гулянки', 'Бары', 'Рестораны', 'Зарплата']);

export function resetFilterOptions () {
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

export function applyFilterOptions () {
    rows.value = initRows.value;

    if (filterOptions.startDate) {
        rows.value = rows.value.filter((el) => {
            const rowDate = moment(el['date'], 'DD.MM.YYYY');
            const filterStartDate = moment(filterOptions.startDate, 'DD.MM.YYYY');

            return rowDate.isAfter(filterStartDate) || rowDate.isSame(filterStartDate);
        });
    }

    if (filterOptions.endDate) {
        rows.value = rows.value.filter((el) => {
            const rowDate = moment(el['date'], 'DD.MM.YYYY');
            const filterEndDate = moment(filterOptions.endDate, 'DD.MM.YYYY');

            return rowDate.isBefore(filterEndDate) || rowDate.isSame(filterEndDate);
        });
    }

    if (filterOptions.categories.length > 0) {
        rows.value = rows.value.filter((row) => filterOptions.categories.includes(row['category']));
    }

    if (filterOptions.currencies.length > 0) {
        const currenciesNames = currencies.filter((el) => filterOptions.currencies.includes(el.name)).map((el) => el.icon);

        rows.value = rows.value.filter((row) => {
            return currenciesNames.includes(row['currency']);
        });
    }

    if (filterOptions.minSum) {
        rows.value = rows.value.filter((el) => Number(el['value']) >= Number(filterOptions.minSum));
    }

    if (filterOptions.maxSum) {
        rows.value = rows.value.filter((el) => Number(el['value']) <= Number(filterOptions.maxSum));
    }

    pagination.value = { ...pagination.value };
    updateList(currencyChart.value);
}

const categoriesMatrix = reactive({
    'Приход': {},
    'Расход': {},
});
export const dataComing = reactive({
    labels: [],
    datasets: [
        {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
            data: [],
        },
    ]
});
export const dataConsumption = reactive({
    labels: [],
    datasets: [
        {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
            data: []
        }
    ]
});

export function getListCurrentCurrency (arr, currencyChart) {
    const currencyData = currencies.find((el) => el.name === currencyChart);
    const filterRows = arr.filter((el) => el.currency === currencyData.name);
    filterRows.forEach((el) => {
        const type = el.type;
        const category = el.category;
        const value = el.value;
        if (!categoriesMatrix[type][category]) {
            categoriesMatrix[type][category] = +value;
        } else {
            categoriesMatrix[type][category] += +value;
        }
    });
    dataComing.labels = Object.keys(categoriesMatrix['Приход']);
    dataComing.datasets[0].data = Object.values(categoriesMatrix['Приход']);

    dataConsumption.labels = Object.keys(categoriesMatrix['Расход']);
    dataConsumption.datasets[0].data = Object.values(categoriesMatrix['Расход']);
}

watch(currencyChart, (value) => updateList(value));

export const searchField = ref('');
watch(searchField, (value) => {
    rows.value = initRows.value.filter((el) => el['comment'].toLowerCase().startsWith(value));
    updateList(currencyChart.value);
})

export const isActiveFilters = computed(() => {
    const filters = Object.values(filterOptions);
    return filters.filter((el) => el.length > 0 ? el : false).length > 0;
});

export function updateList (value = currencyChart.value) {
    categoriesMatrix['Приход'] = {};
    categoriesMatrix['Расход'] = {};
    getListCurrentCurrency(rows.value, value);
}
