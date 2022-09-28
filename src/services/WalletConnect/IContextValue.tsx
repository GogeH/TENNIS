import { createContext, FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { IConnect, IError } from '@amfi/connect-wallet/dist/interface';
import { notifyText } from 'config/constants';
import { useShallowSelector } from 'hooks';
import { Subscription } from 'rxjs';
import { disconnectWalletState, updateUserState } from 'store/user/reducer';
import userSelector from 'store/user/selectors';
import { Chains, State, UserState, WalletProviders } from 'types';
import { shortenPhrase } from 'utils';

import { WalletService } from '../WalletService';

interface IContextValue {
  connect: (provider: WalletProviders, chain: Chains) => Promise<void>;
  disconnect: () => void;
  walletService: WalletService;
}
type IAccountInfo = IConnect | IError | { address: string };
const Web3Context = createContext({} as IContextValue);
const WalletConnectContext: FC<unknown> = ({ children }) => {
  const [currentSubsriber, setCurrentSubsciber] = useState<Subscription>();
  const WalletConnect = useMemo(() => new WalletService(), []);
  const dispatch = useDispatch();
  const {
    address,
    provider: WalletProvider,
    chainType,
    network,
  } = useShallowSelector<State, UserState>(userSelector.getUser);

  const disconnect = useCallback(() => {
    dispatch(disconnectWalletState());
    WalletConnect.resetConnect();
    currentSubsriber?.unsubscribe();
    toast.info(notifyText.disconnet.info);
  }, [WalletConnect, currentSubsriber, dispatch]);

  const subscriberSuccess = useCallback(
    (res) => {
      if (document.visibilityState !== 'visible') {
        disconnect();
      }
      if (res.name === 'accountsChanged') {
        disconnect();
        toast.info('Please sign login message at MetaMask');
      }
    },
    [disconnect],
  );

  const subscriberError = useCallback(
    (error) => {
      // eslint-disable-next-line no-console
      console.error(error);
      if (error.code !== 4) {
        WalletConnect.resetConnect();
        toast.error('You changed to wrong network. Please choose Binance-Smart-Chain');
        dispatch(disconnectWalletState());
      }
    },
    [WalletConnect, dispatch],
  );

  const connect = useCallback(
    async (provider: WalletProviders, chain: Chains) => {
      const connected = await WalletConnect.initWalletConnect(provider, chain, chainType);
      if (connected) {
        try {
          const sub: any = WalletConnect.eventSubscribe().subscribe(subscriberSuccess, subscriberError);
          const accountInfo: IAccountInfo = await WalletConnect.getAccount();
          const accountAddress = (accountInfo as IConnect).address;
          if (accountAddress) {
            dispatch(
              updateUserState({
                provider: (accountInfo as IError).type,
                address: accountAddress,
                network: chain,
              }),
            );
            toast.success(`Wallet connected: ${shortenPhrase(accountAddress, 5, 5)}`);
          }

          setCurrentSubsciber(sub);
        } catch (error) {
          // metamask doesn't installed,
          // redirect to download MM or open MM on mobile
          if (error.code === 4) {
            window.open(
              `https://metamask.app.link/dapp/${window.location.hostname + window.location.pathname}/?utm_source=mm`,
            );
          }
        }
      }
    },
    [WalletConnect, chainType, dispatch, subscriberError, subscriberSuccess],
  );

  useEffect(() => {
    // connect user if he connected previously
    if (WalletProvider && !address.length) {
      connect(WalletProviders.metamask, network);
    }
  }, [WalletProvider, address.length, connect, network]);

  return (
    <Web3Context.Provider value={{ connect, disconnect, walletService: WalletConnect }}>
      {children}
    </Web3Context.Provider>
  );
};
const useWalletConnectorContext = () => useContext(Web3Context);
export { WalletConnectContext, useWalletConnectorContext };
