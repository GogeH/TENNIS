import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chains, UserState } from 'types';

const initialState: UserState = {
  address: '',
  provider: '',
  chainType: 'testnet',
  network: Chains['Binance-Smart-Chain'],
};

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserState: (state, action: PayloadAction<Partial<UserState>>) => ({
      ...state,
      ...action.payload,
    }),
    disconnectWalletState: () => {
      localStorage.removeItem('walletconnect');
      return {
        ...initialState,
      };
    },
  },
});

export const { disconnectWalletState, updateUserState } = userReducer.actions;

export default userReducer.reducer;
