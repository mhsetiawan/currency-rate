function Table({ arrRate, calculateBuy, calculateSell }) {
  return (
    <table className="sm:text-2xl text-lg text-white text-center sm:w-2/5">
      <thead className="font-bold">
        <tr>
          <th></th>
          <th>WE BUY</th>
          <th>EXCHANGE RATE</th>
          <th>WE SELL</th>
        </tr>
      </thead>

      <tbody className="font-light">
        {arrRate.map((rate, i) => (
          <tr key={i}>
            <td>{rate.curr}</td>
            <td>{calculateBuy(rate.rate)}</td>
            <td>{rate.rate}</td>
            <td>{calculateSell(rate.rate)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
