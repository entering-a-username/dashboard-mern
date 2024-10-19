import React from 'react';

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { RiMore2Line, RiArrowDownSLine, RiArrowUpSLine } from "@remixicon/react";

export default function Featured() {
  return (
    <div className="featured">

        <div className="top">
            <h1>Total revenue</h1>
            <RiMore2Line className='icon' />
        </div>

        <div className="bottom">
            <div className="featuredChart">
                <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
            </div>

            <p className="title">Total sales made today</p>
            <p className="amount">$420</p>

            <div className="summary">
                <div className="item">
                    <div className="item-title">Target</div>
                    <div className="item-result">
                        <RiArrowDownSLine color="red" size={19} />
                        <div className="result-amount">$12.4k</div>
                    </div>
                </div>

                <div className="item">
                    <div className="item-title">Last week</div>
                    <div className="item-result">
                        <RiArrowDownSLine color="red" size={19} />
                        <div className="result-amount">$56.4k</div>
                    </div>
                </div>

                <div className="item">
                    <div className="item-title">Last month</div>
                    <div className="item-result">
                        <RiArrowUpSLine color="green" size={19} />
                        <div className="result-amount">$122.4k</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
