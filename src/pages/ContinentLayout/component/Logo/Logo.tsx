// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { BareProps } from 'components/types';
import useMatchBreakpoints from 'hooks/useMatchBreakpoints';

const Logo: React.FC<BareProps> = ({ className }) => {
  const { isMobile, isTablet } = useMatchBreakpoints();

  if (isTablet || isMobile) {
    return (
      <a href='/' className={className}>
        <img className='mx-4' width='35' height='35' src='/logo192.png' alt='evolution land logo' />
      </a>
    );
  }

  return (
    <a href='/' className={className}>
      {process.env.REACT_APP_CHAIN === 'mainnet' ? <img className='mx-4' width='236' height='26' src='/logo-text-experimental.png' alt='evolution land logo' /> : <img className='mx-4' width='204' height='26' src='/logo-text-testnet.png' alt='evolution land testnet logo' />}
    </a>
  );
};

export default Logo;
