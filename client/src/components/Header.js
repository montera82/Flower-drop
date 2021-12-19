import { useEffect } from 'react';
// import { ethers } from 'ethers';
import { Link } from 'react-router-dom';
// import WalletConnectProvider from '@walletconnect/web3-provider';
import { shortenAddress } from '../utils/shortenAddress';
import { useAppContext } from '../AppContext';
import { toast } from 'react-toastify';
import { getWallectConnectProvider, setupEvents } from '../utils/walletConnect';

export default function Header() {
  const { account, metaMaskInstalled, client, setAccount, setChainId, setShowModal } =
    useAppContext();

  async function connectMetamaskWallet(e) {
    e.preventDefault();
    try {
      const accounts = await window.ethereum
        .request({
          method: 'wallet_requestPermissions',
          params: [
            {
              eth_accounts: {}
            }
          ]
        })
        .then(() =>
          window.ethereum.request({
            method: 'eth_requestAccounts'
          })
        );
      // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      localStorage.setItem('matamask', true);
      localStorage.setItem('accountData', JSON.stringify({ account: accounts[0] }));
    } catch (e) {
      toast('MetaMask not found, please install and try again.');
    }
  }

  async function connectWalletConnect(e) {
    e.preventDefault();
    try {
      if (!window.walletConnectProvider) {
        getWallectConnectProvider();
      }

      await window.walletConnectProvider.enable();
      setupEvents();

      window.location.reload();
      localStorage.setItem('wallectconnect', true);
    } catch (e) {
      console.log('WALLET CONNECT', e);
      toast('Wallet connect issues');
    }
  }

  async function disconnectWallet(e) {
    e.preventDefault();
    try {
      if (client === 'MetaMask') {
        setAccount(null);
        localStorage.setItem('accountData', JSON.stringify({ account: null }));
        return;
      }

      if (window.walletConnectProvider) {
        await window.walletConnectProvider.disconnect();
        return;
      }

      localStorage.clear();
      window.location.reload();
    } catch (e) {
      console.log(e);
      window.alert('Error disconnecting MetaMask');
    }
  }

  useEffect(async () => {
    const accountData = JSON.parse(localStorage.getItem('accountData'));
    const walletConnnect = JSON.parse(localStorage.getItem('walletconnect'));

    if (walletConnnect) {
      setAccount(walletConnnect.accounts[0]);
    } else if (accountData && accountData.account) {
      setAccount(accountData.account);
    } else {
      setAccount(null);
    }

    if (metaMaskInstalled && account) {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      setChainId(chainId);

      // Listen for account and chain change events
      const handleAccountChange = (account) => {
        const newAccount = account[0] || null;
        setAccount(newAccount);
        localStorage.setItem('accountData', JSON.stringify({ account: newAccount }));
        setTimeout(() => {
          setShowModal(true);
        }, 2000);
      };
      const handleChainChange = () => {
        window.location.reload();
      };
      window.ethereum.on('accountsChanged', handleAccountChange);
      window.ethereum.on('chainChanged', handleChainChange);

      // Remove listeners on component unmount
      return function cleanupListener() {
        window.ethereum.removeListener('accountsChanged', handleAccountChange);
        window.ethereum.removeListener('chainChanged', handleChainChange);
      };
    }
  }, [metaMaskInstalled, account]);

  return (
    <header id="sticky-header">
      <div className="header-area">
        <div className="container sm-100">
          <div className="row">
            <div
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              className="col-sm-12">
              <div className="hide-on-small">
                <li>
                  <Link to="/" style={{ fontWeight: 700 }}>
                    Home
                  </Link>
                </li>
              </div>
              <div className="logo text-upper">
                <h4>
                  <a>LETHABO HUMA</a>
                </h4>
              </div>
              <div className="basic-menu">
                <li>
                  <a>
                    {account ? (
                      <li>
                        <a style={{ fontWeight: 700, pointerEvents: 'none' }}>
                          {shortenAddress(account, 4)}
                        </a>
                      </li>
                    ) : (
                      'Connect Wallet'
                    )}
                  </a>
                  <ul>
                    {account ? (
                      <li>
                        <a onClick={disconnectWallet} style={{ fontWeight: 700, color: '#e90607' }}>
                          Logout
                        </a>
                      </li>
                    ) : (
                      <>
                        <li>
                          <a onClick={connectMetamaskWallet} style={{ fontWeight: 700 }}>
                            MetaMask
                          </a>
                        </li>

                        <li>
                          <a onClick={connectWalletConnect} style={{ fontWeight: 700 }}>
                            WalletConnect
                          </a>
                        </li>
                      </>
                    )}
                  </ul>
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
