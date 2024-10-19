import React from 'react';

import Datatable from '../components/Datatable';

export default function List({ type }) {
  return (
    <div className="list">
      <div className="list-container">
        <Datatable type={type} />
      </div>
    </div>
  )
}
