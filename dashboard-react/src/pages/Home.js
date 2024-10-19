import React from 'react';

import Widget from '../components/Widget';
import Featured from '../components/Featured';
import Chart from '../components/Chart';
import Table from '../components/Table';
import DateRange from '../components/DateRange';
import BarChart from '../components/BarChart';
import ProgressChart from '../components/ProgressChart';

import { RiDownloadLine } from "@remixicon/react";


export default function Home() {
    
  return (
    <div className="home">
        <div className="home-container">

            <div className="welcome">
                <h1>Welcome to your dashboard</h1>
                <button><RiDownloadLine size={14} /> DOWNLOAD REPORTS </button>
            </div>

            <div className="date-range">
                <DateRange />
            </div>


            <div className="widgets">
                <Widget type="user" />
                <Widget type="order" />
                <Widget type="earning" />
                <Widget type="balance" />
            </div>

            <div className="charts">
                <Featured />
                <Chart title="Last 6 months (sales)" aspect={2 / 1} />
            </div>

            <div className="chart-hover">
                <BarChart />
                <ProgressChart />
            </div>

            <div className="list-container">
                <div className="list-title">Latest Transactions</div>
                <Table />
            </div>
            
        </div>
    </div>
  )
}
