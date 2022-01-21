import Base from './Base';
import { Account } from '../common/models';

const AccountAPI = {
    get: async () => {
        return Base.auth().get<Account>(
            `/accounts`
        );
    },
    getById: async (accountId: string) => {
        return Base.auth().get<Account>(
            `/accounts/${accountId}`
        );
    },
    getAll: async () => {
        return Base.auth().get<Account[]>(
            `/accounts/all`
        );
    },
    create: async (account: Account) => {
        return Base.auth().put(
            `/accounts/${account.id}`,
            account
        );
    }
};

export default AccountAPI;