import React from 'react';

import Datatable from '../components/Datatable';
import { productColumns, userColumns, transactionColumns } from "../info/listInfo";

export default function List({ type }) {

  return (
    <>
    {type === "user" && (
      <div className="list">
      <div className="list-container">
        <Datatable type={type} columns={userColumns} />
      </div>
    </div>
    )}

    {type === "product" && (
      <div className="list">
        <div className="list-container">
          <Datatable type={type} columns={productColumns} />
        </div>
      </div>
    )}

    {type === "admin" && (
      <div className="list">
        <div className="list-container">
          <Datatable type={type} columns={userColumns} />
        </div>
      </div>
    )}

    {type === "transaction" && (
      <div className="list">
        <div className="list-container">
          <Datatable type={type} columns={transactionColumns} />
        </div>
      </div>
    )}
    </>
  )
}
