import React, { useEffect } from 'react';
import { useAppContext } from '../AppContext';
import { useFlower } from '../hooks/useFlower';

export default function Gallery() {
  const { account } = useAppContext();
  const {
    mintingOneOfOne,
    mintingNonCollector,
    mintingOpenEdition,
    isOneOfOneCollector,
    isNonCollector,
    isOpenEditionCollector,
    hasMintedOneOfOneCollection,
    hasMintedNonCollection,
    hasMintedOpenEditionCollection,
    fetchIsOneOfOneCollector,
    fetchIsNonCollector,
    // fetchIsOpenEditionCollector,
    fetchHasMintedOneOfOneCollection,
    fetchHasMintedNonCollection,
    // fetchHasMintedOpenEditionCollection,
    mintOneOfOneCollection,
    mintNonCollectorCollection,
    mintOpenEditionCollection
  } = useFlower();

  const mintOneOfOne = (e) => {
    e.preventDefault();
    mintOneOfOneCollection(account);
  };

  const mintNonCollector = (e) => {
    e.preventDefault();
    mintNonCollectorCollection(account);
  };

  const mintOpenEdition = (e) => {
    e.preventDefault();
    mintOpenEditionCollection(account);
  };

  // TODO: TRACK CHAIN ID CHANGE TOO
  useEffect(() => {
    if (account) {
      fetchIsOneOfOneCollector(account);
      fetchIsNonCollector(account);
      // fetchIsOpenEditionCollector(account);
      fetchHasMintedOneOfOneCollection(account);
      fetchHasMintedNonCollection(account);
      // fetchHasMintedOpenEditionCollection(account);
    }
  }, [account]);

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
          <div id="portfolio-grid" className="row-portfolio portfolio-style-2">
            {isOneOfOneCollector ? (
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
                      <p>Flower 1</p>
                    </div>
                    <h4>
                      <a href="portfolio-single.html">One of One Collectors</a>
                    </h4>
                  </div>
                </div>

                {!hasMintedOneOfOneCollection ? (
                  <div className="view-more mt-20 text-center">
                    <a onClick={mintOneOfOne} className="btn btn-large">
                      {mintingOneOfOne ? 'Minting...' : 'Mint'}
                    </a>
                  </div>
                ) : (
                  ''
                )}
              </div>
            ) : (
              ''
            )}
            {isNonCollector ? (
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
                      <p>Flower 2</p>
                    </div>
                    <h4>
                      <a href="portfolio-single.html">Non Collectors</a>
                    </h4>
                  </div>
                </div>

                {!hasMintedNonCollection ? (
                  <div className="view-more mt-20 text-center">
                    <a onClick={mintNonCollector} className="btn btn-large" href="#">
                      {mintingNonCollector ? 'Minting...' : 'Mint'}
                    </a>
                  </div>
                ) : (
                  ''
                )}
              </div>
            ) : (
              ''
            )}
            {isOpenEditionCollector ? (
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
                      <p>Flower 3</p>
                    </div>
                    <h4>
                      <a href="portfolio-single.html">Open Edition Collectors</a>
                    </h4>
                  </div>
                </div>
                {!hasMintedOpenEditionCollection ? (
                  <div className="view-more mt-20 text-center">
                    <a onClick={mintOpenEdition} className="btn btn-large" href="#">
                      {mintingOpenEdition ? 'Minting...' : 'Mint'}
                    </a>
                  </div>
                ) : (
                  ''
                )}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
