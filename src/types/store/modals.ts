// eslint-disable-next-line no-shadow
export enum Modals {
  ConnectWallet = 'ConnectWallet',
  init = '',
}

export interface ModalState {
  activeModal: Modals;
  txHash: string;
  open: boolean;
}

export type ModalsInitialState = {
  modalState: ModalState;
};
