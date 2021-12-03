export default function Footer() {
  return (
    <footer style={{ height: '100%' }}>
      <div className="basic-footer text-center gray-bg ptb-90">
        <div className="container">
          <div className="footer-logo mb-30">
            <h3>
              <a href="">LETHABO HUMA</a>
            </h3>
          </div>
          <div className="social-icon">
            <a target="_blank" rel="noreferrer" href="https://www.instagram.com/lethabohuma_art/">
              <i className="ion-social-instagram"></i>
            </a>
            <a target="_blank" rel="noreferrer" href="https://www.twitter.com/lethabohuma/">
              <i className="ion-social-twitter"></i>
            </a>
          </div>
          <div class="footer-menu mt-30">
						<nav>
							<ul>
								<li><a target="_blank"  href="https://opensea.io/collection/florescence">OpenSea</a></li>
								<li><a target="_blank" href="https://etherscan.io/address/0xcf94f9a9add6205718750acff8e4fd1084dcf0f8">Verified Contract</a></li>
							</ul>
						</nav>
					</div>
          <div className="copyright mt-20">
            <p>
              All copyright © reserved by{' '}
              <a target="_blank" rel="noreferrer" href="https://www.lethabohuma.com">
              Lethabo huma & HUMA Studios
              </a>{' '}
              2021
            </p>
            <p>
              Smartcontract written and deployed by{' '}
              <a
                style={{ fontWeight: 500 }}
                target="_blank"
                rel="noreferrer"
                href="https://twitter.com/Edwintops">
                Edwin
              </a>{' '}
              and{' '}
              <a
                style={{ fontWeight: 500 }}
                target="_blank"
                rel="noreferrer"
                href="https://twitter.com/heydamali">
                Kingsley
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
