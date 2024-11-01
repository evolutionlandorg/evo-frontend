// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { NetworkInfo } from 'config';
import { ExternalProvider } from '@ethersproject/providers';

/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async (network: NetworkInfo, externalProvider?: ExternalProvider) => {
  const provider = externalProvider || window.ethereum;

  if (provider) {
    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: network.chainId }]
      });
      return true;
    } catch (error: any) {
      console.error('Failed to setup the network in Metamask:', error);

      // This error code indicates that the chain has not been added to MetaMask.
      if (error.code === 4902) {
        try {
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [network]
          });
          return true;
        } catch (e) {
          console.error('Failed to setup the network in Metamask:', e);
          return false;
        }
      }
      return false;
    }
  } else {
    console.error("Can't setup the network on metamask because window.ethereum is undefined");
    return false;
  }
};

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @returns {boolean} true if the token has been added, false otherwise
 */
export const registerToken = async (tokenAddress: string, tokenSymbol: string, tokenDecimals: number) => {
  const PUBLIC_ASSETS_HOST = process.env.REACT_APP_PUBLIC_ASSETS_HOST;

  const tokenAdded = await window.ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: tokenAddress,
        symbol: tokenSymbol,
        decimals: tokenDecimals,
        image: `${PUBLIC_ASSETS_HOST}/images/token/${tokenSymbol.toLowerCase()}.svg`
      }
    }
  });

  return tokenAdded;
};
