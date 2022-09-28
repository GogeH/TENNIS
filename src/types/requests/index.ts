import Web3 from 'web3';

export type BodyWithToken<T = never> = {
  token?: string;
} & T;

export type LoginReq = {
  address: string;
  web3Provider: Web3;
};

export type ApiResponse<T = never> = {
  data: BodyWithToken<T>;
  statusCode?: number;
  error?: string;
  message?: string | string[];
};

export interface RequestWithWeb3Provider {
  web3Provider: Web3;
}

export interface ApproveReq extends RequestWithWeb3Provider {
  amount: string;
  spender: string;
  tokenAddress: string;
  web3Provider: Web3;
  decimals: number;
}
