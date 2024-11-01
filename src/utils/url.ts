// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import _ from 'lodash';
import queryString from 'query-string';

export function toSearchParams(search: string | Record<string, string> | string[][] | URLSearchParams) {
  return new URLSearchParams(search).toString();
}

export function objectToURLSearchParams(obj: Record<string, string>) {
  return _.forEach(obj, (value, key) => [key, value]);
}

export function arrayToURLSearchParams(key: string, values: string[]) {
  const result = [];

  _.forEach(values, (value) => {
    result.push([key, value]);
  });

  return result;
}

export function parseQueryString(searchString) {
  return queryString.parse(searchString);
}

export const isValidUrl = (url: string) => {
  try {
    // eslint-disable-next-line no-new
    new URL(url);
  } catch (e) {
    console.error(e);
    return false;
  }
  return true;
};
