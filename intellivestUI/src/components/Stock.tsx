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
        <p>{`Price: ${Number.parseInt(payload[3].value).toFixed(0)}`}</p>
      </div>
    );
  }

  return null;
};

export const Stock = () => {
  const [prices, setPrices] = useState<any>([]);

  useFetchIndexData({ indexSymbol: "I:NDX", setPrices });

  return (
    <>
      {prices.length === 0 ? (
        <div></div>
      ) : (
        <div className="Stock">
          <h5 className="Stock-title">Index: NASDAQ</h5>
          <ResponsiveContainer aspect={2.5} width={"100%"} height={"100%"}>
            <ComposedChart data={prices}>
              <CartesianGrid strokeWidth={0.15} />
              <XAxis
                dataKey="t"
                fontSize={10}
                tickFormatter={convertUnixTimestamp}
              />
              <YAxis
                fontSize={10}
                domain={[11700, 14600]}
                allowDataOverflow={true}
              />
              <Tooltip content={<StockTooltip />} />
              <Area
                type="monotone"
                dataKey="lowBuy"
                stroke="none"
                fill="green"
                strokeWidth={1.5}
                stackId={1}
              />
              <Area
                type="monotone"
                dataKey="midBuy"
                stroke="none"
                fill="orange"
                strokeWidth={1.5}
                stackId={1}
              />
              <Area
                type="monotone"
                dataKey="highBuy"
                stroke="none"
                fill="red"
                strokeWidth={1.5}
                stackId={1}
              />
              <Area
                type="monotone"
                dataKey="o"
                stroke="#84d89c"
                fill="#84d89c"
                strokeWidth={1.5}
                stackId={2}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};
