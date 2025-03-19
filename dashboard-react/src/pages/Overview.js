import React, { useState, useEffect } from 'react';

import { FormControl, MenuItem, InputLabel, Box, Select } from "@mui/material";
import OverviewChart from "../components/charts/OverviewChart";

export default function Overview() {
    const [fetchedData, setFetchedData] = useState([]);

    const [view, setView] = useState("units");

    useEffect(() => {
        async function fetchData() {
            const res = await fetch("http://localhost:3030/api/sales");
            const data = await res.json();
            
            setFetchedData(data);
        }
        fetchData();
    }, []);

  return (
    <>
        {fetchedData.length > 0 && (
            <Box m="1.5rem 2.5rem">
                <h1>OVERVIEW</h1>
                <Box height="75vh">
                    <FormControl sx={{mt: "1rem"}}>
                        <InputLabel>View</InputLabel>
                        <Select value={view} label="View" onChange={(e) => setView(e.target.value)}>
                            <MenuItem value="sales">Sales</MenuItem>
                            <MenuItem value="units">Units</MenuItem>
                        </Select>
                    </FormControl>
            
                    <OverviewChart view={view} data={fetchedData} />
                </Box>
            </Box>
        )}
    </>
  )
}
