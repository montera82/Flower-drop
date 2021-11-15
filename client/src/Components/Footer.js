export default function Footer() {
  return (
    <footer>
      <div className="basic-footer text-center gray-bg ptb-90">
        <div className="container">
          <div className="footer-logo mb-30">
            <h3>
              <a href="index.html">FINAL DROP – LETHABO HUMA</a>
            </h3>
          </div>
          <div className="social-icon">
            <a href="#">
              <i className="ion-social-facebook"></i>
            </a>
            <a href="#">
              <i className="ion-social-instagram"></i>
            </a>
            <a href="#">
              <i className="ion-social-twitter"></i>
            </a>
          </div>
          <div className="copyright mt-20">
            <p>
              All copyright © reserved by <a href="#">Lethabo Huma</a> 2021
            </p>
            <p>
              Smart contract written and deployed by{' '}
              <a href="https://twitter.com/Edwintops">Edwin</a> and{' '}
              <a href="https://twitter.com/heydamali">Kingsley</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
