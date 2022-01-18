import { Role } from '.';

interface Account {
    id: string,
    role?: Role,
    name?: string,
    birthday?: string,
    email?: string,
    nonce?: string
}

export const EMPTY: Account = {
    id: ''
};

export default Account;