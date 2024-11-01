// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import tw from 'twin.macro';
import React, { useCallback } from 'react';
import { Flex, Spinner, ContentWithHeader, Button, ConditionBox, GoBack } from 'components';
import Page from 'components/Layout/Page';
import { StyledFlexWrapBox, StyledLandDetailLayout, StyledLandDetailLayoutLeft, StyledLandDetailLayoutRight } from 'ui/styled';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useGetDrill } from 'hooks/backendApi';
import { navigateToDetail } from 'api/utils';
import { useCurrentLand } from 'hooks/useRouterParams';
import { isSameAddress } from 'utils/address';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useTranslation } from 'react-i18next';
import { useIllustratedList } from 'store/illustrated/hooks';
import { Element } from 'types';
import { getDrillImage, getIllustratedById } from './utils';
import { IllustratedBox, MinedResources, ManageHelpInfo, DrillIntroduction } from './component';

interface Props {
  data?: unknown;
  className?: string;
}

interface RouterParams {
  tokenId: string;
}

const Detail: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { className } = props;
  const history = useHistory();
  const landId = useCurrentLand();
  const { tokenId: drillTokenId } = useParams<RouterParams>();
  const { data: drill, isLoading } = useGetDrill({ landId, tokenId: drillTokenId });
  const { account, chainId } = useActiveWeb3React(landId);

  const [illustratedList, fetchIllustratedList] = useIllustratedList();

  const navigateToEdit = useCallback(
    (_drillTokenId, isEdit) => {
      navigateToDetail(history, landId, 'drill', _drillTokenId, isEdit);
    },
    [history, landId]
  );

  if (!drill) {
    return <Page className={className}>Not Found</Page>;
  }

  const illustrated = getIllustratedById(illustratedList, drill?.formula_id);

  return (
    <Page className={className}>
      {isLoading ? (
        <Flex height='450px' alignItems='center' justifyContent='center'>
          <Spinner size={128} />
        </Flex>
      ) : (
        <div className='LandDetail--scroll-box'>
          <GoBack />
          <StyledLandDetailLayout>
            <StyledLandDetailLayoutLeft>
              <IllustratedBox landId={landId} formulaId={drill.formula_id} subtitle='' imageUrl={getDrillImage(drill.class, drill.grade)} />
            </StyledLandDetailLayoutLeft>
            <StyledLandDetailLayoutRight>
              <ConditionBox visible={isSameAddress(drill.owner, account) || isSameAddress(drill.origin_owner, account)}>
                <ContentWithHeader title={t('Manage')} helpInfo={<ManageHelpInfo />}>
                  <StyledFlexWrapBox>
                    <Button scale='sm' onClick={() => navigateToEdit(drillTokenId, true)}>
                      {t('Manage')}
                    </Button>
                  </StyledFlexWrapBox>
                </ContentWithHeader>
              </ConditionBox>

              <ContentWithHeader title={t('Mined')}>
                <MinedResources landId={landId} drillTokenId={drillTokenId} chainId={chainId} />
              </ContentWithHeader>

              <ContentWithHeader title={t('Introduction')}>
                <DrillIntroduction productivity={illustrated.productivity} prefer={drill.prefer as Element} protectionPeriod={illustrated.protection_period} />
              </ContentWithHeader>
            </StyledLandDetailLayoutRight>
          </StyledLandDetailLayout>
        </div>
      )}
    </Page>
  );
};

export default React.memo<Props>(styled(Detail)`
  ${tw`flex flex-col`}
`);
