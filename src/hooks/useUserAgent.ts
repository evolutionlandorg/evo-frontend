// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useEffect } from 'react';

const useUserAgent = () => {
  useEffect(() => {
    document.documentElement.setAttribute('data-useragent', navigator.userAgent);
  }, []);
};

export default useUserAgent;
