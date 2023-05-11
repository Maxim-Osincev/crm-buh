import {GoalsModel} from "@/views/goals/GoalsModel";
import {Goal} from "@/views/goals/GoalsTypes";

export class GoalsController {
    model: GoalsModel

    constructor(model: GoalsModel) {
        this.model = model
    }

    getCurrentGoals (): Promise<Goal[]> {
        return this.model.getCurrentGoals();
    }

    createGoal (goal: Goal): Promise<Goal[]> {
        return this.model.createGoal(goal);
    }

    deleteGoal (id: number): Promise<Goal[]> {
        return this.model.deleteGoal(id);
    }

    editGoal (goal: Goal): Promise<Goal[]> {
        return this.model.editGoal(goal);
    }
}
