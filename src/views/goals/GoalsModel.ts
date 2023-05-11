import axios from "axios";
import {Goal} from "@/views/goals/GoalsTypes";
import {Account} from "@/views/accounts/AccountsTypes";

export class GoalsModel {
    getCurrentGoals (): Promise<Goal[]> {
        return axios.get('/goals').then(res => res.data);
    }

    createGoal (goal: Goal): Promise<Goal[]> {
        return axios.post('/goals', goal).then(res => res.data);
    }

    deleteGoal (id: number): Promise<Goal[]> {
        return axios.delete('/goals', { data: { id: id } }).then(res => res.data);
    }

    editGoal (goal: Goal): Promise<Goal[]> {
        const { id } = goal as Goal;
        return axios.patch(`/goals/${id}`, goal).then(res => res.data);
    }
}
