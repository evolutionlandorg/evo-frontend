// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';
import { BareProps } from 'components/types';
import { LandRecord } from 'hooks/backendApi/types';
import { StyledFontAttr } from 'ui/styled';
import { Box } from 'components';
import { toShortAddress } from 'utils/address';
import { formatTime } from 'utils/time';
import { bundleApi } from 'api';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { LandConfig } from '@evolutionland/evolution-js';
import { extendLandId } from 'utils';

export interface Props extends BareProps {
  landId: SUPPORTED_LANDS_INDEX;
  record?: LandRecord[];
}

const StyledLandActionHistory = styled(Box)`
  ${tw`w-full`}
`;

const LandFinalRecordHistory: React.FC<Props> = ({ className, landId, record }) => {
  const { RING } = LandConfig[extendLandId(landId)].tokens;

  return (
    <StyledLandActionHistory className={className}>
      <div className='divide-y divide-y-4 divide-gray-500'>
        {record.map((item) => (
          <div className='flex w-full py-3' key={item.create_tx}>
            <div className='w-2/6 mr-2'>
              <StyledFontAttr>Bider</StyledFontAttr>
              <p className='mt-1'>
                <span className='truncate'>{toShortAddress(bundleApi[landId].toDisplayAddress(item.winner))}</span>
              </p>
            </div>

            <div className='w-2/6'>
              <StyledFontAttr>Claim Time</StyledFontAttr>
              <p className='mt-1'>{formatTime(item.claim_time)}</p>
            </div>

            <div className='w-2/6'>
              <StyledFontAttr>Price</StyledFontAttr>
              <p className='mt-1 font-bold'>
                {item.final_price} {RING.symbol}
              </p>
            </div>
          </div>
        ))}
      </div>
    </StyledLandActionHistory>
  );
};

export default LandFinalRecordHistory;
