import Axios from 'axios';
import {getAccessToken, removeAccessToken} from "./AuthHelper";
import {useNavigation} from "@react-navigation/core";

export const networkCallStack = [];
const get = (endpoint, params, successCallback, errorCallback, setLoadingStateFn = (state: boolean) => {
}, handleUnauthorizedAccess = true) => {
    const navigation = useNavigation();
    return Axios
        .get(
            `${endpoint}`,
            {
                params,
                headers: getAccessToken(),
                cancelToken: new Axios.CancelToken(((tokenFn) => {
                    // console.log('C', c);
                    networkCallStack.push(tokenFn);
                })),
            },
        )
        .then((response) => {
            if (successCallback !== undefined) {
                successCallback(response);
            }
            return response;
        })
        .catch((error) => {
            if (handleUnauthorizedAccess && error.response && error.response.status === 401) {
                console.log('Unauthorized request, redirecting...');
                removeAccessToken();
                navigation.navigate("LoginScreen")
            }

            if (errorCallback !== undefined) {
                errorCallback(error);
            }

            if (Axios.isCancel(error)) {
                // throw new Error('Request is closed!');
                console.error('Request is closed!');
                // return { status: StatusCodeEnum.CLOSED_REQUEST };
            }

            return error;
        });
}
const post = (endpoint, body, successCallback, errorCallback,
              // eslint-disable-next-line no-unused-vars
              setLoadingStateFn = (state: boolean) => {
              }, handleUnauthorizedAccess = true) => {
    setLoadingStateFn(true);
    const navigation = useNavigation();

    const axiosInstance = Axios.post(`${endpoint}`, body, {headers: getAccessToken()});
    if (successCallback !== undefined) {
        axiosInstance.then((response) => {
            successCallback(response);
            setLoadingStateFn(false);
        });
    }

    axiosInstance.catch((error) => {
        if (handleUnauthorizedAccess && error.response && error.response.status === 401) {
            console.log('Unauthorized request, redirecting...');
            removeAccessToken();
            navigation.navigate("LoginScreen")
        }

        if (errorCallback !== undefined) {
            errorCallback(error);
            setLoadingStateFn(false);
        }
    });

    return axiosInstance;
};