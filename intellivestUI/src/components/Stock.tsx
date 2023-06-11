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

const convertUnixTimestamp = (unixTimestamp: any) => {
  const timestamp = new Date(unixTimestamp);
  return timestamp.toLocaleString();
};

const CurrentDate = () => {
  const today = new Date();
  const todayFormatted = today.toISOString().split("T")[0];

  return todayFormatted;
};

const TwoYearsAgoDate = () => {
  const today = new Date();

  const twoYearsAgo = new Date(today);
  twoYearsAgo.setFullYear(today.getFullYear() - 2);
  const twoYearsAgoFormatted = twoYearsAgo.toISOString().split("T")[0];

  return twoYearsAgoFormatted;
};

const StockTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p>{`Time: ${convertUnixTimestamp(label)}`}</p>
        <p>{`Value: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export const Stock = () => {
  const [prices, setPrices] = useState<any>([]);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;

    const rest = restClient(apiKey);

    const fetchData = async () => {
      try {
        const data = (
          await rest.stocks.aggregates(
            "AAPL",
            1,
            "day",
            TwoYearsAgoDate(),
            CurrentDate(),
            {
              adjusted: "true",
              sort: "asc",
            }
          )
        ).results;
        setPrices(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    };

    fetchData();
  }, []);

  return (
    <div className="Stock">
      <h4>Last 24 Months of Apple Prices</h4>
      <ResponsiveContainer aspect={3} width={"100%"} height={"100%"}>
        <LineChart
          data={prices}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid />
          <XAxis
            dataKey="t"
            fontSize={10}
            tickFormatter={convertUnixTimestamp}
          />
          <YAxis fontSize={10} domain={["auto", "auto"]} />
          <Tooltip content={<StockTooltip />} />
          <Line type="monotone" dataKey="o" stroke="#8884d8" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
