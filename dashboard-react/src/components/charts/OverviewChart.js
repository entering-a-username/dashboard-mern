import React, { useMemo } from 'react';
import { ResponsiveLine } from "@nivo/line";
import { useStateContext } from '../../ContextProvider';

export default function OverviewChart({view, data}) {
    const { palette } = useStateContext();

    const [totalSalesLine, totalUnitsLine] = useMemo(() => {
        if (!data) return [];

        const { monthlyData } = data[0];

        const totalSalesLine = { id: "totalSales",
            // color
            data: [],};

        const totalUnitsLine = {id: "totalUnits", data: [],};

        // algorithms
        if (monthlyData) {
            Object.values(monthlyData).reduce((acc, { month, totalSales, totalUnits }) => {
                const currentSales = acc.sales + totalSales;
                const currentUnits = acc.units + totalUnits;
    
                totalSalesLine.data.push({ x: month, y: currentSales });
                totalUnitsLine.data.push({ x: month, y: currentUnits });
    
                return { sales: currentSales, units: currentUnits };
            }, { sales: 0, units: 0 });
        }
    
        return [[totalSalesLine], [totalUnitsLine]];

    }, [data]);

    // if (!data) return "Loading..."

  return (
    <ResponsiveLine
        data={view === "sales" ? totalSalesLine : totalUnitsLine} margin={{top: 20, right: 50, bottom: 50, left: 70}}
        xScale={{type: "point"}} yScale={{type: "linear", min: "auto", max: "auto",
            stacked: false, reverse: false,
        }}
        theme={{
            axis: {
                ticks: {
                    line: {stroke: "red",},
                    text: {fill: palette.grey[200],}
                },
                legend: {
                    text: {
                        fill: "green"
                    }
                }
            }
        }}
        yFormat=">-.2f" curve="catmullRom" axisTop={null} axisRight={null}
        axisBottom={{orient: "bottom", tickSize: 5, tickPadding: 5, tickRotation: 0,
            legend: "Month", legendOffset: 36, legendPosition: "middle",
        }}
        axisLeft={{orient: "left", tickSize: 5, tickPadding: 5, tickRotation: 0, legend: `Total ${view === "sales" ? "Revenue" : "Units"}`,
        legendOffset: -60, legendPosition: "middle"}}
        enableGridX={false} enableGridY={false} pointSize={10} pointColor={{theme: "background"}}
        pointBorderColor={{from: "serieColor"}} pointBorderWidth={2} pointLabelYOffset={-12}
        useMesh={true} legends={[
            {anchor: "bottom-right", direction: "column", justify: false, translateX: 30,
                translateY: -40, itemsSpacing: 0, itemDirection: "left-to-right", itemWidth: 80, itemHeight: 20,
                itemOpacity: 0.75, symbolSize: 12, symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)", effects: [{
                    on: "hover", style: {itemBackground: "rgba(0, 0, 0, .03)", itemOpacity: 1}
                }]
            }
    ]}>

    </ResponsiveLine>
  )
}
