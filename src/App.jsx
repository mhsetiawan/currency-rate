import { useState } from "react";
import { useEffect } from "react";
import Table from "./components/Table";
import Loading from "./components/Loading";

export default function App() {
  const [rates, setRates] = useState([]);
  const [lodaing, setLoading] = useState(false);
  const currency = ["CAD", "IDR", "JPY", "CHF", "EUR", "USD"];
  const arrRate = [];

  for (let rate in rates) {
    if (currency.includes(rate)) {
      arrRate.push({ curr: rate, rate: parseFloat(rates[rate]).toFixed(4) });
    }
  }

  function calculateBuy(rate) {
    return (parseFloat(rate) * 1.02).toFixed(4);
  }

  function calculateSell(rate) {
    return (parseFloat(rate) * 0.98).toFixed(4);
  }

  async function fetchCurrencyRates() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${
          import.meta.env.VITE_API_KEY
        }`
      );
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      const rates = json.rates;
      setRates(rates);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCurrencyRates();
  }, []);
  return (
    <>
      {lodaing ? (
        <Loading />
      ) : (
        <div className="flex justify-center items-center h-screen bg-orange-500">
          <Table
            arrRate={arrRate}
            calculateBuy={calculateBuy}
            calculateSell={calculateSell}
          />
        </div>
      )}
    </>
  );
}
