import { Link } from 'react-router-dom';
import React from 'react';
import Alert from './Alert';

export default function Welcome() {
  return (
    <React.Fragment>
      <div
        style={{ paddingTop: '50px', paddingBottom: '140px' }}
        className="basic-slider slider-Akel">
        <Alert />
        <div className="container">
          <div style={{ paddingTop: '100px' }} className="slider-content text-center">
            <h3 className="mb-30">FLORESCENCE</h3>
            <p style={{ marginBottom: 0, textTransform: 'none' }}>
              For those who believe in my art and gift.
            </p>
            <p style={{ textTransform: 'none' }}>This is a flower of appreciation.</p>
          </div>
        </div>
        <div>
          <div className="view-more mt-20 text-center">
            <Link className="btn btn-large" to="/claim">
              Read Me
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
