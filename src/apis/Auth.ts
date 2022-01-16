import Base from './Base';


const AuthAPI = {
    fetchNonce: async (publicAddress: string) => {
        return Base.noAuth().get<string>(
            `/auth/${publicAddress}/nonce`
        );
    },
    authenticate: async (signature: string, publicAddress: string) => {
        return Base.noAuth().post<string>(
            `/auth/${publicAddress}`,
            {
                signature: signature
            }
        );
    }
};

export default AuthAPI;