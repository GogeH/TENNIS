import { Chains, IChainType } from 'types/connect';

export type UserState = {
  address: string;
  provider: string;
  chainType: IChainType;
  network: Chains;
};
