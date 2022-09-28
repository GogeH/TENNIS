/* eslint-disable @typescript-eslint/no-explicit-any */
import { Chains, IChainType, IConnectWallet, IContracts } from 'types';

import { erc20Abi } from './abi';

export const chains: {
  [key: string]: {
    [key: string]: {
      name: string;
      nativeCurrency: {
        name: string;
        symbol: string;
        decimals: number;
      };
      rpc: string;
      blockExplorerUrl: string;
      chainId: number;
      provider: {
        [key: string]: any;
      };
      img?: any;
    };
  };
} = {
  'Binance-Smart-Chain': {
    mainnet: {
      name: 'Binance-Smart-Chain',
      chainId: 56,
      nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18,
      },
      rpc: 'https://bsc-dataseed.binance.org/',
      blockExplorerUrl: 'https://mainnet.bscscan.com',
      provider: {
        MetaMask: { name: 'MetaMask' },
        WalletConnect: {
          name: 'WalletConnect',
          useProvider: 'rpc',
          provider: {
            rpc: {
              rpc: {
                56: 'https://bsc-dataseed.binance.org/',
              },
              chainId: 56,
            },
          },
        },
      },
    },
    testnet: {
      name: 'Binance-Smart-Chain',
      chainId: 97,
      nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18,
      },
      rpc: 'https://data-seed-prebsc-2-s2.binance.org:8545/',
      blockExplorerUrl: 'https://testnet.bscscan.com',
      provider: {
        MetaMask: { name: 'MetaMask' },
        WalletConnect: {
          name: 'WalletConnect',
          useProvider: 'rpc',
          provider: {
            rpc: {
              rpc: {
                97: 'https://data-seed-prebsc-2-s2.binance.org:8545/',
              },
              chainId: 97,
            },
          },
        },
      },
    },
  },
};

export const connectWallet = (newChainName: Chains, type: IChainType): IConnectWallet => {
  const chain = chains[newChainName][type];
  return {
    network: {
      chainName: chain.name,
      chainID: chain.chainId,
      nativeCurrency: chain.nativeCurrency,
      rpc: chain.rpc,
      blockExplorerUrl: chain.blockExplorerUrl,
    },
    provider: chain.provider,
    settings: { providerType: true },
  };
};

export enum ContractsNames {
  staking = 'staking',
}

export type IContractsNames = keyof typeof ContractsNames;

export const contractsConfig: IContracts = {
  names: Object.keys(ContractsNames),
  decimals: 18,
  contracts: {
    [ContractsNames.staking]: {
      testnet: {
        address: {
          [Chains['Binance-Smart-Chain']]: '0x658396178d33C91a5C60A1164828e00008769a74',
        },
        abi: erc20Abi,
      },
      mainnet: {
        address: {
          [Chains['Binance-Smart-Chain']]: '0x658396178d33C91a5C60A1164828e00008769a74',
        },
        abi: erc20Abi,
      },
    },
  },
};
