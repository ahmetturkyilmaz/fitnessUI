import {get, post, put} from '../network';
import {TotalProgram} from "../../model/TotalProgram";
import {MoveSet} from "../../model/MoveSet";

const baseUrl = 'http://192.168.0.19:9086/api/programs';
const urls = {
    totalPrograms: baseUrl + '/total-program',
    moves: baseUrl + '/move',
};
const totalProgramsNetwork = {

    getAll: async () => {
        return get(urls.totalPrograms);
    },
    getById: async (id) => {
        return get(urls.totalPrograms + '/' + id);
    },
    post: async (totalProgram: TotalProgram) => {
        return post(urls.totalPrograms, totalProgram);
    },
    put: async (totalProgram: TotalProgram) => {
        return put(urls.totalPrograms, totalProgram);
    },
};
const moveEntity = {

    getMoveById: async (id) => {
        return get(urls.moves + '/' + id);
    },
    post: async (moveSet: MoveSet) => {
        return post(urls.moves, moveSet);
    },
    put: async (moveSet: MoveSet) => {
        return put(urls.moves, moveSet);
    },
};
export {totalProgramsNetwork};
