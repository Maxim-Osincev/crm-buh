import {CategoriesModel} from "@/views/categories/CategoriesModel";

export class CategoriesController {
    model: CategoriesModel

    constructor(model: CategoriesModel) {
        this.model = model;
    }

    getCurrentCategories (): void {
        this.model.getCurrentCategories();
    }

    addCategory (): void {
        this.model.addCategory();
    }
}
