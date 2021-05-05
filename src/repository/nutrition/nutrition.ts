import {deleteById, get, patch, post, put} from '../network';
import {UserNutritionInfo} from '../../types/nutrition/UserNutritionInfo';

const baseUrl = 'http://192.168.0.18:9085/api';
const urls = {
    userNutritionInfo: baseUrl + '/user-nutrition',
};
const UserNutritionInfoNetwork = {
    getAll: async (): Promise<UserNutritionInfo[]> => {
        return get(urls.userNutritionInfo).then(
          (response) => response);
    },
    getById: async (id: string | number): Promise<UserNutritionInfo> => {
        return get(urls.userNutritionInfo + '/' + id).then(
          (response) => response,
        );
    },
    post: async (userNutritionInfo: UserNutritionInfo) => {
        return post(urls.userNutritionInfo, userNutritionInfo);
    },
    put: async (userNutritionInfo: UserNutritionInfo | undefined) => {
        return put(urls.userNutritionInfo, userNutritionInfo);
    },
    patch: async (id: string | number, userNutritionInfo: any | undefined) => {
        return patch(urls.userNutritionInfo + '/' + id, userNutritionInfo);
    },
    delete: async (id: string | number) => {
        return deleteById(urls.userNutritionInfo + '/' + id);
    },
};
export {UserNutritionInfoNetwork};
