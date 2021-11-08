export default function Footer() {
  return (
    <footer>
      <div className="basic-footer text-center gray-bg ptb-90">
        <div className="container">
          <div className="footer-logo mb-30">
            <h3>
              <a href="index.html">Akel</a>
            </h3>
          </div>
          <div className="social-icon">
            <a href="#">
              <i className="ion-social-facebook"></i>
            </a>
            <a href="#">
              <i className="ion-social-googleplus"></i>
            </a>
            <a href="#">
              <i className="ion-social-instagram"></i>
            </a>
            <a href="#">
              <i className="ion-social-dribbble"></i>
            </a>
          </div>
          <div className="footer-menu mt-30">
            <nav>
              <ul>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Portfolio</a>
                </li>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="copyright mt-20">
            <p>
              All copyright © reserved by <a href="#">ThemePure</a> 2018
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
