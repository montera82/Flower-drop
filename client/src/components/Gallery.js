import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../AppContext';
import { useFlower } from '../hooks/useFlower';
import Alert from './Alert';
import messages from '../messages';

export default function Gallery() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
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
    fetchIsOpenEditionCollector,
    fetchHasMintedOneOfOneCollection,
    fetchHasMintedNonCollection,
    fetchHasMintedOpenEditionCollection,
    mintOneOfOneCollection,
    mintNonCollectorCollection,
    mintOpenEditionCollection
  } = useFlower();

  const text = messages[account] || 'GENERAL MESSAGE';

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

  const submitEmail = (e) => {
    e.preventDefault();
    if (email.length === 0) {
      setError('Please enter a valid email');
      return;
    }
    try {
      axios.post(
        'https://flowerdrop-1861.restdb.io/rest/email',
        {
          email: email
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-apikey': '6195739dfc71545b0f5e08dc', // TODO: add to env
            'cache-control': 'no-cache'
          }
        }
      );
      setEmail('');
      setError('');
      setEmailMessage('Thank you');
    } catch (e) {
      setError('Error submitting email');
      console.log(e, 'Error submitting email');
    }
  };
  useEffect(() => {
    if (account) {
      fetchIsOneOfOneCollector(account);
      fetchIsNonCollector(account);
      fetchIsOpenEditionCollector(account);
      fetchHasMintedOneOfOneCollection(account);
      fetchHasMintedNonCollection(account);
      fetchHasMintedOpenEditionCollection(account);
    }
  }, [account]);

  return (
    <React.Fragment>
      <div
        style={{ paddingTop: '50px', paddingBottom: '100px' }}
        className="basic-slider slider-Akel">
        <Alert />
        {!isOneOfOneCollector && !isNonCollector && !isOpenEditionCollector ? (
          <p style={{ fontWeight: 500, color: 'rgb(233 6 7)', textAlign: 'center' }}>
            You&apos;re not eligible for this drop
          </p>
        ) : (
          <div className="container">
            <div
              style={{ paddingTop: '100px' }}
              className="slider-content text-center"
              dangerouslySetInnerHTML={{ __html: text }}
            />
            <form onSubmit={submitEmail}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  paddingTop: '50px'
                }}
                className="row">
                <div style={{ marginBottom: 0 }} className="col-md-6 form-group">
                  <label className="sr-only">Email</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ height: '40px', maxWidth: '650px', margin: '0 auto' }}
                    type="email"
                    className="form-control input-lg"
                    placeholder="Please enter email"
                  />
                  <p
                    style={{
                      maxWidth: '300px',
                      margin: '0 auto',
                      marginBottom: '10px',
                      marginTop: '5px',
                      textAlign: 'center',
                      color: error ? '#e90607' : '#474747'
                    }}
                    className="help-block text-danger">
                    {error ? error : emailMessage ? emailMessage : ''}
                  </p>
                </div>
                <div className="col-md-12 text-center">
                  <button type="submit" className="btn btn-large">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
      <div className="basic-portfolio-area ptb-90">
        <div className="container">
          <div id="portfolio-grid" className="row-portfolio portfolio-style-2">
            <div className="portfolio-item branding video">
              <div className="portfolio-wrapper">
                <div className="portfolio-thumb">
                  <img src="img/portfolio/The Gift (Formerly Known as Flower 1).JPG" alt="" />
                  <div className="view-icon">
                    <a href="portfolio-single.html">
                      <i className="ion-arrow-right-c"></i>
                    </a>
                  </div>
                </div>
                <div className="portfolio-caption text-left">
                  <div className="work-tag">
                    <p>The Gift</p>
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
                      pointerEvents:
                        hasMintedOneOfOneCollection || !isOneOfOneCollector ? 'none' : 'auto',
                      background:
                        hasMintedOneOfOneCollection || !isOneOfOneCollector
                          ? 'rgb(188 188 188)'
                          : '#444'
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
            <div className="portfolio-item branding video">
              <div className="portfolio-wrapper">
                <div className="portfolio-thumb">
                  <img
                    src="img/portfolio/_Pillar of Love (Formerly known as Flower 2).JPG"
                    alt=""
                  />
                  <div className="view-icon">
                    <a href="portfolio-single.html">
                      <i className="ion-arrow-right-c"></i>
                    </a>
                  </div>
                </div>
                <div className="portfolio-caption text-left">
                  <div className="work-tag">
                    <p>Pillar of Love</p>
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
                      pointerEvents: hasMintedNonCollection || !isNonCollector ? 'none' : 'auto',
                      background:
                        hasMintedNonCollection || !isNonCollector ? 'rgb(188 188 188)' : '#444'
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
            <div className="portfolio-item branding video">
              <div className="portfolio-wrapper">
                <div className="portfolio-thumb">
                  <img src="img/portfolio/Purple Haven (Formerly Known As Flower 3).JPG" alt="" />
                  <div className="view-icon">
                    <a href="portfolio-single.html">
                      <i className="ion-arrow-right-c"></i>
                    </a>
                  </div>
                </div>
                <div className="portfolio-caption text-left">
                  <div className="work-tag">
                    <p>Purple Haven</p>
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
                      pointerEvents:
                        hasMintedOpenEditionCollection || !isOpenEditionCollector ? 'none' : 'auto',
                      background:
                        hasMintedOpenEditionCollection || !isOpenEditionCollector
                          ? 'rgb(188 188 188)'
                          : '#444'
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
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
