import {get, post, put} from "../network";


const baseUrl = 'http://192.168.0.19:9086/api/programs'
const urls = {
  totalPrograms: baseUrl + "/total-program",
  weeklyPrograms: baseUrl + "/weekly-program",
  dailyPrograms: baseUrl + "/daily-program"
}
const totalPrograms = {
  getAll: async () => {
    return get(urls.totalPrograms);
  },
  getById: async (id) => {
    return get(urls.totalPrograms + '/' + id)
  },
  post: async (body) => {
    return post(urls.totalPrograms, body)
  },
  put: async (body) => {
    return put(urls.totalPrograms, body)
  }
}
const weeklyPrograms = {
  getAllByTotalProgramId: async (id) => {
    return get(urls.weeklyPrograms + "/" + id);
  }
}
const dailyPrograms = {
  getAllByWeeklyProgramId: async (id) => {
    return get(urls.dailyPrograms + "/" + id);
  },
  post: async (body) => {
    return post(urls.dailyPrograms, body);
  },
  put: async (body) => {
    return put(urls.dailyPrograms, body);
  }

}
export {totalPrograms, weeklyPrograms};