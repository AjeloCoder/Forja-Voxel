import React, { useReducer, useEffect, useMemo } from "react";
import { AUTH_ACTIONS } from "./AuthActions";
import { AuthContext, authReducer, initialAuthState } from "./AuthContext";
import { auth } from "../firebase/config";
import { authService } from "../firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userData = await authService.getUserData(firebaseUser.uid);
          dispatch({
            type: AUTH_ACTIONS.SET_USER,
            payload: { user: firebaseUser, userData },
          });
        } catch (error) {
          dispatch({
            type: AUTH_ACTIONS.SET_ERROR,
            payload: error.message,
          });
          dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
        }
      } else {
        dispatch({
          type: AUTH_ACTIONS.LOGOUT,
        });
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
      }
    });

    return unsubscribe;
  }, []);

  const value = useMemo(
    () => ({
      user: state.user,
      userData: state.userData,
      loading: state.loading,
      error: state.error,
      isAuthenticated: state.isAuthenticated,

      signup: async (email, password, userData) => {
        try {
          dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
          const user = await authService.signup(email, password, userData);
          const userDataFetched = await authService.getUserData(user.uid);
          dispatch({
            type: AUTH_ACTIONS.SET_USER,
            payload: { user, userData: userDataFetched },
          });
          return user;
        } catch (error) {
          dispatch({
            type: AUTH_ACTIONS.SET_ERROR,
            payload: error.message,
          });
          throw error;
        }
      },

      login: async (email, password) => {
        try {
          dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
          const user = await authService.login(email, password);
          const userDataFetched = await authService.getUserData(user.uid);
          dispatch({
            type: AUTH_ACTIONS.SET_USER,
            payload: { user, userData: userDataFetched },
          });
          return user;
        } catch (error) {
          dispatch({
            type: AUTH_ACTIONS.SET_ERROR,
            payload: error.message,
          });
          throw error;
        }
      },

      logout: async () => {
        try {
          dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
          await authService.logout();
          dispatch({ type: AUTH_ACTIONS.LOGOUT });
        } catch (error) {
          dispatch({
            type: AUTH_ACTIONS.SET_ERROR,
            payload: error.message,
          });
          throw error;
        }
      },

      updateUserData: async (userData) => {
        try {
          if (state.user) {
            await authService.updateUserData(state.user.uid, userData);
            const updatedUserData = await authService.getUserData(state.user.uid);
            dispatch({
              type: AUTH_ACTIONS.SET_USER,
              payload: { user: state.user, userData: updatedUserData },
            });
          }
        } catch (error) {
          dispatch({
            type: AUTH_ACTIONS.SET_ERROR,
            payload: error.message,
          });
          throw error;
        }
      },

      clearError: () => {
        dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
      },
    }),
    [state]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
