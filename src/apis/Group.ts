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
    },
    confirmGroup: async (id: number) => {
        return Base.auth().put(`/groups/${id}`);
    },
    getJoinedGroups: async () => {
        return Base.auth().get<Group[]>(`/groups`);
    }
};

export default GroupAPI;