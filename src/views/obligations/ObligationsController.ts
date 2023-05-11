import {ObligationsModel} from "@/views/obligations/ObligationsModel";
import {Obligation} from "@/views/obligations/ObligationsTypes";

export class ObligationsController {
    model: ObligationsModel

    constructor(model: ObligationsModel) {
        this.model = model;
    }

    getCurrentObligations (): Promise<Obligation[]> {
        return this.model.getCurrentObligations();
    }

    createObligation (obligation: Obligation) {
        return this.model.createObligation(obligation);
    }

    deleteObligation (id: number) {
        return this.model.deleteObligation(id);
    }
}
