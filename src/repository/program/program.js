import {get, post} from "../network";


const baseUrl = 'http://192.168.0.19:9086/api/programs'
const urls = {
  totalPrograms: baseUrl + "/total-program",
  weeklyPrograms: baseUrl + "/weekly-program"
}
const totalPrograms = {
  getAll: async (params) => {
    return get(urls.totalPrograms, params);
  },
  post: async (body) => {
    return post(urls.totalPrograms, body)
  }
}
const weeklyPrograms = {
  getAllByTotalProgramId: async (id) => {
    return get(urls.weeklyPrograms + id)
  }
}
export {totalPrograms,weeklyPrograms};