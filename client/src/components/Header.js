import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { shortenAddress } from '../utils/shortenAddress';
import { useAppContext } from '../AppContext';
import { toast } from 'react-toastify';

export default function Header() {
  const { account, web3ModalProvider, setAccount, setChainId, setWeb3ModalProvider } =
    useAppContext();

  const web3modal = new Web3Modal({
    network: 'rinkeby',
    cacheProvider: true,
    disableInjectedProvider: false,
    providerOptions: {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: 'd4b1560fd5a843449b473df3d7107963'
        }
      }
    }
  });

  function setEventListeners(provider) {
    // Subscribe to accounts change
    provider.on('accountsChanged', (accounts) => {
      console.log(accounts);
      setAccount(accounts[0]);
    });

    // Subscribe to chainId change
    provider.on('chainChanged', () => {
      window.location.reload();
    });

    // Subscribe to provider connection
    provider.on('connect', () => {
      toast('Connected!');
    });

    // Subscribe to provider disconnection
    provider.on('disconnect', (error) => {
      toast(error);
    });
  }

  async function connectWallet(e) {
    e.preventDefault();

    try {
      const provider = await web3modal.connect();
      setWeb3ModalProvider(provider);
      setAccount(provider.accounts ? provider.accounts[0] : provider.selectedAddress);
      setEventListeners(provider);
    } catch (e) {
      console.log(e);
      toast('MetaMask not found, please install and try again.');
    }
  }

  async function disconnectWallet(e) {
    e.preventDefault();
    try {
      setAccount(null);
      localStorage.clear();
    } catch (e) {
      window.alert('Error disconnecting MetaMask');
    }
  }

  useEffect(async () => {
    if (!account && web3modal.cachedProvider) {
      const provider = await web3modal.connect();
      setWeb3ModalProvider(provider);
      setAccount(provider.accounts ? provider.accounts[0] : provider.selectedAddress);
      setEventListeners(provider);
      console.log(provider);
    }

    if (web3ModalProvider && account) {
      setChainId(web3ModalProvider.chainId);
    }
  }, [account]);

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
                {account ? (
                  <>
                    <li>
                      <a style={{ fontWeight: 700, pointerEvents: 'none' }}>
                        {shortenAddress(account, 4)}
                      </a>
                    </li>
                    <li>
                      <a onClick={disconnectWallet}>Logout</a>
                    </li>
                  </>
                ) : (
                  <li>
                    <a onClick={connectWallet} style={{ fontWeight: 700, color: '#e90607' }}>
                      Connect Wallet
                    </a>
                  </li>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
