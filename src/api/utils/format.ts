// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

export function pad0x(str: string): string {
  if (str.substring(0, 2) === '0x') {
    return str;
  }

  return `0x${str}`;
}

export function remove0x(str: string): string {
  if (str.substring(0, 2) === '0x') {
    return str.substring(2);
  }

  return str;
}

export const formatTokenId = (tokenId: string): string => {
  return pad0x(tokenId);
};
