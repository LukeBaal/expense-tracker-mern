import React, { useContext, useEffect, useState } from 'react';
import { Transaction } from './Transaction';

import { GlobalContext } from '../context/GlobalState';

export const TransactionList = () => {
  const filters = {
    WEEK: { label: 'Last Week', weeks: 1, months: 0 },
    THREE_WEEKS: { label: 'Last 3 Weeks', weeks: 3, months: 0 },
    MONTH: { label: 'Last Month', weeks: 0, months: 1 },
    THREE_MONTHS: { label: 'Last 3 Months', weeks: 0, months: 3 },
    YEAR: { label: 'Last Year', weeks: 0, months: 12 }
  };

  const { transactions, getTransactions } = useContext(GlobalContext);
  const [filter, setFilter] = useState(filters.WEEK);

  useEffect(() => {
    getTransactions(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <>
      <h3>History</h3>
      <select onChange={e => setFilter(filters[e.target.value])}>
        {Object.keys(filters).map(key => (
          <option
            key={filters[key].label}
            value={key}
            selected={filters[key] === filter}
          >
            {filters[key].label}
          </option>
        ))}
      </select>
      <ul className="list">
        {transactions.map(transaction => (
          <Transaction key={transaction._id} transaction={transaction} />
        ))}
      </ul>
    </>
  );
};
