import { restClient } from "@polygon.io/client-js";
import { useEffect } from "react";
import { TwoYearsAgoDate, CurrentDate } from "../utility/utility";

export const useFetchIndexData = ({ indexSymbol, setPrices }: any) => {
  const dataTransformation = (prices: any) => {
    let low = prices[0].o;
    let high = prices[0].o;

    for (const price of prices) {
      if (price.o < low) {
        low = price.o;
      }
      if (high < price.o) {
        high = price.o;
      }
    }

    const gap = Math.floor((high - low) / 3);
    const lowBuy = low + gap;
    const midBuy = gap;
    const highBuy = 2 * gap;

    for (const price of prices) {
      price.lowBuy = lowBuy;
      price.midBuy = midBuy;
      price.highBuy = highBuy;
      price.localLow = low;
      price.localHigh = high;
    }

    return prices;
  };

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;

    const rest = restClient(apiKey);

    const fetchData = async () => {
      try {
        const data = (
          await rest.indices.aggregates(
            indexSymbol,
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
        setPrices(dataTransformation(data));
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    };

    fetchData();
  }, [indexSymbol, setPrices]);
};
