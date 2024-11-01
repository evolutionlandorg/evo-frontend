// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AbstractConnectorArguments, ConnectorUpdate } from '@web3-react/types';
import { AbstractConnector } from '@web3-react/abstract-connector';

import invariant from 'tiny-invariant';

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

declare global {
  interface Window {
    tronWeb: any;
  }
}

const __DEV__ = process.env.NODE_ENV !== 'production';

export class UserRejectedRequestError extends Error {
  public constructor() {
    super();
    this.name = this.constructor.name;
    this.message = 'The user rejected the request.';
  }
}

export class TronInjectConnector extends AbstractConnector {
  private provider: any;

  private chainIds: number[];

  constructor(kwargs: Required<AbstractConnectorArguments>) {
    invariant(kwargs.supportedChainIds.length === 1, 'This connector only supports 1 chainId at the moment.');
    super(kwargs);

    this.handleNetworkChanged = this.handleNetworkChanged.bind(this);
    this.handleChainChanged = this.handleChainChanged.bind(this);
    this.handleAccountsChanged = this.handleAccountsChanged.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.chainIds = this.supportedChainIds;
  }

  private handleNetworkChanged(networkId: string): void {
    if (__DEV__) {
      console.info("Handling 'networkChanged' event with payload", networkId);
    }
    this.emitUpdate({ provider: this.provider, chainId: networkId });
  }

  private handleChainChanged(chainId: string): void {
    if (__DEV__) {
      console.info("Handling 'chainChanged' event with payload", chainId);
    }
    this.emitUpdate({ chainId });
  }

  private handleAccountsChanged(accounts: string[]): void {
    if (__DEV__) {
      console.info("Handling 'accountsChanged' event with payload", accounts);
    }
    this.emitUpdate({ account: accounts.length === 0 ? null : accounts[0] });
  }

  private handleClose(code: number, reason: string): void {
    if (__DEV__) {
      console.info("Handling 'close' event with payload", code, reason);
    }
    this.emitDeactivate();
  }

  private eventsHandle(e) {
    if (e.data.message && e.data.message.action === 'setAccount') {
      console.info('setAccount event', e.data.message);
      console.info('current address:', e.data.message.data.address);
      this.handleAccountsChanged([e.data.message.data.address]);
    }
    if (e.data.message && e.data.message.action === 'setNode') {
      console.info('setNode event', e.data.message);
      if (e.data.message.data.node.chain === '_') {
        console.info('tronLink currently selects the main chain');
      } else {
        console.info('tronLink currently selects the side chain');
      }
      // Tronlink chrome v3.22.1 & Tronlink APP v4.3.4 started to support
      if (e.data.message && e.data.message.action === 'connect') {
        console.info('connect event', e.data.message.isTronLink);
      }

      // Tronlink chrome v3.22.1 & Tronlink APP v4.3.4 started to support
      if (e.data.message && e.data.message.action === 'disconnect') {
        console.info('disconnect event', e.data.message.isTronLink);
      }

      // Tronlink chrome v3.22.0 & Tronlink APP v4.3.4 started to support
      if (e.data.message && e.data.message.action === 'accountsChanged') {
        console.info('accountsChanged event', e.data.message);
        console.info('current address:', e.data.message.data.address);
      }

      // Tronlink chrome v3.22.0 & Tronlink APP v4.3.4 started to support
      if (e.data.message && e.data.message.action === 'connectWeb') {
        console.info('connectWeb event', e.data.message);
        console.info('current address:', e.data.message.data.address);
      }

      // Tronlink chrome v3.22.0 & Tronlink APP v4.3.4 started to support
      if (e.data.message && e.data.message.action === 'acceptWeb') {
        console.info('acceptWeb event', e.data.message);
      }
      // Tronlink chrome v3.22.0 & Tronlink APP v4.3.4 started to support
      if (e.data.message && e.data.message.action === 'disconnectWeb') {
        console.info('disconnectWeb event', e.data.message);
      }

      // Tronlink chrome v3.22.0 & Tronlink APP v4.3.4 started to support
      if (e.data.message && e.data.message.action === 'rejectWeb') {
        console.info('rejectWeb event', e.data.message);
      }
    }
  }

  // https://cn.developers.tron.network/docs/tronlink%E4%BA%8B%E4%BB%B6
  public async activate(): Promise<ConnectorUpdate> {
    if (!this.provider) {
      await sleep(2000);
      this.provider = window.tronWeb;
      window.tronWeb.getNetwork = async () => ({
          name: 'tron network',
          chainId: this.chainIds[0]
        });
      console.info('troninject-connector', this.provider);
    }

    // this.provider
    //   .on('networkChanged', this.handleNetworkChanged)
    //   .on('chainChanged', this.handleChainChanged)
    //   .on('accountsChanged', this.handleAccountsChanged)
    //   .on('close', this.handleClose)

    // window.addEventListener('message', this.eventsHandle);

    return { provider: this.provider, chainId: await this.getChainId(), account: await this.getAccount() };
  }

  public async getProvider(): Promise<any> {
    return this.provider;
  }

  public async getChainId(): Promise<number> {
    return this.chainIds[0];
  }

  public async getAccount(): Promise<string> {
    // return this.provider.send('eth_accounts').then((accounts: string[]): string => accounts[0])
    return new Promise((resolve) => {
      resolve(`0x${this.provider.defaultAddress.hex.substring(2)}`);
      // resolve(this.provider.trx.hex)
    });
  }

  public deactivate() {
    // this.provider
    //   .removeListener('networkChanged', this.handleNetworkChanged)
    //   .removeListener('chainChanged', this.handleChainChanged)
    //   .removeListener('accountsChanged', this.handleAccountsChanged)
    //   .removeListener('close', this.handleClose)

    window.removeEventListener('message', this.eventsHandle);
  }
}
