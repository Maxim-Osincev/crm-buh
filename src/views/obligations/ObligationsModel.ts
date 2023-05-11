import axios from "axios";
import {Obligation} from "@/views/obligations/ObligationsTypes";
import {Goal} from "@/views/goals/GoalsTypes";

export class ObligationsModel {
    getCurrentObligations (): Promise<Obligation[]> {
        return axios.get('/obligations').then(res => res.data);
    }

    createObligation (obligation: Obligation): Promise<Obligation[]> {
        return axios.post('/obligations', obligation).then(res => res.data);
    }

    deleteObligation (id: number): Promise<Obligation[]> {
        return axios.delete('/obligations', { data: { id: id } }).then(res => res.data);
    }
}
