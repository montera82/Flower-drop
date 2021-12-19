import { ethers } from 'ethers';
import { AddressZero } from '@ethersproject/constants';
import { getWallectConnectProvider, setupEvents } from '../utils/walletConnect';

export function useContract(contractAddress, ABI, client) {
  if (contractAddress === AddressZero) {
    throw Error(`Invalid 'contractAddress' parameter '${contractAddress}'.`);
  }
  console.log(client, '--------->');
  try {
    // const provider = getProvider(client);
    let provider;
    if (client === 'MetaMask') {
      provider = new ethers.providers.Web3Provider(window.ethereum);
    } else {
      provider = getWallectConnectProvider();
      setupEvents();
    }

    const signer = provider.getSigner();

    return new ethers.Contract(contractAddress, ABI, signer);
  } catch (e) {
    console.log(e, 'error setting up provider');
  }
}
