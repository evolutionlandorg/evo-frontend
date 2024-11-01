// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo } from 'react';
import tw from 'twin.macro';
import { Flex, Spinner, ApostleBox, ContentWithHeader, ApostleAuction, Button, useModal, GoBack, LinkExternal, Text } from 'components';
import Page from 'components/Layout/Page';
import { useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useGetApostle } from 'hooks/backendApi';
import { useCurrentLand } from 'hooks/useRouterParams';
import { Location } from 'history';
import { isSameAddress } from 'utils/address';
import { StyledFlexWrapBox, StyledLandDetailLayout, StyledLandDetailLayoutLeft, StyledLandDetailLayoutRight } from 'ui/styled';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useTranslation } from 'react-i18next';
import { LandConfig } from '@evolutionland/evolution-js';
import { extendLandId } from 'utils';
import { getIsSupportByModuleName } from 'config';
import { ApostleTalent, SellApostleModal, RentApostleModal, BreedApostleModal, BlindDateApostleModal, CancelBreedAskButton, CancelHireButton, CancelAskWithTokenButton, TransferApostleModal, StopWorkingApostleButton, ClaimHireButton, ApostleAttribute, ApostleList, ApostleIntroduction, ApostleResourceLevel, ApostleWorkInfo, UnclaimedRewardButton, ApostleAbility, ApostleActionHistory, BirthButton, ColdDownButton, ManageHelpInfo } from './component';
import { InviteLink } from '../Land/component';

interface Props {
  data?: unknown;
  className?: string;
}

interface RouterParams {
  tokenId: string;
}

const EditDetail: React.FC<Props> = (props) => {
  const { className } = props;
  const landId = useCurrentLand();
  const { t } = useTranslation();
  const location = useLocation<Location>();
  const { account } = useActiveWeb3React(landId);

  const { tokenId: apostleTokenId } = useParams<RouterParams>();
  const { data: apostle, isLoading } = useGetApostle({ landId, tokenId: apostleTokenId });

  const supportXRING2XWRING = getIsSupportByModuleName(landId, 'XRING_TO_XWRING');
  const { RING } = LandConfig[extendLandId(landId)].tokens;
  const isXRING = useMemo(() => supportXRING2XWRING && !isSameAddress(apostle?.auction?.token?.address, RING.address), [RING.address, apostle?.auction?.token?.address, supportXRING2XWRING]);

  const [onClickSellApostle] = useModal(<SellApostleModal title={t('Sell Apostle')} landId={landId} tokenId={apostleTokenId} />);
  const [onClickRentApostle] = useModal(<RentApostleModal title={t('Rent Apostle')} landId={landId} tokenId={apostleTokenId} />);
  const [onClickBreedApostle] = useModal(<BreedApostleModal title={t('Breed Apostle')} landId={landId} initTargetTokenId={apostleTokenId} location={location} />);
  const [onClickBlindDateApostle] = useModal(<BlindDateApostleModal title={t('Blind Date Apostle')} landId={landId} tokenId={apostleTokenId} />);
  const [onClickTransferApostle] = useModal(<TransferApostleModal title={t('Transfer Apostle')} landId={landId} tokenId={apostleTokenId} />);

  const isOwner = useMemo(
    () =>
      isSameAddress(apostle?.owner, account) || // owner
      isSameAddress(apostle?.auction?.seller, account) || // auction seller
      isSameAddress(apostle?.auction?.winner, account), // auction unclaimed
    [account, apostle?.auction?.seller, apostle?.auction?.winner, apostle?.owner]
  );

  const unclaimedChild = useMemo(() => apostle?.apostle_children.find(({ token_id }) => !token_id), [apostle?.apostle_children]);

  const CD = useMemo(() => {
    const coldDownEnd = apostle?.cold_down_end;

    if (coldDownEnd && coldDownEnd > 0) {
      return apostle?.apostle_status === 'fresh' ? Date.now() + coldDownEnd * 1000 : coldDownEnd * 1000;
    }

    return 0;
  }, [apostle?.apostle_status, apostle?.cold_down_end]);

  return (
    <Page className={className}>
      {/* <PopupHeader title='Detail' /> */}
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
              <ContentWithHeader title={t('Manage')} helpInfo={<ManageHelpInfo />}>
                <StyledFlexWrapBox>
                  <ColdDownButton targetDate={CD}>
                    {unclaimedChild ? (
                      <BirthButton scale='sm' landId={landId} motherTokenId={unclaimedChild.apostle_mother} />
                    ) : (
                      <>
                        {apostle.apostle_status === 'fresh' ? (
                          <Button scale='sm' onClick={() => onClickSellApostle()}>
                            {t('Sell')}
                          </Button>
                        ) : null}
                        {apostle.apostle_status === 'fresh' ? (
                          <Button scale='sm' onClick={() => onClickRentApostle()}>
                            {t('Rent')}
                          </Button>
                        ) : null}
                        {apostle.apostle_status === 'fresh' ? (
                          <Button scale='sm' onClick={() => onClickBreedApostle()}>
                            {t('Breed')}
                          </Button>
                        ) : null}
                        {apostle.apostle_status === 'fresh' ? (
                          <Button scale='sm' onClick={() => onClickBlindDateApostle()}>
                            {t('Blind Date')}
                          </Button>
                        ) : null}
                        {apostle.apostle_status === 'fresh' ? (
                          <Button scale='sm' onClick={() => onClickTransferApostle()}>
                            {t('Gift')}
                          </Button>
                        ) : null}

                        {apostle.apostle_status === 'fertility' ? (
                          <CancelBreedAskButton scale='sm' landId={landId} tokenId={apostle.token_id}>
                            {t('Cancel Blind Date')}
                          </CancelBreedAskButton>
                        ) : null}
                        {apostle.apostle_status === 'rent' ? (
                          <CancelHireButton scale='sm' landId={landId} tokenId={apostle.token_id}>
                            {t('Cancel Rent')}
                          </CancelHireButton>
                        ) : null}
                        {apostle.apostle_status === 'onsell' && isOwner && !apostle?.auction.history.length ? (
                          <CancelAskWithTokenButton scale='sm' landId={landId} tokenId={apostle.token_id}>
                            {t('Cancel Sell')}
                          </CancelAskWithTokenButton>
                        ) : null}
                        {apostle.apostle_status === 'working' && isOwner ? (
                          <StopWorkingApostleButton scale='sm' landId={landId} tokenId={apostle.token_id}>
                            {t('Stop Working')}
                          </StopWorkingApostleButton>
                        ) : null}
                        {apostle.apostle_status === 'hiringUnclaimed' ? (
                          <ClaimHireButton scale='sm' landId={landId} tokenId={apostle.token_id}>
                            {t('Claim Hire')}
                          </ClaimHireButton>
                        ) : null}
                        {apostle.apostle_status === 'unclaimed' ? (
                          <UnclaimedRewardButton scale='sm' landId={landId} tokenId={apostle.token_id}>
                            {t('Claim')}
                          </UnclaimedRewardButton>
                        ) : null}
                      </>
                    )}
                  </ColdDownButton>
                </StyledFlexWrapBox>
              </ContentWithHeader>

              {apostle?.working ? (
                <ContentWithHeader title={t('Apostle Status')}>
                  <ApostleWorkInfo work={apostle.working} landId={landId} />
                </ContentWithHeader>
              ) : null}

              {apostle.auction && apostle.apostle_status === 'onsell' && (
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
              )}

              {apostle.auction?.history && apostle.auction?.history.length > 0 ? (
                <ContentWithHeader title={t('Auction History')}>
                  <ApostleActionHistory landId={landId} history={apostle.auction?.history} />
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

export default React.memo<Props>(styled(EditDetail)`
  ${tw`flex flex-col`}
`);
