import Base from './Base';
import { Account } from '../common/models';

const AccountAPI = {
    get: async () => {
        return Base.auth().get<Account>(
            `/account`
        );
    }
};

export default AccountAPI;