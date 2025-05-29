import type { ExtensionLoginButtonPropsType } from '@terradharitri/sdk-dapp/UI/extension/ExtensionLoginButton';
import type { LedgerLoginButtonPropsType } from '@terradharitri/sdk-dapp/UI/ledger/LedgerLoginButton';
import type { InnerLedgerComponentsClassesType } from '@terradharitri/sdk-dapp/UI/ledger/LedgerLoginContainer/types';
import type { InnerWalletConnectComponentsClassesType } from '@terradharitri/sdk-dapp/UI/walletConnect/types';
import type { WalletConnectLoginButtonPropsType } from '@terradharitri/sdk-dapp/UI/walletConnect/WalletConnectLoginButton';
import type { WebWalletLoginButtonPropsType } from '@terradharitri/sdk-dapp/UI/webWallet/WebWalletLoginButton';

export type UnlockComponentPropsType =
  | WebWalletLoginButtonPropsType
  | ExtensionLoginButtonPropsType
  | LedgerLoginButtonPropsType
  | WalletConnectLoginButtonPropsType;

export interface ConnectionType {
  title: string;
  name: string;
  background: string;
  icon: () => JSX.Element;
  component: (props: UnlockComponentPropsType) => JSX.Element;
  isWalletConnectV2?: boolean;
  innerWalletConnectComponentsClasses?: InnerWalletConnectComponentsClassesType;
  innerLedgerComponentsClasses?: InnerLedgerComponentsClassesType;
  nativeAuth: boolean;
}
