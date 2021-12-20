import React from 'react';
import { useAppContext } from '../AppContext';

export default function Alert() {
  const { chainId } = useAppContext();

  return (
    <div
      className="alert"
      style={{
        visibility: chainId === null || chainId === '0x1' || chainId === 1 ? 'hidden' : 'visible'
      }}>
      {'Please change your network to Ethereum Mainnet'}
    </div>
  );
}
