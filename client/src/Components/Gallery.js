import React from 'react';

export default function Gallery() {
  return (
    <React.Fragment>
      <div className="basic-slider slider-Akel">
        <div className="container">
          <div className="slider-content text-center">
            <h3 className="mb-30">Simple is the best design</h3>
            <p>We are Professional web developer and designer in this market.</p>
          </div>
        </div>
      </div>
      <div className="basic-portfolio-area ptb-90">
        <div className="container">
          <div className="filter-menu text-center mb-40">
            <button className="active" data-filter="*">
              ALL
            </button>
            <button data-filter=".branding">Branding</button>
            <button data-filter=".graphic">Graphic</button>
            <button data-filter=".design">Design</button>
            <button data-filter=".video">Video</button>
          </div>
          <div id="portfolio-grid" className="row-portfolio portfolio-style-2">
            <div className="portfolio-item branding video">
              <div className="portfolio-wrapper">
                <div className="portfolio-thumb">
                  <img src="img/portfolio/project1.jpg" alt="" />
                  <div className="view-icon">
                    <a href="portfolio-single.html">
                      <i className="ion-arrow-right-c"></i>
                    </a>
                  </div>
                </div>
                <div className="portfolio-caption text-left">
                  <div className="work-tag">
                    <p>Web Design</p>
                  </div>
                  <h4>
                    <a href="portfolio-single.html">Brand Redesign Works</a>
                  </h4>
                </div>
              </div>
            </div>
            <div className="portfolio-item branding video">
              <div className="portfolio-wrapper">
                <div className="portfolio-thumb">
                  <img src="img/portfolio/project1.jpg" alt="" />
                  <div className="view-icon">
                    <a href="portfolio-single.html">
                      <i className="ion-arrow-right-c"></i>
                    </a>
                  </div>
                </div>
                <div className="portfolio-caption text-left">
                  <div className="work-tag">
                    <p>Web Design</p>
                  </div>
                  <h4>
                    <a href="portfolio-single.html">Brand Redesign Works</a>
                  </h4>
                </div>
              </div>
            </div>
            <div className="portfolio-item branding video">
              <div className="portfolio-wrapper">
                <div className="portfolio-thumb">
                  <img src="img/portfolio/project1.jpg" alt="" />
                  <div className="view-icon">
                    <a href="portfolio-single.html">
                      <i className="ion-arrow-right-c"></i>
                    </a>
                  </div>
                </div>
                <div className="portfolio-caption text-left">
                  <div className="work-tag">
                    <p>Web Design</p>
                  </div>
                  <h4>
                    <a href="portfolio-single.html">Brand Redesign Works</a>
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <div className="view-more mt-20 text-center">
            <a className="btn btn-large" href="#">
              View More
            </a>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
