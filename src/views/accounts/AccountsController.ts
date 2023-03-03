import {AccountsModel} from "@/views/accounts/AccountsModel";
import {Account, EditingAccountType} from "@/views/accounts/AccountsTypes";

export class AccountsController {
    model: AccountsModel

    constructor(model: AccountsModel) {
        this.model = model;
    }

    getCurrentAccounts (): void {
        this.model.getCurrentAccounts();
    }

    createAccount (data: EditingAccountType): void {
        this.model.createAccount(data);
    }

    deleteAccount (id: number): void {
        this.model.deleteAccount(id);
    }

    saveAccountName (editingAccount: Account): void {
        this.model.saveAccountName(editingAccount);
    }

}
