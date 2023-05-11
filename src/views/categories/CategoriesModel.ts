import {Category} from "@/views/categories/CategoriesTypes";
import axios from "axios";

export class CategoriesModel {

    getCurrentCategories (): Promise<Category[]> {
        return axios.get('/categories').then(res => res.data);
    }

    addCategory (nameNewCategory: string, parentNode: string): Promise<Category[]> {
        if (!parentNode) {
            return axios.patch('/categories', {
                label: nameNewCategory,
                children: [],
            }).then(res => res.data);
        }
        return axios.patch('/categories', {
            parentNode,
            category: {
                label: nameNewCategory,
                children: [],
            },
        }).then(res => res.data);
    }

    getCategoriesLabels (categories: Category[]): string[] {
        const result: string[] = [];

        categories.forEach((category: Category) => {
            result.push(category.label);
            if (category.children && category.children.length > 0) {
                result.push(...this.getCategoriesLabels(category.children));
            }
        })

        return result;
    }
}
