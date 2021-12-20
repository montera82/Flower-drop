import { ethers } from 'ethers';
import { AddressZero } from '@ethersproject/constants';
import { toast } from 'react-toastify';
import { useAppContext } from '../AppContext';

export function useContract(contractAddress, ABI) {
  const { account, web3ModalProvider } = useAppContext();
  if (contractAddress === AddressZero) {
    throw Error(`Invalid 'contractAddress' parameter '${contractAddress}'.`);
  }

  try {
    if (account) {
      const provider = new ethers.providers.Web3Provider(web3ModalProvider);
      const signer = provider.getSigner();

      return new ethers.Contract(contractAddress, ABI, signer);
    }
  } catch (e) {
    toast('Please reconnect your wallet');
    console.log(e, 'error setting up provider');
  }
}
