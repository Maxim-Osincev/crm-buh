import {Category} from "@/views/categories/CategoriesTypes";
import {Ref} from "vue";

export class CategoriesModel {
    categories: Ref<Category[]>
    parentNode: Ref<string>
    nameNewCategory: Ref<string>

    constructor (categories: Ref<Category[]>, parentNode: Ref<string>, nameNewCategory: Ref<string>) {
        this.categories = categories;
        this.parentNode = parentNode;
        this.nameNewCategory = nameNewCategory;
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

    addCategory (): void {
        if (!this.parentNode.value) {
            this.categories.value.push({
                label: this.nameNewCategory.value,
                children: [],
            });
        } else {
            this.categories.value = this.editCategories(this.categories.value);
        }
        this.nameNewCategory.value = '';
    }

    editCategories (arr: any[]): Category[] {
        return arr.map((el) => {
            if (!el.children) {
                el.children = [];
            }

            if (el.label === this.parentNode.value) {
                el.children.push({ label: this.nameNewCategory.value, children: [] });
            } else if (el.children.length > 0) {
                el.children = this.editCategories(el.children);
            }

            return el;
        });
    }
}
