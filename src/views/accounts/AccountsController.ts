import {AccountsModel} from "@/views/accounts/AccountsModel";
import {Account, EditingAccountType} from "@/views/accounts/AccountsTypes";

export class AccountsController {
    model: AccountsModel

    constructor(model: AccountsModel) {
        this.model = model;
    }

    getCurrentAccounts (): Promise<Account[]> {
        return this.model.getCurrentAccounts();
    }

    createAccount (data: EditingAccountType): Promise<Account[]> {
        return this.model.createAccount(data);
    }

    deleteAccount (id: number): Promise<Account[]> {
        return this.model.deleteAccount(id);
    }

    editAccount (editingAccount: Account): Promise<Account[]> {
        return this.model.editAccount(editingAccount);
    }

}
