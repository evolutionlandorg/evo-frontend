// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { BareProps } from 'components/types';
import { Row, Col } from 'antd';
import { getTokenResourceList } from 'utils/tokenList';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useCurrentLand } from 'hooks/useRouterParams';
import Page from 'components/Layout/Page';
import { LandConfig } from '@evolutionland/evolution-js';
import { extendLandId } from 'utils';
import { StyledContentBox } from 'ui/styled';
import { getIsSupportByModuleName } from 'config';
import { Button, OpenNewIcon } from 'components';
import { getRemoveLPUrl, landIndexToDex } from 'utils/dex';
import { useTranslation } from 'react-i18next';
import { TokenMain, TokenSub, TokenPairSub } from './component';

export interface Props extends BareProps {
  basePath?: string;
}

const MyInfo: React.FC<Props> = ({ className }) => {
  const { t } = useTranslation();
  const landId = useCurrentLand();
  const { account } = useActiveWeb3React(landId);

  const ring = LandConfig[extendLandId(landId)]?.tokens?.RING;
  // @ts-ignore
  const xring = LandConfig[extendLandId(landId)]?.tokens?.XRING; // crab migration
  const kton = LandConfig[extendLandId(landId)]?.tokens?.KTON;
  const resources = getTokenResourceList(landId);
  const supportFarm = getIsSupportByModuleName(landId, 'FARM');
  const supportHelixBridge = getIsSupportByModuleName(landId, 'HELIX_BRIDGE');
  const supportXRING2XWRING = getIsSupportByModuleName(landId, 'XRING_TO_XWRING');

  return (
    <Page className={className}>
      <StyledContentBox>
        <Row gutter={[20, 20]}>
          <Col span={24} sm={24} lg={kton ? 12 : 24}>
            <TokenMain bg='collapseHeaderBackground' token={ring} landId={landId} account={account} crosschain={supportHelixBridge} />
          </Col>
          {xring && (
            <Col span={24} sm={24} lg={12}>
              <TokenMain bg='collapseHeaderBackground' token={xring} landId={landId} account={account} xringmigration />
            </Col>
          )}
          {kton && (
            <Col span={24} sm={24} lg={xring ? 24 : 12}>
              <TokenMain bg='collapseHeaderBackground' token={kton} landId={landId} account={account} />
            </Col>
          )}
        </Row>

        <Row className='mt-5' gutter={[10, 10]} justify='space-between'>
          {resources.map((resource) => (
            <Col key={resource.symbol} sm={12} lg={4}>
              <TokenSub token={resource} landId={landId} account={account} />
            </Col>
          ))}
        </Row>

        {supportFarm && (
          <Row className='mt-5' gutter={[10, 10]} justify='space-between'>
            {resources.map((resource) => (
              <Col key={resource.symbol} sm={12} lg={4}>
                <TokenPairSub transferButton token0={resource} token1={ring} landId={landId} account={account} tokenImages={['ring', resource.symbol]} />
              </Col>
            ))}
          </Row>
        )}

        {supportXRING2XWRING && (
          <Row className='mt-5' gutter={[10, 10]} justify='space-between'>
            {resources.map((resource) => {
              const removeLPUrl = getRemoveLPUrl(resource, xring, landIndexToDex[landId]);
              return (
                <Col key={resource.symbol} sm={12} lg={4}>
                  <TokenPairSub
                    token0={resource}
                    token1={xring}
                    landId={landId}
                    account={account}
                    tokenImages={['ring', resource.symbol]}
                    externalButton={
                      <Button width='100%' as='a' className='flex-1' endIcon={<OpenNewIcon />} scale='sm' target='_blank' rel='noreferrer' href={removeLPUrl}>
                        {t('Remove')}
                      </Button>
                    }
                  />
                </Col>
              );
            })}
          </Row>
        )}
      </StyledContentBox>
    </Page>
  );
};

export default MyInfo;
