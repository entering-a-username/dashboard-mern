import React from 'react';
import { ResponsivePie } from "@nivo/pie";
import { Box } from "@mui/material";

export default function BreakdownChart({ formattedData }) {
  
  return (
    <Box height="100%" width={undefined} position="relative">
            <ResponsivePie
        data={formattedData}
        
        colors={{ datum: "data.color" }}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }
        }
        sortByValue={true}
        innerRadius={0.45}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        enableArcLinkLabels={true}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 85,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
           
          },
        ]}
      />
        <Box
          position="absolute"
          top="50%"
          left="50%"
          textAlign="center"
          pointerEvents="none"
          sx={{
            transform: "translate(-50%, -100%)",
          }}
        >
        
          </Box>
      </Box>
  )
}
 