import React, { createContext, useReducer } from 'react';

const initialContext = {
  account: null,
  setAccount: () => {}
};

const appReducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_ACCOUNT':
      return {
        ...state,
        account: payload
      };

    default:
      return state;
  }
};

const AppContext = createContext(initialContext);
export const useAppContext = () => React.useContext(AppContext);
/* eslint react/prop-types: 0 */
export const AppContextProvider = ({ children }) => {
  const [store, dispatch] = useReducer(appReducer, initialContext);

  const contextValue = {
    account: store.account,
    setAccount: (account) => {
      dispatch({ type: 'SET_ACCOUNT', payload: account });
    }
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
