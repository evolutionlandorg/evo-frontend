// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { CONF_CURRENT_CONTINENT } from 'config';
import continents, { ContinentIndexEnum, ContinentShortEnum } from 'config/continents';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { isObject, isString } from 'lodash';
import queryString from 'query-string';

const baseURL = process.env.REACT_APP_API_HOST;
const instance = axios.create({
  baseURL,
  timeout: 30000
});

instance.interceptors.request.use(
  (config) => {
    if (config.baseURL === baseURL) {
      let continentIndex: unknown;
      if (config.params?.continentIndex) {
        continentIndex = config.params?.continentIndex;
      } else if (config.data) {
        if (config?.data?.continentIndex) {
          continentIndex = config.data?.continentIndex;
        } else if (isString(config.data)) {
          continentIndex = queryString.parse(config.data)?.continentIndex;
        }
      }
      continentIndex = continentIndex || CONF_CURRENT_CONTINENT.index;
      // config.headers['evo-network'] = continents.get(continentIndex as ContinentIndexEnum)?.short || ContinentShortEnum.D;
      // config.headers['evo-network'] = ContinentShortEnum.D;

      // TODO
      const token = '';
      if (token) {
        config.headers.Authorization = token;
      }
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    return Promise.reject(err);
  }
);

const parseResponse = (response: AxiosResponse) => {
  const { data, headers } = response;

  if (typeof data.code !== 'undefined') {
    return {
      ...data,
      ...{
        time: headers.date ? new Date(headers.date).getTime() : new Date()
      }
    };
  }
  return data;
};

export const $get = (url: string, data: Record<string, unknown>, opt: AxiosRequestConfig = {}) => {
  if (data) opt.params = data;

  return instance
    .get(url, {
      ...opt,
      paramsSerializer: (params) => {
        return queryString.stringify(params, {
          arrayFormat: 'none'
        });
      }
    })
    .then((response) => {
      return parseResponse(response);
    })
    .catch((err) => {
      console.error(err);
    });
};

export const $post = (url: string, data: Record<string, unknown>, opt: AxiosRequestConfig = {}) => {
  let body: Record<string, unknown> | string = data;
  if (data instanceof FormData) {
    body = data;
  } else if (isObject(data)) {
    body = queryString.stringify(data);
  }

  return instance
    .post(url, body, opt)
    .then((response) => {
      return parseResponse(response);
    })
    .catch((err) => {
      console.error(err);
    });
};

export default instance;
