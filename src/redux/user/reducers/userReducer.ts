import React from 'react';

const userReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        userToken: payload.token,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...state,
        isSignout: false,
        userToken: payload.token,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isSignout: true,
        userToken: null,
      };
  }
};
