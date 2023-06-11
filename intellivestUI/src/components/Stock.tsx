import { useState } from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./Stock.css";
import { convertUnixTimestamp } from "../utility/utility";
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

export const Stock = () => {
  const [prices, setPrices] = useState<any>([]);

  useFetchIndexData({ indexSymbol: "I:NDX", setPrices });

  return (
    <div className="Stock">
      <h5 className="Stock-title">Index: NASDAQ</h5>
      <ResponsiveContainer aspect={3} width={"100%"} height={"100%"}>
        <ComposedChart data={prices}>
          <CartesianGrid strokeWidth={0.15} />
          <XAxis
            dataKey="t"
            fontSize={10}
            tickFormatter={convertUnixTimestamp}
          />
          <YAxis fontSize={10} domain={["auto", "auto"]} />
          <Tooltip content={<StockTooltip />} />
          <Area
            type="monotone"
            dataKey="o"
            stroke="#84d89c"
            fill="#84d89c"
            strokeWidth={1.5}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
