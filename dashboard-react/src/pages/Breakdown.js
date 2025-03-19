import React, { useState, useEffect } from 'react';

import BreakdownChart from "../components/charts/BreakdownChart";
import { Box } from "@mui/material";

export default function Breakdown() {
    const [formattedData, setFormattedData] = useState([]);
    
    useEffect(() => {
        async function fetchDataAndFormat() {
            const res = await fetch("http://localhost:3030/api/sales");
            const data = await res.json();

            const colors = ['#7A1CAC', '#88C273', '#a9E5E8', '#A04747'];
          
            const formatted = Object.entries(data[0].salesByCategory).map(
                ([category, sales], i) => ({
                    id: category,
                    label: category,
                    value: sales,
                    color: colors[i % colors.length],
                })
            );
          
          setFormattedData(formatted); 
        }
        fetchDataAndFormat();
    }, []);

  return (
    <Box m="1.5rem 2.5rem">
        <h1>Data Breakdown</h1>
        {
          formattedData.length > 0 && (
            <Box mt="40px" height="75vh">
              <BreakdownChart formattedData={formattedData} />
            </Box>
          )
        }
    </Box>
  )
}
