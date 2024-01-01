import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function App() {
  const [amount, setAmount] = useState(0);
  const [fromcurr, setFromcurr] = useState("USD");
  const [toCurr, SetTocurr] = useState("EUR");
  const [rate, setRate] = useState("");

  useEffect(
    function converter() {
      const host = "api.frankfurter.app";

      async function convert() {
        const res = await fetch(
          `https://${host}/latest?amount=${amount}&from=${fromcurr}&to=${toCurr}`
        );
        const data = await res.json();

        setRate(data.rates[toCurr]);
      }
      if (fromcurr === toCurr || !amount) {
        setRate(amount);
        return;
      }

      convert();
    },
    [amount, fromcurr, toCurr]
  );

  return (
    <div className="converter">
      <Currency />
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(() => e.target.value)}
      />
      <select value={fromcurr} onChange={(e) => setFromcurr(e.target.value)}>
        <option>EUR</option>
        <option>USD</option>
        <option>JPY</option>
        <option>GBP</option>
        <option>CAD</option>
        <option>AUD</option>
        <option>NGN</option>
        <option>NZD</option>
      </select>
      <select value={toCurr} onChange={(e) => SetTocurr(e.target.value)}>
        <option>EURO</option>
        <option>USD</option>
        <option>JPY</option>
        <option>GBP</option>
        <option>CAD</option>
        <option>AUD</option>
        <option>NGN</option>
        <option>NZD</option>
      </select>

      <p>{rate}</p>
    </div>
  );
}

function Currency() {
  return (
    <div>
      <h1>Currency Converter</h1>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
