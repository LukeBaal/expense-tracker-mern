import React, { createContext, useReducer, ReactNode, ReactElement } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

interface Transaction {
  _id: string,
  text: string,
  date: Date,
  createAt: Date
}

interface GlobalState {
  transactions: Transaction[],
  error: string | null,
  loading: boolean
}

interface GlobalContextProps {
  defaults?: Partial<GlobalState>,
  children?: ReactNode
}

// Initial state
const initialState: GlobalState = {
  transactions: [],
  error: null,
  loading: true
}

// Create context
export const GlobalContext = createContext<GlobalState>(initialState);

export const useGlobalContext = (): GlobalState =?

// Provider component
export const GlobalProvider: any = (props: GlobalContextProps): ReactElement => {
  const [state, dispatch]: [any, any] = useReducer(AppReducer, initialState);

  // Actions
  async function getTransactions() {
    try {
      const res = await axios.get('/api/v1/transactions');

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
    }

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

  return (<GlobalContext.Provider value={{
    transactions: state.transactions,
    error: state.error,
    loading: state.loading,
    getTransactions,
    deleteTransaction,
    addTransaction
  }}>
    {props.children}
  </GlobalContext.Provider>);
}