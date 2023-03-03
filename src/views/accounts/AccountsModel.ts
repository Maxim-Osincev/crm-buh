import {Ref} from "vue";
import {Account, EditingAccountType} from "@/views/accounts/AccountsTypes";

export class AccountsModel {
    accounts: Ref<Account[]>

    constructor(accounts: Ref<Account[]>) {
        this.accounts = accounts;
    }

    getCurrentAccounts (): void {
        this.accounts.value = [
            {
                id: 1,
                currency: 'Доллар',
                currentValue: 150,
                accountName: 'Долларовый счет',
            },
            {
                id: 2,
                currency: 'Лира',
                currentValue: 10000,
                accountName: 'Лировый счет',
            },
            {
                id: 3,
                currency: 'Рубль',
                currentValue: 3000,
                accountName: 'Рублевый счет',
            },
        ]
    }

    createAccount (data: EditingAccountType): void {
        this.accounts.value.push({ id: this.accounts.value.length + 1, ...data });
    }

    deleteAccount (id: number): void {
        this.accounts.value = this.accounts.value.filter(el => el.id !== id);
    }

    saveAccountName (editingAccount: Account): void {
        const { id } = editingAccount as Account;
        this.accounts.value.forEach(el => {
            if (el.id === id) { el.accountName =  (editingAccount as Account).accountName}
        })
    }
}
