export interface Transaction {
  _id: string;
  text: string;
  date: Date;
  createAt: Date;
}

export interface GlobalState {
  transactions: Transaction[];
  error: string | null;
  loading: boolean;
  setLoading: () => void;
  getTransactions: (filter: DateFilter) => Promise<void> | null;
  addTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
}

export interface DateFilter {
  weeks: number;
  months: number;
}

export type Action =
  | { type: 'LOADING' }
  | { type: 'GET_TRANSACTIONS'; payload: Transaction[] }
  | { type: 'DELETE_TRANSACTION'; payload: string }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'TRANSACTION_ERROR'; payload: string };
