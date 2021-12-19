import { ethers } from 'ethers';
import WalletConnectProvider from '@walletconnect/web3-provider';
// import { useAppContext } from '../AppContext';

export function getWallectConnectProvider() {
  const walletConnectProvider = new WalletConnectProvider({
    infuraId: 'd4b1560fd5a843449b473df3d7107963'
  });

  const provider = new ethers.providers.Web3Provider(walletConnectProvider);
  window.walletConnectProvider = provider.provider;
  return provider.provider;
}

export function setupEvents() {
  // const { setAccount } = useAppContext();
  // Subscribe to accounts change
  window.walletConnectProvider.on('accountsChanged', (accounts) => {
    console.log(accounts);
    // setAccount(accounts[0]);
  });

  // Subscribe to chainId change
  window.walletConnectProvider.on('chainChanged', () => {
    window.location.reload();
  });

  window.walletConnectProvider.on('disconnect', () => {
    // setAccount(null);
    localStorage.clear();
  });

  // Subscribe to session connection
  window.walletConnectProvider.on('connect', () => {
    // setAccount(window.walletConnectProvider.accounts[0]);
  });
}
