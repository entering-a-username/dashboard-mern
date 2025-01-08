import React, {useState, useEffect} from 'react';
import {geoData} from "../info/geoData";
import {ResponsiveChoropleth} from "@nivo/geo";
import {Box, useTheme} from "@mui/material";

export default function Geography() {
    const [fetchedData, setFetchedData] = useState([]);
    const theme = useTheme();
    

    useEffect(() => {
        async function fetchData() {
            const res = await fetch("http://localhost:3030/api/geography");
            const data = await res.json();
            
            setFetchedData(data);
        }
        fetchData();
    }, []);
  return (
    <Box m="1.5rem 2.5rem">
        <h1>Geography</h1>

        <span>Where are our users from?</span>

        <Box
            mt="40px" height="75vh" border={`1px solid purple`} borderRadius="4px"
        >
            {fetchedData ? (
                <ResponsiveChoropleth
                data={fetchedData}
                colors="nivo"
                theme={{
                  axis: {
                    domain: {
                      line: {
                        stroke: theme.palette.secondary.light,
                      },
                    },
                    legend: {
                      text: {
                        fill: theme.palette.secondary.main,
                      },
                    },
                    ticks: {
                      line: {
                        stroke: theme.palette.secondary.main,
                        strokeWidth: 1,
                      },
                      text: {
                        fill: theme.palette.secondary.line,
                      },
                    },
                  },
                  legends: {
                    text: {
                      fill: theme.palette.secondary.dark,
                    },
                  },
                  tooltip: {
                    container: {
                      color: theme.palette.primary.main,
                    },
                  },
                }}
                features={geoData.features}
                margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
                domain={[0, 60]}
                unknownColor="#ccc"
                label="properties.name"
                valueFormat=".2s"
                projectionScale={150}
                projectionTranslation={[0.45, 0.6]}
                projectionRotation={[0, 0, 0]}
                borderWidth={1.3}
                borderColor="#ffffff"
                legends={[
                  {
                    anchor: "bottom-right",
                    direction: "column",
                    justify: true,
                    translateX: 0,
                    translateY: -125,
                    itemsSpacing: 0,
                    itemWidth: 94,
                    itemHeight: 18,
                    itemDirection: "left-to-right",
                    itemTextColor: theme.palette.secondary.dark,
                    itemOpacity: 0.85,
                    symbolSize: 18,
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemTextColor: theme.palette.background.alt,
                          itemOpacity: 1,
                        },
                      },
                    ],
                  },
                ]}
              />
            ) : <h1>Loading...</h1>}

        </Box>
    </Box>
  )
}
