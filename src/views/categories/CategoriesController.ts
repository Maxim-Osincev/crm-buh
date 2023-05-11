import {CategoriesModel} from "@/views/categories/CategoriesModel";
import {Category} from "@/views/categories/CategoriesTypes";

export class CategoriesController {
    model: CategoriesModel

    constructor(model: CategoriesModel) {
        this.model = model;
    }

    getCurrentCategories (): Promise<Category[]> {
        return this.model.getCurrentCategories();
    }

    addCategory (nameNewCategory: string, parentNode: string): Promise<Category[]> {
        return this.model.addCategory(nameNewCategory, parentNode);
    }

    getCategoriesLabels (categories: Category[]): string[] {
        return this.model.getCategoriesLabels(categories);
    }
}
