import { createContext } from "react";
import { AUTH_ACTIONS } from "./AuthActions";

export const AuthContext = createContext(null);

export const initialAuthState = {
  user: null,
  userData: null,
  loading: true,
  error: null,
  isAuthenticated: false,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload.user,
        userData: action.payload.userData,
        isAuthenticated: !!action.payload.user,
        loading: false,
        error: null,
      };

    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case AUTH_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        userData: null,
        isAuthenticated: false,
        error: null,
      };

    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      throw new Error(`Acción desconocida en authReducer: ${action.type}`);
  }
};
