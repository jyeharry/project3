import { useState } from "react";
import { InvestmentCalculator } from "@components/InvestmentCalculator";
import { Stocks } from "../stocks";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { LoadedStockData, StockData, ToggledChart } from "types";
import { InteractiveChart } from "@components/InteractiveChart";

export const stockLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<LoadedStockData> => {
  try {
    const symbol = params.symbol!.toUpperCase();
    const [intraday, day, week, month] = await Promise.all([
      Stocks.getIntraday(symbol),
      Stocks.getDays(symbol),
      Stocks.getWeeks(symbol),
      Stocks.getMonths(symbol),
    ]);

    return {
      stockData: {
        symbol,
        intraday,
        day,
        week,
        month,
      },
      toggledChart: {
        timePeriod: "1 day",
        quantity: 100,
        data: {
          dates: intraday.dates,
          prices: intraday.prices,
        },
      },
    };
  } catch (e) {
    return {
      stockData: null,
      toggledChart: null,
    };
  }
};

export const Stock = () => {
  const { stockData, toggledChart } = useLoaderData() as LoadedStockData;

  const [toggledChartState, setToggledChart] =
    useState<LoadedStockData["toggledChart"]>(toggledChart);

  return stockData && toggledChartState ? (
    <div className='charts-container'>
      {toggledChartState.data.prices.length > 0 && (
        <InteractiveChart
          symbol={stockData.symbol}
          stockData={stockData}
          toggledChart={toggledChartState}
          handleClick={(e: any) => {
            setToggledChart({ ...JSON.parse(e.target.value) });
          }}
        />
      )}
      {toggledChartState.data.prices.length > 0 && (
        <InvestmentCalculator
          symbol={stockData.symbol}
          chartData={stockData.month}
        />
      )}
    </div>
  ) : (
    <p>
      Due to API usage limits, stock searches must be made one minute apart.
      Please wait a moment and try again.
    </p>
  );
};
