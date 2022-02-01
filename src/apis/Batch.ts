import Batch from '../common/models/Batch';
import Base from './Base';

const BatchAPI = {
    createBatch: async (batch: Batch) => {
        return Base.auth().put(
            `/batches/${batch.regNo}`,
            batch
        );
    },
    getBatch: async (regNo: string) => {
        return Base.auth().get<Batch>(`/batches/${regNo}`);
    },
    getCreatedBatches: async (groupId: number) => {
        return Base.auth().get<Batch[]>(`/batches?group_id=${groupId}`);
    }
};

export default BatchAPI;