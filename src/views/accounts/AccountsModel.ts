import {Account, EditingAccountType} from "@/views/accounts/AccountsTypes";
import axios from "axios";

export class AccountsModel {

    getCurrentAccounts (): Promise<Account[]> {
        return axios.get('/accounts').then(res => res.data);
    }

    createAccount (data: EditingAccountType): Promise<Account[]> {
        return axios.patch('/accounts', data);
    }

    deleteAccount (id: number): Promise<Account[]> {
        return axios.delete('accounts', { data: { id: id } });
    }

    editAccount (editingAccount: Account): Promise<Account[]> {
        const { id } = editingAccount as Account;
        return axios.patch(`/accounts/${id}`, editingAccount);
    }
}
