import Group from '../common/models/Group';
import Base from './Base';

const GroupAPI = {
    createGroup: async (group: Group) => {
        return Base.auth().put(
            `/group/${group.id}`,
            group
        );
    },
    getGroup: async (id: string) => {
        return Base.auth().get(`/group/${id}`);
    }
};

export default GroupAPI;