import React, { useEffect } from 'react';
import { useAppContext } from '../AppContext';
import { useFlower } from '../hooks/useFlower';
import Alert from './Alert';

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
      <div
        style={{ paddingTop: '50px', paddingBottom: '140px' }}
        className="basic-slider slider-Akel">
        <Alert />
        <div className="container">
          <div style={{ paddingTop: '40px' }} className="slider-content text-center">
            <h3 className="mb-30">Simple is the best design</h3>
            <p>We are Professional web developer and designer in this market.</p>
          </div>
        </div>
      </div>
      <div className="basic-portfolio-area ptb-90">
        <div className="container">
          <div id="portfolio-grid" className="row-portfolio portfolio-style-2">
            {!isOneOfOneCollector && !isNonCollector && !isOpenEditionCollector && (
              <p style={{ fontWeight: 500, color: 'rgb(233 6 7)', textAlign: 'center' }}>
                You&apos;re not eligible for this drop
              </p>
            )}
            {isOneOfOneCollector ? (
              <div className="portfolio-item branding video">
                <div className="portfolio-wrapper">
                  <div className="portfolio-thumb">
                    <img src="img/portfolio/Flower 1 - 1_1 Collectors.png" alt="" />
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

                {
                  <div className="view-more mt-20 text-center">
                    <a
                      style={{
                        pointerEvents: hasMintedOneOfOneCollection ? 'none' : 'auto',
                        background: hasMintedOneOfOneCollection ? 'rgb(188 188 188)' : '#444'
                      }}
                      onClick={mintOneOfOne}
                      className="btn btn-large">
                      {hasMintedOneOfOneCollection
                        ? 'Claim'
                        : mintingOneOfOne
                        ? 'Claiming...'
                        : 'Claim'}
                    </a>
                  </div>
                }
              </div>
            ) : (
              ''
            )}
            {isNonCollector ? (
              <div className="portfolio-item branding video">
                <div className="portfolio-wrapper">
                  <div className="portfolio-thumb">
                    <img src="img/portfolio/Flower 2 - Non-Collectors.png" alt="" />
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

                {
                  <div className="view-more mt-20 text-center">
                    <a
                      style={{
                        pointerEvents: hasMintedNonCollection ? 'none' : 'auto',
                        background: hasMintedNonCollection ? 'rgb(188 188 188)' : '#444'
                      }}
                      onClick={mintNonCollector}
                      className="btn btn-large">
                      {hasMintedNonCollection
                        ? 'Claimed'
                        : mintingNonCollector
                        ? 'Claiming...'
                        : 'Claim'}
                    </a>
                  </div>
                }
              </div>
            ) : (
              ''
            )}
            {isNonCollector ? (
              <div className="portfolio-item branding video">
                <div className="portfolio-wrapper">
                  <div className="portfolio-thumb">
                    <img src="img/portfolio/Flower 3 - Open Edition Collectors .png" alt="" />
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
                {
                  <div className="view-more mt-20 text-center">
                    <a
                      style={{
                        pointerEvents: hasMintedOpenEditionCollection ? 'none' : 'auto',
                        background: hasMintedOpenEditionCollection ? 'rgb(188 188 188)' : '#444'
                      }}
                      onClick={mintOpenEdition}
                      className="btn btn-large">
                      {hasMintedOpenEditionCollection
                        ? 'Claimed'
                        : mintingOpenEdition
                        ? 'Claiming...'
                        : 'Claim'}
                    </a>
                  </div>
                }
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
