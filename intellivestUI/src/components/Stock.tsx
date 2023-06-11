import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./Stock.css";
import { restClient } from "@polygon.io/client-js";
import {
  TwoYearsAgoDate,
  CurrentDate,
  convertUnixTimestamp,
} from "../utility/utility";
import { useFetchIndexData } from "../hooks/useFetchIndexData";

const StockTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="stock-tooltip">
        <p>{`Time: ${convertUnixTimestamp(label)}`}</p>
        <p>{`Price: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const StockChart = (prices: any) => {
  return (
    <>
      <ResponsiveContainer aspect={3} width={"100%"} height={"100%"}>
        <LineChart data={prices}>
          <CartesianGrid strokeWidth={0.15} />
          <XAxis
            dataKey="t"
            fontSize={10}
            tickFormatter={convertUnixTimestamp}
          />
          <YAxis fontSize={10} domain={["auto", "auto"]} />
          <Tooltip content={<StockTooltip />} />
          <Line
            type="monotone"
            dataKey="o"
            stroke="#84d89c"
            strokeWidth={1.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export const Stock = () => {
  const [prices, setPrices] = useState<any>([]);

  useFetchIndexData({ indexSymbol: "I:NDX", setPrices });

  return (
    <div className="Stock">
      <h4 className="Stock-title">NASDAQ Prices</h4>
      <ResponsiveContainer aspect={3} width={"100%"} height={"100%"}>
        <LineChart data={prices}>
          <CartesianGrid strokeWidth={0.15} />
          <XAxis
            dataKey="t"
            fontSize={10}
            tickFormatter={convertUnixTimestamp}
          />
          <YAxis fontSize={10} domain={["auto", "auto"]} />
          <Tooltip content={<StockTooltip />} />
          <Line
            type="monotone"
            dataKey="o"
            stroke="#84d89c"
            strokeWidth={1.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
