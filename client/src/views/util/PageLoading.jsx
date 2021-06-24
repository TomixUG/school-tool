import React from 'react';
import { Spinner } from 'reactstrap';

import './loading.css';

function PageLoading() {
  return (
    <div className="loadingCenter">
      <Spinner color="primary" style={{ width: '3rem', height: '3rem' }} />
    </div>
  );
}

export default PageLoading;
