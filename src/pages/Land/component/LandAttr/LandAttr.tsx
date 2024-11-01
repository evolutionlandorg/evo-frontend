// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo } from 'react';
import styled from 'styled-components';
import { BareProps } from 'components/types';
import { Land, LandResource } from 'hooks/backendApi/types';
import { StyledFontAttr } from 'ui/styled';
import { Box } from 'components';
import tw from 'twin.macro';
import { useTranslation } from 'react-i18next';
import { bundleApi } from 'api';
import { env } from 'config';
import useMatchBreakpoints from 'hooks/useMatchBreakpoints';

export interface Props extends BareProps {
  land: Land;
  resource: LandResource;
}

const StyledLandAttr = styled(Box)`
  align-items: center;
  ${tw`w-full`}
`;

const LandAttr: React.FC<Props> = ({ className, land, resource }) => {
  const { t } = useTranslation();
  const landId = land.district;
  const { isMobile } = useMatchBreakpoints();

  const landName = useMemo(() => env[landId].NAME, [landId]);
  const rpcInfo = useMemo(() => env[landId].RPC_INFO, [landId]);

  const landType = useMemo(() => {
    if (resource?.has_box) return t('landtype_Mysterious');
    if (resource?.is_reserved) return t('landtype_Reserved');
    return t('land:Normal');
  }, [resource?.has_box, resource?.is_reserved, t]);

  return (
    <StyledLandAttr className={className}>
      <div className='flex w-full mb-3'>
        <div className='w-1/5 mr-2'>
          <StyledFontAttr>{t('land:Type')}</StyledFontAttr>
          <p className='mt-1'>{landType}</p>
        </div>
        <div className={isMobile ? 'w-4/5' : 'w-1/5'}>
          <StyledFontAttr>{t('land:Location')}</StyledFontAttr>
          <p className='mt-1'>
            {land.lon}, {land.lat}
          </p>
        </div>
        {!isMobile && (
          <div className='w-3/5'>
            <StyledFontAttr>{t('land:Continent')}</StyledFontAttr>
            <p className='mt-1'>
              {landName} ( {rpcInfo.chainName} )
            </p>
          </div>
        )}
      </div>

      {isMobile && (
        <div className='w-full mb-3'>
          <StyledFontAttr>{t('land:Continent')}</StyledFontAttr>
          <p className='mt-1'>
            {landName} ( {rpcInfo.chainName} )
          </p>
        </div>
      )}

      <div className='w-full'>
        <StyledFontAttr>{t('land:Owner')}</StyledFontAttr>
        <p className='mt-1'>{bundleApi[landId].toDisplayAddress(land.owner)}</p>
      </div>
    </StyledLandAttr>
  );
};

export default LandAttr;
