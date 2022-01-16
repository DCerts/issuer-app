import Group from '../common/models/Group';
import Base from './Base';

const GroupAPI = {
    createGroup: async (group: Group) => {
        return Base.auth().put(
            `/groups/${group.id}`,
            group
        );
    },
    getGroup: async (id: number) => {
        return Base.auth().get<Group>(`/groups/${id}`);
    }
};

export default GroupAPI;