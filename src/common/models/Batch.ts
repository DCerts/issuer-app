import Certificate from './Certificate';

interface Batch {
    regNo: string;
    onChainId?: number;
    group: number;
    creator?: string;
    issued?: boolean;
    certificates: Certificate[];
}

export default Batch;