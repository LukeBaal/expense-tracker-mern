import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const AddTransaction = () => {
  const [text, setText] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState(0);

  const { loading, addTransaction, setLoading } = useContext(GlobalContext);

  const onSubmit = e => {
    e.preventDefault();

    const newTransaction = {
      text,
      date: new Date(`20${date}`),
      amount: +amount
    };

    setLoading();
    addTransaction(newTransaction);
  };

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Enter text..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="text">Date</label>
          <input
            type="text"
            value={date}
            onChange={e => setDate(e.target.value)}
            placeholder="yy/mm/dd"
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="Enter amount..."
          />
        </div>
        <button className="btn" disabled={loading}>
          {loading ? (
            'Loading...'
          ) : (
            <>
              <span>Add transaction</span> <i className="fas fa-plus"></i>
            </>
          )}
        </button>
      </form>
    </>
  );
};
