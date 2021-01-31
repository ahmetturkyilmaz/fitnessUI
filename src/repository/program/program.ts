import {get, post, put} from '../network';
import {TotalProgram} from '../../types/TotalProgram';
import {MoveSet} from '../../types/MoveSet';

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
  put: async (totalProgram: TotalProgram) => {
    return put(urls.totalPrograms, totalProgram);
  },
};
const moveEntity = {
  getMoveById: async (id: string | number): Promise<MoveSet> => {
    return get(urls.moves + '/' + id).then((response) => response.data);
  },
  post: async (moveSet: MoveSet) => {
    return post(urls.moves, moveSet);
  },
  put: async (moveSet: MoveSet) => {
    return put(urls.moves, moveSet);
  },
};
export {totalProgramsNetwork};
