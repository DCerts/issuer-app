import { NewsDatum, DatumType } from '../common/models/News';
import Base from './Base';

const NewsAPI = {
    getNews: async () => {
        return Base.auth().get<NewsDatum<DatumType>[]>(`/news`);
    }
};

export default NewsAPI;