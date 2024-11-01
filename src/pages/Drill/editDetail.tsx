// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import tw from 'twin.macro';
import React, { useEffect, useState } from 'react';
import Page from 'components/Layout/Page';
import { Flex, Spinner, ContentWithHeader, Button, ConditionBox, useModal, GoBack } from 'components';
import { StyledFlexWrapBox, StyledLandDetailLayout, StyledLandDetailLayoutLeft, StyledLandDetailLayoutRight } from 'ui/styled';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useGetDrill } from 'hooks/backendApi';
import { useCurrentLand } from 'hooks/useRouterParams';
import { isSameAddress } from 'utils/address';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { NFTStatus } from 'components/NFTBox/types';
import { useTranslation } from 'react-i18next';
import { useIllustratedList } from 'store/illustrated/hooks';
import { Element } from 'types';
import { getDrillImage, getIllustratedById } from './utils';
import { TransferDrillModal, MinedResources, StopDrillWorkingButton, IllustratedBox, ManageHelpInfo, DrillIntroduction } from './component';

interface Props {
  data?: unknown;
  className?: string;
}

interface RouterParams {
  tokenId: string;
}

const EditDetail: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { className } = props;
  const landId = useCurrentLand();
  const { tokenId: drillTokenId } = useParams<RouterParams>();
  const { data: drill, isLoading } = useGetDrill({ landId, tokenId: drillTokenId });
  const [drillStatus, setDrillStatus] = useState<NFTStatus[]>([]);

  const { account, chainId } = useActiveWeb3React(landId);
  const [illustratedList, fetchIllustratedList] = useIllustratedList();

  const [onClickTransferDrill] = useModal(<TransferDrillModal title={t('Transfer Drill')} landId={landId} tokenId={drillTokenId} />);

  useEffect(() => {
    const status: NFTStatus[] = [];
    drill?.land_equip && status.push('land-drillworking');
    setDrillStatus(status);
  }, [drill?.land_equip]);

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
        <div>
          <GoBack />
          <StyledLandDetailLayout>
            <StyledLandDetailLayoutLeft>
              <IllustratedBox landId={landId} formulaId={drill.formula_id} subtitle='' imageUrl={getDrillImage(drill.class, drill.grade)} status={drillStatus} />
            </StyledLandDetailLayoutLeft>
            <StyledLandDetailLayoutRight>
              <ConditionBox visible={isSameAddress(drill.owner, account) || isSameAddress(drill.origin_owner, account)}>
                <ContentWithHeader title={t('Manage')} helpInfo={<ManageHelpInfo />}>
                  <StyledFlexWrapBox>
                    {drill?.land_equip ? null : (
                      <Button scale='sm' onClick={() => onClickTransferDrill()}>
                        {t('Gift')}
                      </Button>
                    )}

                    {drill?.land_equip ? (
                      <StopDrillWorkingButton landId={landId} slotIndex={drill?.land_equip?.index} landTokenId={drill?.land_equip?.land_token_id} scale='sm'>
                        {t('Stop Work')}
                      </StopDrillWorkingButton>
                    ) : null}
                  </StyledFlexWrapBox>
                </ContentWithHeader>
              </ConditionBox>

              <ContentWithHeader title={t('Mined Resources')}>
                <MinedResources landId={landId} drillTokenId={drillTokenId} chainId={chainId} hasClaimButton />
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

export default React.memo<Props>(styled(EditDetail)`
  ${tw`flex flex-col`}
  .EditDetail--detail-box {
    ${tw`flex py-10`}
  }
`);
