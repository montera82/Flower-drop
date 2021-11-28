import React, { createContext, useReducer } from 'react';

const initialContext = {
  showModal: false,
  setShowModal: () => {},
  metaMaskInstalled: false,
  setMetaMaskInstalled: () => {},
  account: null,
  setAccount: () => {},
  chainId: null,
  setChainId: () => {},
  mintingOneOfOne: false,
  setMintingOneOfOne: () => {},
  mintingNonCollector: false,
  setMintingNonCollector: () => {},
  mintingOpenEdition: false,
  setMintingOpenEdition: () => {},
  isOneOfOneCollector: false,
  setIsOneOfOneCollector: () => {},
  isNonCollector: false,
  setIsNonCollector: () => {},
  isOpenEditionCollector: false,
  setIsOpenEditionCollector: () => {},
  hasMintedOneOfOneCollection: false,
  setHasMintedOneOfOneCollection: () => {},
  hasMintedNonCollection: false,
  setHasMintedNonCollection: () => {},
  hasMintedOpenEditionCollection: false,
  setHasMintedOpenEditionCollection: () => {}
};

const appReducer = (state, { type, payload }) => {
  switch (type) {
    case 'SHOW_MODAL':
      return {
        ...state,
        showModal: payload
      };
    case 'SET_META_MASK_INSTALLED':
      return {
        ...state,
        metaMaskInstalled: payload
      };
    case 'SET_ACCOUNT':
      return {
        ...state,
        account: payload
      };
    case 'SET_CHAIN_ID':
      return {
        ...state,
        chainId: payload
      };
    case 'SET_MINTING_ONE_OF_ONE':
      return {
        ...state,
        mintingOneOfOne: payload
      };
    case 'SET_MINTING_NON_COLLECTOR':
      return {
        ...state,
        mintingNonCollector: payload
      };
    case 'SET_MINTING_OPEN_EDITION':
      return {
        ...state,
        mintingOpenEdition: payload
      };
    case 'SET_IS_ONE_OF_ONE_COLLECTOR':
      return {
        ...state,
        isOneOfOneCollector: payload
      };
    case 'SET_IS_NON_COLLECTOR':
      return {
        ...state,
        isNonCollector: payload
      };
    case 'SET_IS_OPEN_EDITION_COLLECTOR':
      return {
        ...state,
        isOpenEditionCollector: payload
      };

    case 'SET_HAS_MINTED_ONE_OF_ONE_COLLECTION':
      return {
        ...state,
        hasMintedOneOfOneCollection: payload
      };
    case 'SET_HAS_MINTED_NON_COLLECTION':
      return {
        ...state,
        hasMintedNonCollection: payload
      };
    case 'SET_HAS_MINTED_OPEN_EDITION_COLLECTION':
      return {
        ...state,
        hasMintedOpenEditionCollection: payload
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
    showModal: store.showModal,
    setShowModal: (result) => {
      dispatch({ type: 'SHOW_MODAL', payload: result });
    },
    metaMaskInstalled: store.metaMaskInstalled,
    setMetaMaskInstalled: (result) => {
      dispatch({ type: 'SET_META_MASK_INSTALLED', payload: result });
    },
    account: store.account,
    setAccount: (account) => {
      dispatch({ type: 'SET_ACCOUNT', payload: account });
    },
    chainId: store.chainId,
    setChainId: (chainId) => {
      dispatch({ type: 'SET_CHAIN_ID', payload: chainId });
    },
    mintingOneOfOne: store.mintingOneOfOne,
    setMintingOneOfOne: (result) => {
      dispatch({ type: 'SET_MINTING_ONE_OF_ONE', payload: result });
    },
    mintingNonCollector: store.mintingNonCollector,
    setMintingNonCollector: (result) => {
      dispatch({ type: 'SET_MINTING_NON_COLLECTOR', payload: result });
    },
    mintingOpenEdition: store.mintingOpenEdition,
    setMintingOpenEdition: (result) => {
      dispatch({ type: 'SET_MINTING_OPEN_EDITION', payload: result });
    },
    isOneOfOneCollector: store.isOneOfOneCollector,
    setIsOneOfOneCollector: (result) => {
      dispatch({ type: 'SET_IS_ONE_OF_ONE_COLLECTOR', payload: result });
    },
    isNonCollector: store.isNonCollector,
    setIsNonCollector: (result) => {
      dispatch({ type: 'SET_IS_NON_COLLECTOR', payload: result });
    },
    isOpenEditionCollector: store.isOpenEditionCollector,
    setIsOpenEditionCollector: (result) => {
      dispatch({ type: 'SET_IS_OPEN_EDITION_COLLECTOR', payload: result });
    },
    hasMintedOneOfOneCollection: store.hasMintedOneOfOneCollection,
    setHasMintedOneOfOneCollection: (result) => {
      dispatch({ type: 'SET_HAS_MINTED_ONE_OF_ONE_COLLECTION', payload: result });
    },
    hasMintedNonCollection: store.hasMintedNonCollection,
    setHasMintedNonCollection: (result) => {
      dispatch({ type: 'SET_HAS_MINTED_NON_COLLECTION', payload: result });
    },
    hasMintedOpenEditionCollection: store.hasMintedOpenEditionCollection,
    setHasMintedOpenEditionCollection: (result) => {
      dispatch({ type: 'SET_HAS_MINTED_OPEN_EDITION_COLLECTION', payload: result });
    }
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
