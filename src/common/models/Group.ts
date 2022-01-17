interface Group {
    id: number;
    name: string;
    threshold: number;
    members: string[];
    available?: boolean;
}

export default Group;