import { GlobalState, Action } from '.';

export default (state: GlobalState, action: Action): GlobalState => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        loading: true
      };
    case 'GET_TRANSACTIONS':
      return {
        ...state,
        loading: false,
        transactions: action.payload
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        loading: false,
        transactions: state.transactions.filter(
          transaction => transaction._id !== action.payload
        )
      };
    case 'ADD_TRANSACTION':
      return {
        ...state,
        loading: false,
        transactions: [...state.transactions, action.payload]
      };
    case 'TRANSACTION_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
