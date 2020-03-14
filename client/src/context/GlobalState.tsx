import React, { createContext, useReducer, ReactNode } from 'react';
import TransactionReducer from './TransactionReducer';
import axios from 'axios';
import { GlobalState, Transaction, Action, DateFilter } from '.';

interface GlobalContextProps {
  defaults?: Partial<GlobalState>;
  children?: ReactNode | ReactNode[];
}

const initialState: GlobalState = {
  transactions: [],
  error: null,
  loading: true,
  getTransactions: (filter: DateFilter) => null,
  addTransaction: (transaction: Transaction) => {},
  deleteTransaction: (id: string) => {}
};

// Create context
export const GlobalContext: React.Context<GlobalState> = createContext<
  GlobalState
>(initialState);

export const GlobalProvider: any = (props: GlobalContextProps): any => {
  // Provider component
  const [state, dispatch]: [GlobalState, React.Dispatch<Action>] = useReducer(
    TransactionReducer,
    initialState
  );

  // Actions
  async function getTransactions(filter: DateFilter): Promise<void> {
    try {
      const res = await axios.get(
        `/api/v1/transactions?weeks=${filter.weeks}&months=${filter.months}`
      );

      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      });
    }
  }

  async function deleteTransaction(id: string) {
    try {
      await axios.delete(`/api/v1/transactions/${id}`);

      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      });
    }
  }

  async function addTransaction(transaction: Transaction) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/v1/transactions', transaction, config);

      dispatch({
        type: 'ADD_TRANSACTION',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        getTransactions,
        deleteTransaction,
        addTransaction
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
