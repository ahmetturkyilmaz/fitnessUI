import {deleteById, get, post, put} from '../network';
import {TotalProgram} from '../../types/program/TotalProgram';

const baseUrl = 'http://192.168.0.19:9086/api/programs';
const urls = {
  totalPrograms: baseUrl + '/total-program',
  moves: baseUrl + '/move',
};
const totalProgramsNetwork = {
  getAll: async (): Promise<TotalProgram[]> => {
    return get(urls.totalPrograms).then((response) => response.data);
  },
  getById: async (id: string | number): Promise<TotalProgram> => {
    return get(urls.totalPrograms + '/' + id).then((response) => response.data);
  },
  post: async (totalProgram: TotalProgram) => {
    return post(urls.totalPrograms, totalProgram);
  },
  put: async (totalProgram: TotalProgram | undefined) => {
    return put(urls.totalPrograms, totalProgram);
  },
  delete: async (id: string | number) => {
    return deleteById(urls.totalPrograms + '/' + id);
  },
};
export {totalProgramsNetwork};
