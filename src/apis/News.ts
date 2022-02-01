import { NewsDatum, DatumType } from '../common/models/News';
import Base from './Base';

const NewsAPI = {
    getNews: async (newsType: string) => {
        return Base.auth().get<NewsDatum<DatumType>[]>(
            `/news/${newsType}`
        );
    }
};

export default NewsAPI;