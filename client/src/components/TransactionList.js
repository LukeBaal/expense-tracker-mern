import React, { useContext, useEffect, useState } from 'react';
import { Transaction } from './Transaction';

import { GlobalContext } from '../context/GlobalState';

export const TransactionList = () => {
  const filters = {
    WEEK: { label: '1w', weeks: 1, months: 0 },
    THREE_WEEKS: { label: '3w', weeks: 3, months: 0 },
    MONTH: { label: '1m', weeks: 0, months: 1 },
    THREE_MONTHS: { label: '3m', weeks: 0, months: 3 },
    YEAR: { label: '1y', weeks: 0, months: 12 }
  };

  const { transactions, getTransactions } = useContext(GlobalContext);
  const [filter, setFilter] = useState(filters.MONTH);

  useEffect(() => {
    getTransactions(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <>
      <h3 style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>History</span>
        <div className="form-group inline right">
          <i className="fas fa-calendar"></i>
          <select
            defaultValue={'MONTH'}
            onChange={e => setFilter(filters[e.target.value])}
          >
            {Object.keys(filters).map(key => (
              <option key={filters[key].label} value={key}>
                {filters[key].label}
              </option>
            ))}
          </select>
        </div>
      </h3>
      <ul className="list">
        {transactions.map(transaction => (
          <Transaction key={transaction._id} transaction={transaction} />
        ))}
      </ul>
    </>
  );
};
