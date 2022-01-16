import Base from './Base';
import { Account } from '../common/models';

const AccountAPI = {
    get: async () => {
        return Base.auth().get<Account>(
            `/accounts`
        );
    },
    getAll: async () => {
        return Base.auth().get<Account[]>(
            `/accounts/all`
        );
    }
};

export default AccountAPI;