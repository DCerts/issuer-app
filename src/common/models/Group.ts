interface Group {
    id: number;
    name: string;
    threshold: number;
    members: string[];
    available?: number;
}

export default Group;