import Base from './Base';


interface Issuer {
    id: string,
    name: string,
    email: string,
    school: string,
    groups: Array<string>
}

const Account = {
    get: async () => {
        return Base.auth().get<Issuer>(
            `/issuer`
        );
    }
};

export default Account;
export type {
    Issuer
};