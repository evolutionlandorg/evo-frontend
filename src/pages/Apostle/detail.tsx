// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import tw from 'twin.macro';
import React, { useCallback, useMemo } from 'react';
import { Flex, Spinner, ApostleBox, ContentWithHeader, ApostleAuction, ApostleFertilityAuction, ApostleRentAuction, Button, ConditionBox, LinkExternal, GoBack, Text } from 'components';
import Page from 'components/Layout/Page';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useGetApostle } from 'hooks/backendApi';
import { navigateToDetail } from 'api/utils';
import { useCurrentLand } from 'hooks/useRouterParams';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { isSameAddress } from 'utils/address';
import { StyledFlexWrapBox, StyledLandDetailLayout, StyledLandDetailLayoutLeft, StyledLandDetailLayoutRight } from 'ui/styled';
import { useTranslation } from 'react-i18next';
import { LandConfig } from '@evolutionland/evolution-js';
import { extendLandId } from 'utils';
import { getIsSupportByModuleName } from 'config';
import { ApostleTalent, ApostleAttribute, ApostleList, ApostleIntroduction, ApostleResourceLevel, ApostleWorkInfo, ApostleActionHistory, ApostleAbility, ManageHelpInfo } from './component';
import { InviteLink } from '../Land/component';

interface Props {
  data?: unknown;
  className?: string;
}

interface RouterParams {
  tokenId: string;
}

const Detail: React.FC<Props> = (props) => {
  const { className } = props;
  const history = useHistory();
  const { t } = useTranslation();
  const landId = useCurrentLand();
  const { tokenId: apostleTokenId } = useParams<RouterParams>();
  const { data: apostle, isLoading } = useGetApostle({ landId, tokenId: apostleTokenId });
  const { account } = useActiveWeb3React(landId);
  const supportXRING2XWRING = getIsSupportByModuleName(landId, 'XRING_TO_XWRING');
  const { RING } = LandConfig[extendLandId(landId)].tokens;
  const isXRING = useMemo(() => supportXRING2XWRING && !isSameAddress(apostle?.auction?.token?.address, RING.address), [RING.address, apostle?.auction?.token?.address, supportXRING2XWRING]);
  const navigateTo = useCallback(
    (tokenId, isEdit) => {
      navigateToDetail(history, landId, 'apostle', tokenId, isEdit);
    },
    [history, landId]
  );

  if (!apostle) {
    return null;
  }

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
              <ApostleBox number={`${apostle.token_index}`} subtitle={apostle.apostle_status} imageUrl={apostle.apostle_picture} apostle={apostle} />
            </StyledLandDetailLayoutLeft>
            <StyledLandDetailLayoutRight>
              <ConditionBox visible={isSameAddress(apostle.origin_owner, account) || isSameAddress(apostle.owner, account)}>
                <ContentWithHeader title={t('Manage')} helpInfo={<ManageHelpInfo />}>
                  <StyledFlexWrapBox>
                    <Button scale='sm' onClick={() => navigateTo(apostleTokenId, true)}>
                      {t('Manage')}
                    </Button>
                  </StyledFlexWrapBox>
                </ContentWithHeader>
              </ConditionBox>

              <ConditionBox visible={apostle.apostle_status === 'onsell' && apostle.auction && apostle.auction.start_at !== 0}>
                <ContentWithHeader
                  title={t('Auction')}
                  helpInfo={
                    <>
                      <LinkExternal href='https://docs.evolution.land/advanced/trading/nft-market'> Evolution Land In-Game NFT Market</LinkExternal> provides Auction System, give you flexibility to sell your asset at a fixed price or use Dutch Auction or Reversed Dutch Auction.
                    </>
                  }
                  subTitle={<InviteLink />}
                >
                  {isXRING ? <Text>{t('xring_to_xwring_tip_apostle')}</Text> : <ApostleAuction data={apostle.auction} tokenId={apostle.token_id} />}
                </ContentWithHeader>
              </ConditionBox>

              <ConditionBox visible={apostle.apostle_status === 'fertility' && apostle.auction && apostle.auction.start_at !== 0}>
                <ContentWithHeader title={t('Auction')}>{isXRING ? <Text>{t('xring_to_xwring_tip_apostle')}</Text> : <ApostleFertilityAuction data={apostle.auction} tokenId={apostle.token_id} />}</ContentWithHeader>
              </ConditionBox>

              <ConditionBox visible={apostle.apostle_status === 'rent' && !!apostle.auction}>
                <ContentWithHeader title={t('Auction')}>{isXRING ? <Text>{t('xring_to_xwring_tip_apostle')}</Text> : <ApostleRentAuction data={apostle.auction} tokenId={apostle.token_id} />}</ContentWithHeader>
              </ConditionBox>

              {apostle.auction?.history && apostle.auction?.history.length > 0 ? (
                <ContentWithHeader title={t('Auction History')}>
                  <ApostleActionHistory landId={landId} history={apostle.auction?.history} />
                </ContentWithHeader>
              ) : null}

              {apostle?.working ? (
                <ContentWithHeader title={t('Working')}>
                  <ApostleWorkInfo work={apostle.working} landId={landId} />
                </ContentWithHeader>
              ) : null}

              <ContentWithHeader title={t('Introduction')}>
                <ApostleIntroduction landId={landId} address={apostle.origin_owner} name={apostle.name} introduction={apostle.introduction} />
              </ContentWithHeader>

              <ContentWithHeader
                title={t('Appearance')}
                helpInfo={
                  <>
                    Apostles have a unique physical appearance, talents. Traits are determined by inherited and mutated genome.
                    <LinkExternal href='https://docs.evolution.land/getting-started/game-entities/apostle/genome'>Docs</LinkExternal>
                  </>
                }
              >
                <ApostleAttribute attributes={apostle.attributes} />
              </ContentWithHeader>

              <ContentWithHeader title={t('Ability')} helpInfo={<>Ability depends on apostles talent</>}>
                <ApostleAbility talent={apostle.apostle_talent} />
              </ContentWithHeader>

              <ContentWithHeader
                title={t('Talent')}
                helpInfo={
                  <>
                    The apostle&apos;s talent is determined by genes, and it is possible to inherit. Come and explore.
                    <LinkExternal href='https://docs.evolution.land/getting-started/game-entities/apostle/skills'>Docs</LinkExternal>
                  </>
                }
              >
                <ApostleTalent talent={apostle.apostle_talent} />
              </ContentWithHeader>

              <ContentWithHeader title={t('Resource Level')}>
                <ApostleResourceLevel
                  {...{
                    gold: apostle.apostle_talent.element_gold,
                    wood: apostle.apostle_talent.element_wood,
                    water: apostle.apostle_talent.element_water,
                    fire: apostle.apostle_talent.element_fire,
                    soil: apostle.apostle_talent.element_soil
                  }}
                />
              </ContentWithHeader>

              {apostle.apostle_father?.token_id || apostle.apostle_mother?.token_id ? (
                <ContentWithHeader title={t('Parents')}>
                  <ApostleList list={[apostle.apostle_father, apostle.apostle_mother]} />
                </ContentWithHeader>
              ) : null}

              {apostle.apostle_children && apostle.apostle_children?.length > 0 ? (
                <ContentWithHeader title={t('Children')}>
                  <ApostleList list={apostle.apostle_children} />
                </ContentWithHeader>
              ) : null}
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
