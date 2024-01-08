import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, Area, AreaChart, Pie, PieChart, ResponsiveContainer } from "recharts";
import { GraphProps } from "./types";

const dato = [{name: 'Page A', sales: 400, loses: 2400, vehicles: 300}, {name: 'Page B', sales: 700, loses: 2800, vehicles: 800}, {name: 'Page C', sales: 900, loses: 1500, vehicles: 69}, {name: 'Page D', sales: 1500, loses: 400, vehicles: 489}];

/**
 * Graph component with three different customizable charts
 */
const Graph: React.FC<GraphProps> = ({
    typeOfChart="Bar",
    data = dato,
    color = "#e19785",
    width = 400,
    height = 400,
    xData = "name",
    yData = "sales",
    margin = {
        top: 11,
        right: 30,
        left: 30,
        bottom: 11
    },
    strokeDasharray = "4",
    curveType = "monotone",
    dataKey = "sales",
    positionLabel = "center"

}) => {
    
    if(typeOfChart === 'Area')
    {
        return(
            <AreaChart
            width={width}
            height={height}
            data={data}
            margin={margin}
          >
            <CartesianGrid strokeDasharray={strokeDasharray} />
            <XAxis dataKey={xData} />
            <YAxis />
            <Tooltip/>
            <Legend />
            <Area type={curveType} dataKey={yData} stroke={color} fill={color} />
          </AreaChart>
        );
    }
    else if(typeOfChart === 'Pie')
    {
        return(
            <ResponsiveContainer width={width} height={height}>
              <PieChart width={width} height={height}>
                <Pie dataKey={dataKey} data={data} fill={color} label />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
        );   
    }
    else
    {
        return (
            <BarChart
            width={width}
            height={height}
            data={data}
            margin={margin}>
    
            <CartesianGrid strokeDasharray={strokeDasharray} />
            <XAxis dataKey={xData} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={yData} fill={color}>
                <LabelList dataKey={yData} position={positionLabel}/>
            </Bar>
            </BarChart>
        );
    }

};

export default Graph
    
