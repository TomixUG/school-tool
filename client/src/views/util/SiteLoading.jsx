import React from 'react';
import { Spinner } from 'reactstrap';

import './loading.css';

function SiteLoading() {
  return (
    <div className="loadingCenter">
      <Spinner color="secondary" style={{ width: '5rem', height: '5rem' }} />
    </div>
  );
}

export default SiteLoading;
