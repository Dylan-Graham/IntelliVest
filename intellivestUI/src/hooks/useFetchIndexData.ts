import { restClient } from "@polygon.io/client-js";
import { useEffect } from "react";
import { TwoYearsAgoDate, CurrentDate } from "../utility/utility";

export const useFetchIndexData = ({ indexSymbol, setPrices }: any) => {
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
        setPrices(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    };

    fetchData();
  }, []);
};
