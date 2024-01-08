import { string } from 'prop-types';
import { CurveType } from 'recharts/types/shape/Curve';
import { Margin } from 'recharts/types/util/types';

export interface GraphProps{
    /**
    * Type of chart to be created
    */
    typeOfChart?:'Bar' | 'Pie' | 'Area';
    /**
    * Data source has to be a list of dictionaries
    */
    data?:any;
    /**
    * Chart color as string
    */
    color?: string;
    /**
    * Width of the Chart as a number
    */
    width?: number;
    /**
    * Height of the Chart as a number
    */
    height?: number;
   /**
    * Name of the key in the data source (as string) that will be used for the data in the X axis of the Area and Bar charts
    */
    xData?: string;
   /**
    * Name of the key in the data source (as string) that will be used for the data in the Y axis of the Area and Bar charts
    */
    yData?: string;
    /**
    * Margin of the chart has to be a dictionary with keys {top, right, left, bottom} and numbers as values. It is only used in the Area and Bar Charts
    */
    margin?: Margin;
    /**
    * Size of the strokeDasharray as string, only used in the Bar and Area Charts
    */
    strokeDasharray?: string;
    /**
    * Type of the curve used in the Area chart
    */
    curveType?: 'basis' | 'basisClosed' | 'basisOpen' | 'linear' | 'linearClosed' | 'natural' | 'monotoneX' | 'monotoneY' | 'monotone' | 'step' | 'stepBefore' | 'stepAfter'; 
    /**
    * Name of the data key to use in the Pie Chart as string
    */
    dataKey?: string;
   /**
    * Position of the lable of the value used in the Bar Chart
    */
   positionLabel?: 'top' | 'left' | 'right' | 'bottom' | 'inside' | 'outside' | 'insideLeft' | 'insideRight' | 'insideTop' | 'insideBottom' | 'insideTopLeft' | 'insideBottomLeft' | 'insideTopRight' | 'insideBottomRight' | 'insideStart' | 'insideEnd' | 'end' | 'center';
}
