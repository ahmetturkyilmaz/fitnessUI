import {GET_AUTH, UserActionTypes} from '../actionTypes';
import {getAuth} from '../../../repository/auth/user';
import {LoginRequest} from '../../../types/auth/LoginRequest';

export function getAuthAction(
  loginRequest: LoginRequest,
  showLoading: boolean,
): UserActionTypes {
  return async (dispatch) => {
    // setLoadingStateAction(showLoading && true)(dispatch);

    const result = await getAuth(loginRequest);
    //    setLoadingStateAction(showLoading && false)(dispatch);
    return dispatch({
      type: GET_AUTH,
      response: result,
    });
  };
}
