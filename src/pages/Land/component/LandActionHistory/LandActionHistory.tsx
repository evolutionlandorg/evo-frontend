// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import { BareProps } from 'components/types';
import { LandAuctionHistoryItem } from 'hooks/backendApi/types';
import { StyledFontAttr } from 'ui/styled';
import { Box } from 'components';
import tw from 'twin.macro';
import { toShortAddress } from 'utils/address';
import { formatTime } from 'utils/time';
import { bundleApi } from 'api';
import { SUPPORTED_LANDS_INDEX } from 'types';

export interface Props extends BareProps {
  landId: SUPPORTED_LANDS_INDEX;
  history?: LandAuctionHistoryItem[];
}

const StyledLandActionHistory = styled(Box)`
  ${tw`w-full`}
`;

const LandActionHistory: React.FC<Props> = ({ className, landId, history }) => (
  <StyledLandActionHistory className={className}>
    <div className='divide-y divide-y-4 divide-gray-500'>
      {history.map((item) => (
        <div className='flex w-full py-3' key={item.tx_id}>
          <div className='w-2/6 mr-2'>
            <StyledFontAttr>Bider</StyledFontAttr>
            <p className='mt-1'>
              {item.name} <span className='text-gray-500 text-xs truncate'>({toShortAddress(bundleApi[landId].toDisplayAddress(item.buyer))})</span>
            </p>
          </div>

          <div className='w-2/5'>
            <StyledFontAttr>Time</StyledFontAttr>
            <p className='mt-1'>{formatTime(item.start_at)}</p>
          </div>

          <div className='w-2/6'>
            <StyledFontAttr>Price</StyledFontAttr>
            <p className='mt-1 font-bold'>{item.bid_price} RING</p>
          </div>
        </div>
      ))}
    </div>
  </StyledLandActionHistory>
);

export default LandActionHistory;
