import {get, post, put} from '../network';

const baseUrl = 'http://7e59a980e652.ngrok.io/api/programs';
const urls = {
  totalPrograms: baseUrl + '/total-program',
  moves: baseUrl + '/move',
};
const totalPrograms = {
  getAll: async () => {
    return get(urls.totalPrograms);
  },
  getById: async (id) => {
    return get(urls.totalPrograms + '/' + id);
  },
  post: async (body) => {
    return post(urls.totalPrograms, body);
  },
  put: async (body) => {
    return put(urls.totalPrograms, body);
  },
};
const moveEntity = {
  getMoveById: async (id) => {
    return get(urls.moves + '/' + id);
  },
  post: async (body) => {
    return post(urls.moves, body);
  },
  put: async (body) => {
    return put(urls.moves, body);
  },
};
export {totalPrograms};
