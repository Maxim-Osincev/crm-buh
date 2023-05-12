import {HistoryModel} from "@/views/history/HistoryModel";
import {HistoryRow} from "@/views/history/HistoryTypes";

export class HistoryController {
    model: HistoryModel;

    constructor (model: HistoryModel) {
        this.model = model;
    }

    getHistory (): Promise<HistoryRow[]> {
        return this.model.getHistory();
    }

    deleteHistoryRow (id: number): Promise<HistoryRow[]> {
        return this.model.deleteHistoryRow(id);
    }

    addHistoryRow (row: HistoryRow): Promise<HistoryRow[]> {
        return this.model.addHistoryRow(row);
    }
}
