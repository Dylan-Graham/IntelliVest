import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./Stock.css";

interface StockTimestamp {
  date: string;
  open: any;
}

export const Stock = () => {
  const [prices, setPrices] = useState<StockTimestamp[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // TODO: store in env file..
        const symbol = "AAPL";
        const api_key = "lol you wish";
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${api_key}`;
        const response = await fetch(url);
        const data = (await response.json())["Monthly Time Series"];

        const monthlyTimeSeries = [];
        for (const [key, value] of Object.entries(data)) {
          monthlyTimeSeries.push({
            date: key,
            open: parseFloat(Object(value)["1. open"]),
          });
        }
        setPrices(monthlyTimeSeries.reverse());
      } catch (error) {
        console.error("Error fetching NASDAQ prices:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="Stock">
      <h4>Last 24 Months of NASDAQ Prices</h4>
      <ResponsiveContainer aspect={3} width={"100%"} height={"100%"}>
        <LineChart
          data={prices}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid />
          <XAxis dataKey="date" fontSize={15} />
          <YAxis fontSize={15} />
          <Tooltip />
          <Line type="monotone" dataKey="open" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
