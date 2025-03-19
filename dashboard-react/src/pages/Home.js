import React, { useState, useEffect } from 'react';

import Widget from '../components/Widget';
import Featured from '../components/charts/Featured';
import Chart from '../components/charts/Chart';
import Table from '../components/Table';
import BarChart from '../components/charts/BarChart';
import ProgressChart from '../components/charts/ProgressChart';

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);

    const [fetchedOrders, setFetchedOrders] = useState([]);

    useEffect(() => {
        async function fetchData() {   
            setIsLoading(true);
            const res = await fetch(`http://localhost:3030/api/orders?showBy=6`);
            const data = await res.json();

            setFetchedOrders(data.data);
            setIsLoading(false);
        }
        fetchData();
    }, []);

    if (isLoading) {
        return <h1>Loading..</h1>
    }
    
  return (
    <div className="home">
        <div className="home-container">

            <div className="welcome">
                <h1>Welcome to your dashboard</h1>
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
                <Table data={fetchedOrders} />
            </div>
            
        </div>
    </div>
  )
}
