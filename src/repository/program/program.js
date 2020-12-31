import Axios from "axios";
import {getAccessToken} from "../AuthHelper";


const baseUrl = 'http://192.168.0.19:9086/api/total-programs'
const urls = {
    totalPrograms: baseUrl + "totalProgram"
}
const AuthStr = getAccessToken();
const totalPrograms = {
    getAllTotalPrograms: (params, successCallback: () => {}, errorCallback?: () => {}, setLoadingStateFn) => {
        return Axios.get(urls.totalPrograms, params, successCallback, errorCallback, setLoadingStateFn);
    }
}
