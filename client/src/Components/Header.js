import { useEffect } from 'react';
// import { ethers } from 'ethers';
// import { parseEther, formatEther } from '@ethersproject/units';
import { shortenAddress } from '../utils/shortenAddress';
import { useAppContext } from '../AppContext';

export default function Header() {
  const { account, setAccount } = useAppContext();
  // async function initializeProvider() {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const signer = provider.getSigner();
  //   return signer;
  //   // return new ethers.Contract(AuctionContractAddress, Auction.abi, signer);
  // }

  async function connectWallet(e) {
    e.preventDefault();
    const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(account[0]);
    localStorage.setItem('accountData', JSON.stringify({ account: account[0] }));
  }

  window.ethereum.on('accountsChanged', (account) => {
    const newAccount = account[0] || null;
    setAccount(newAccount);
    localStorage.setItem('accountData', JSON.stringify({ account: newAccount }));
  });

  // const { account, setAccount } = useAppContext();
  useEffect(() => {
    const accountData = JSON.parse(localStorage.getItem('accountData'));
    accountData && setAccount(accountData.account);
  }, []);

  return (
    <header id="sticky-header">
      <div className="header-area">
        <div className="container sm-100">
          <div className="row">
            <div
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              className="col-sm-12">
              <div>
                <li>
                  <a style={{ fontWeight: 700 }} href="index.html">
                    Home
                  </a>
                </li>
              </div>
              <div className="logo text-upper">
                <h4>
                  <a href="index.html">LETHABO HUMA</a>
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
