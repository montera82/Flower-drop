import { ethers } from 'ethers';
import { AddressZero } from '@ethersproject/constants';

export function useContract(contractAddress, ABI) {
  if (contractAddress === AddressZero) {
    throw Error(`Invalid 'contractAddress' parameter '${contractAddress}'.`);
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    return new ethers.Contract(contractAddress, ABI, signer);
  } catch (e) {
    console.log(e, 'error setting up provider');
  }
}
