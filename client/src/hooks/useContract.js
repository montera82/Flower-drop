import { ethers } from 'ethers';
import { AddressZero } from '@ethersproject/constants';
import WalletConnectProvider from '@walletconnect/web3-provider';

export function useContract(contractAddress, ABI) {
  if (contractAddress === AddressZero) {
    throw Error(`Invalid 'contractAddress' parameter '${contractAddress}'.`);
  }

  const isMetaMask = false; // todo read this from somewhere; probably when user clicks on menu item

  try {
    const provider = getProvider(isMetaMask);
    const signer = provider.getSigner();

    return new ethers.Contract(contractAddress, ABI, signer);
  } catch (e) {
    console.log(e, 'error setting up provider');
  }
}

function getProvider(isMetaMask) {
  if (isMetaMask) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return provider;
  }

  const walletConnectProvider = new WalletConnectProvider({
    infuraId: "d4b1560fd5a843449b473df3d7107963"
  })

  const provider = new ethers.providers.Web3Provider(walletConnectProvider);
  
  window.walletConnectProvider = provider.provider;
  return provider;
}
