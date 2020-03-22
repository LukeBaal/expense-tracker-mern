import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Switch from './common/Switch';

export const AddTransaction = () => {
  const [text, setText] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState(0);
  const [signSwitch, setSignSwitch] = useState(false);

  const { loading, addTransaction, setLoading } = useContext(GlobalContext);

  const setDateToday = e => {
    const today = new Date();

    let month = today.getMonth() + 1;
    month = month < 10 ? '0' + month : month;

    const date = `${today.getFullYear() % 2000}/${month}/${today.getDate()}`;

    setDate(date);
  };

  const onSubmit = e => {
    e.preventDefault();

    const newTransaction = {
      text,
      date: new Date(`20${date}`),
      amount: Math.abs(Number(amount)) * (signSwitch ? 1 : -1)
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
          <div style={{ display: 'flex' }}>
            <div
              className="btn"
              style={{ width: 'initial', margin: '0', marginRight: '1em' }}
              onClick={setDateToday}
            >
              Today
            </div>
            <input
              type="text"
              value={date}
              onChange={e => setDate(e.target.value)}
              placeholder="yy/mm/dd"
            />
          </div>
        </div>
        <div className="form-control">
          <label htmlFor="amount">Amount</label>
          <div style={{ display: 'flex' }}>
            <Switch
              active={signSwitch}
              setActive={setSignSwitch}
              style={{ marginTop: '0.2em', marginRight: '0.3em' }}
            />
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="Enter amount..."
            />
          </div>
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
