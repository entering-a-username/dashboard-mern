import React from 'react';

import Chart from './../components/Chart';
import Table1 from './../components/Table';

export default function Single() {
  return (
    <div className="single">
      
      <div className="single-container">
        
        <div className="top">

          <div className="left">
            <div className="edit-btn">edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img src="https://picsum.photos/200/300" alt="" />
              <div className="details">
                <h1 className="item-title">Jane Doe</h1>
                <div className="detail-item">
                  <span className="item-key">Email:</span>
                  <span className='item-value'>janedoe@gmial.com</span>
                </div>

                <div className="detail-item">
                  <span className="item-key">Phone:</span>
                  <span className='item-value'>+123456789</span>
                </div>

                <div className="detail-item">
                  <span className="item-key">Country:</span>
                  <span className='item-value'>Norway</span>
                </div>
              </div>
            </div>
          </div>

          <div className="right">
            <Chart aspect={3 / 1} title="User Spending (last 6 months)" />
          </div>
        </div>

        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <div className="list">
            <Table1 />
          </div>
        </div>
      </div>
    </div>
  )
}
