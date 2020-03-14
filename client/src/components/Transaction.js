import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';

export const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);

  const sign = transaction.amount < 0 ? '-' : '+';

  const dateObj = new Date(transaction.date);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const dateString = dateObj.toLocaleDateString(undefined, options);

  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
      <span>{dateString}</span>
      {transaction.text}
      <span>
        {sign}${numberWithCommas(Math.abs(transaction.amount))}
      </span>
      <button
        onClick={() => deleteTransaction(transaction._id)}
        className="delete-btn"
      >
        x
      </button>
    </li>
  );
};
