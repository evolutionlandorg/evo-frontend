// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

export const isSameAddress = (address1: string, address2: string): boolean => address1 && address2 && address1.substring(2).toLowerCase() === address2.substring(2).toLowerCase();

export function toShortAddress(address?: string | null | Uint8Array, keepDigitals = 6): string {
  const addressStringify = (address || '').toString();
  if (addressStringify.length <= 13) {
    return addressStringify;
  }

  return `${addressStringify.slice(0, keepDigitals)}…${addressStringify.slice(-keepDigitals)}`;
}
