import {HistoryRow} from "@/views/history/HistoryTypes";
import axios from "axios";
import moment from "moment";

export class HistoryModel {

    getHistory (): Promise<HistoryRow[]> {
        return axios.get('/history').then(res => {
            return res.data.sort((a: HistoryRow, b: HistoryRow) => {
                const difference = moment(b.date, 'DD.MM.YY').valueOf() - moment(a.date, 'DD.MM.YY').valueOf();
                if (difference === 0 ) {
                    return moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf();
                }
                return difference;
            })
        });
    }

    deleteHistoryRow (id: number): Promise<HistoryRow[]> {
        return axios.delete('/history', { data: { id: id } }).then(res => res.data);
    }

    addHistoryRow (row: HistoryRow): Promise<HistoryRow[]> {
        return axios.patch('/history', row).then(res => res.data);
    }
}
