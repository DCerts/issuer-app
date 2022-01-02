import Base from './Base';


const Auth = {
    fetchNonce: async (publicAddress: string) => {
        return Base.get<string>(
            `/auth/nonce/${publicAddress}`
        );
    },
    authenticate: async (signature: string, publicAddress: string) => {
        return Base.post<string>(
            `/auth`,
            {
                address: publicAddress,
                signature: signature
            }
        );
    }
};

export default Auth;