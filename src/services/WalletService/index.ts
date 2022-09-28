/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConnectWallet } from '@amfi/connect-wallet';
import { IConnect, IError } from '@amfi/connect-wallet/dist/interface';
import { connectWallet as connectWalletConfig } from 'config';
import { AnyObject } from 'immer/dist/types/types-internal';
import { Chains, IChainType, WalletProviders } from 'types';

export class WalletService {
  public connectWallet: ConnectWallet;

  constructor() {
    this.connectWallet = new ConnectWallet();
  }

  public async initWalletConnect(
    providerName: WalletProviders,
    chainName: Chains,
    type: IChainType,
    // eslint-disable-next-line @typescript-eslint/ban-types
  ): Promise<boolean | {}> {
    const { provider, network, settings } = connectWalletConfig(chainName, type);

    try {
      return await this.connectWallet.connect(provider[providerName], network, settings);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('initWalletConnect providerWallet err: ', error);
      return false;
    }
  }

  public resetConnect(): void {
    this.connectWallet.resetConect();
  }

  public eventSubscribe(): any {
    return this.connectWallet.eventSubscriber();
  }

  public Web3(): any {
    return this.connectWallet.currentWeb3();
  }

  public getAccount(): Promise<IConnect | IError | { address: string }> {
    return this.connectWallet.getAccounts();
  }

  sendTransaction(transactionConfig: AnyObject, walletAddress: string): any {
    return this.Web3().eth.sendTransaction({
      ...transactionConfig,
      from: walletAddress,
    });
  }
}
