import type { Meta, StoryObj } from "@storybook/react";

import  Graph from "components/Graph/Graph";

const dato = [{name: 'Page A', sales: 400, loses: 2400, vehicles: 300}, {name: 'Page B', sales: 700, loses: 2800, vehicles: 800}, {name: 'Page C', sales: 900, loses: 1500, vehicles: 69}, {name: 'Page D', sales: 1500, loses: 400, vehicles: 489}];

const meta: Meta<typeof Graph> = {
    title: "Components/Graph",
    component: Graph,
    
    tags: ['autodocs'],

    argTypes: {
        data:{ control: "array" },
        color: { control: "color"},
        width: { control: "number" },
        height: { control: "number" },
        xData: { control: "text" },
        yData: { control: "text" },
        margin: { control: "array" },
        strokeDasharray: { control: "text" },
        dataKey: { control: "text" },

    },
  };

export default meta;
type Story = StoryObj<typeof Graph>;

export const DefaultGraph: Story = {
  args: {
    typeOfChart:"Bar",
    data : dato,
    color : "#e19785",
    width : 400,
    height : 400,
    xData : "name",
    yData : "sales",
    margin : {
        top: 11,
        right: 30,
        left: 30,
        bottom: 11
    },
    strokeDasharray : "4",
    curveType : "monotone",
    dataKey : "sales",
    positionLabel : "center"
  },
};

export const BarChart: Story = {
  args: {
    typeOfChart:"Bar",
    data : dato,
    color:"#e7b1fe",
    height:300,
    width:500,
    xData:"agency",
    yData:"loses",
    margin:{
      top: 3,
      right: 20,
      left: 30,
      bottom: 3
    },
    strokeDasharray:"8",
    positionLabel:"insideBottom"
  },
};

export const AreaChart: Story = {
  args: {
    typeOfChart:"Area",
    data : dato,
    color:"#6ce8f0",
    height:300,
    width:500,
    xData:"name",
    yData:"vehicles",
    margin:{
      top: 4,
      right: 40,
      left: 40,
      bottom: 4
    },
    strokeDasharray:"4 4",
    curveType:"monotone"
  },
};

export const PieChart: Story = {
  args: {
    typeOfChart:"Pie",
    data:dato,
    color:"#4a793e",
    height:400,
    width:300,
    dataKey:"sales"
  },
};