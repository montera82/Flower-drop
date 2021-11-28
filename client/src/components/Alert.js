import React, { useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import { useAppContext } from '../AppContext';

export default function Alert() {
  const { metaMaskInstalled, chainId, setMetaMaskInstalled } = useAppContext();

  useEffect(async () => {
    const provider = await detectEthereumProvider();
    const isSet = provider && true;
    setMetaMaskInstalled(isSet);
  }, []);

  console.log(metaMaskInstalled, 'metamask installed');
  return (
    <div
      className="alert"
      style={{
        visibility:
          (chainId === null || chainId === '0x1') && metaMaskInstalled ? 'hidden' : 'visible'
      }}>
      {!metaMaskInstalled
        ? 'Please install MetaMask to continue'
        : chainId !== '0x1'
        ? 'Please change your network to Ethereum Mainnet'
        : ''}
    </div>
  );
}
