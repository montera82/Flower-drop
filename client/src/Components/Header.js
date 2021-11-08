export default function Header() {
  return (
    <header id="sticky-header">
      <div className="header-area">
        <div className="container sm-100">
          <div className="row">
            <div
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              className="col-md-12 col-sm-2">
              <div>
                <li>
                  <a style={{ fontWeight: 700 }} href="index.html">
                    Home
                  </a>
                </li>
              </div>
              <div className="logo text-upper">
                <h4>
                  <a href="index.html">Akel</a>
                </h4>
              </div>
              <div>
                <li>
                  <a style={{ fontWeight: 700 }} href="index.html">
                    Wallet
                  </a>
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
