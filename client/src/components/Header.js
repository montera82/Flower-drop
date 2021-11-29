import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { shortenAddress } from '../utils/shortenAddress';
import { useAppContext } from '../AppContext';

export default function Header() {
  const { account, metaMaskInstalled, setAccount, setChainId, setShowModal } = useAppContext();

  async function connectWallet(e) {
    e.preventDefault();
    try {
      const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(account[0]);
      localStorage.setItem('accountData', JSON.stringify({ account: account[0] }));
      setShowModal(true);
    } catch (e) {
      window.alert('MetaMask not found');
    }
  }

  useEffect(async () => {
    const accountData = JSON.parse(localStorage.getItem('accountData'));
    accountData && setAccount(accountData.account);

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
                  {account ? (
                    <a style={{ fontWeight: 700, pointerEvents: 'none' }}>
                      {shortenAddress(account, 4)}
                    </a>
                  ) : (
                    <a
                      onClick={connectWallet}
                      style={{ fontWeight: 700, color: '#e90607' }}
                      href="index.html">
                      Connect Wallet
                    </a>
                  )}
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
