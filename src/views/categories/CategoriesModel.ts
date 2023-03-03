import {Category} from "@/views/categories/CategoriesTypes";
import {Ref} from "vue";

export class CategoriesModel {
    categories: Ref<Category[]>

    constructor (categories: Ref<Category[]>) {
        this.categories = categories;
    }

    getCurrentCategories (): void {
        this.categories.value = [
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
                    { label: 'Кальянные', },
                ]
            }
        ]
    }
}
