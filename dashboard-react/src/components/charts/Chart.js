import React from 'react';
import {AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import { RiArrowRightSLine } from "@remixicon/react";

export default function Chart({ aspect, title }) {
    const data = [
        {name: "January", total: 1200},
        {name: "February", total: 210},
        {name: "March", total: 900},
        {name: "April", total: 1600},
        {name: "May", total: 1200},
    ];
    
  return (
    <div className="chart">

      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>

      <AreaChart width={730} height={250} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
          
        </defs>
        <XAxis dataKey="name" stroke="gray" />
        <CartesianGrid strokeDasharray="3 3" className="chartGrid" stroke='' />
        <Tooltip />
        <Area type="monotone" dataKey="total" stroke="#8884d8" fillOpacity={1} fill="url(#total)" />
            
      </AreaChart>
      </ResponsiveContainer>

      <div className="info">
        <select name="" id="select">
          <option value="last-6">Last 6 months</option>
          <option value="last-year">Last year</option>
          <option value="last-2years">Last 2 years</option>
          <option value="last-5years">Last 5 years</option>
        </select>

        <span><a href="/overview">SALES REPORT <RiArrowRightSLine /></a> </span>
      </div>
    </div>
  )
}
