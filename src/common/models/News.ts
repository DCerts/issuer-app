enum NewsType {
    GROUP_CREATED = 'group_created',
    BATCH_CREATED = 'batch_created',
}

interface NewsDatum<T> {
    type: NewsType;
    datum: T;
}

interface News<T> {
    type: NewsType;
    data: T[];
}

type DatumType = number | string;

export default News;
export type {
    NewsDatum, DatumType
};
export {
    NewsType
};