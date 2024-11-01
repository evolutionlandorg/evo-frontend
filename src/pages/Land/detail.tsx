// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import tw from 'twin.macro';
import React, { useCallback, useMemo } from 'react';
import Page from 'components/Layout/Page';
import { Flex, Spinner, LandBox, ContentWithHeader, LandAuction, Button, ConditionBox, GoBack, LinkExternal, Text } from 'components';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useGetLand } from 'hooks/backendApi';
import { navigateToDetail, landSticker } from 'api/utils';
import { useCurrentLand } from 'hooks/useRouterParams';
import { isSameAddress } from 'utils/address';
import { getLandCoordinates } from 'utils/land';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { StyledFlexWrapBox, StyledLandDetailLayout, StyledLandDetailLayoutLeft, StyledLandDetailLayoutRight } from 'ui/styled';
import { useTranslation } from 'react-i18next';
import { getIsSupportByModuleName } from 'config';
import useMatchBreakpoints from 'hooks/useMatchBreakpoints';
import { LandConfig } from '@evolutionland/evolution-js';
import { extendLandId } from 'utils';
import { InviteLink, ApostleWorkSpace, DrillWorkSpace, LandAttr, LandResource, LandActionHistory, LandFinalRecordHistory, LandMatedata } from './component';

interface Props {
  data?: unknown;
  className?: string;
}

interface RouterParams {
  tokenId: string;
}

const Detail: React.FC<Props> = ({ className }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const landId = useCurrentLand();
  const { tokenId: landTokenId } = useParams<RouterParams>();
  const { fetchData, data: land, isLoading } = useGetLand({ tokenId: landTokenId });
  const { account } = useActiveWeb3React(landId);
  const { isMobile } = useMatchBreakpoints();
  const nftBoxSize = useMemo(() => (isMobile ? 50 : 100), [isMobile]);
  const supportXRING2XWRING = getIsSupportByModuleName(landId, 'XRING_TO_XWRING');
  const { RING } = LandConfig[extendLandId(landId)].tokens;

  const isOwner = useMemo(
    () =>
      isSameAddress(land?.land_data?.owner, account) || // owner
      isSameAddress(land?.auction?.seller, account) || // auction seller
      isSameAddress(land?.auction?.winner_address, account), // auction unclaimed
    [account, land?.auction?.seller, land?.auction?.winner_address, land?.land_data?.owner]
  );

  const navigateTo = useCallback(
    (tokenId, isEdit) => {
      navigateToDetail(history, landId, 'land', tokenId, isEdit);
    },
    [history, landId]
  );

  if (!land) {
    return <Page className={className}>Not Found</Page>;
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
              <LandBox number={`${land?.land_data.land_id}`} subtitle={getLandCoordinates(land?.land_data.lon, land?.land_data.lat)} imageUrl={landSticker(land?.land_data.gx, land?.land_data.gy, landId)} />
            </StyledLandDetailLayoutLeft>
            <StyledLandDetailLayoutRight>
              <ConditionBox visible={isOwner}>
                <ContentWithHeader title={t('Manage')}>
                  <StyledFlexWrapBox>
                    <Button scale='sm' onClick={() => navigateTo(landTokenId, true)}>
                      {t('land:Manage')}
                    </Button>
                  </StyledFlexWrapBox>
                </ContentWithHeader>
              </ConditionBox>

              <ContentWithHeader
                title={t('land:Attributes')}
                helpInfo={
                  <>
                    The Land is an NFT (non-fungible token, ERC721). When you purchased a Land, the Land NFT token is transferred to your wallet address from the marketplace (a smart-contract auction, for example).
                    <LinkExternal href='https://docs.evolution.land/getting-started/game-entities/land'> Docs</LinkExternal>
                  </>
                }
              >
                <LandAttr land={land?.land_data} resource={land.resource} />
              </ContentWithHeader>

              <ContentWithHeader title={t('land:Infomation')}>
                <LandMatedata
                  supportEdit={isOwner}
                  size={isMobile ? '150px' : '200px'}
                  landId={landId}
                  landIndex={land?.land_data.id}
                  landCoverMetaData={{
                    bio: land?.land_data?.introduction,
                    link: land?.land_data?.land_url,
                    cover: land?.land_data?.cover
                  }}
                  saveCallback={fetchData}
                />
              </ContentWithHeader>

              <ContentWithHeader
                title={t('land:Resources')}
                helpInfo={
                  <>
                    The maximum amount of resources that can be mined per day on the land. <LinkExternal href='https://docs.evolution.land/getting-started/game-entities/resource'>Docs</LinkExternal>
                  </>
                }
              >
                <LandResource resource={land.resource} />
              </ContentWithHeader>

              {land.auction && land.auction?.status === 'going' ? (
                <ContentWithHeader
                  title={t('land:Auction')}
                  helpInfo={
                    <>
                      <LinkExternal href='https://docs.evolution.land/advanced/trading/nft-market'> Evolution Land In-Game NFT Market</LinkExternal> provides Auction System, give you flexibility to sell your asset at a fixed price or use Dutch Auction or Reversed Dutch Auction.
                    </>
                  }
                  subTitle={<InviteLink />}
                >
                  {supportXRING2XWRING && !isSameAddress(land.auction?.token?.address, RING.address) ? <Text>{t('xring_to_xwring_tip_land')}</Text> : <LandAuction data={land.auction} tokenId={land?.land_data.token_id} />}
                </ContentWithHeader>
              ) : null}

              {/* <ContentWithHeader
                title={
                  <Flex className='justify-center items-center'>
                    <Text bold>Mined Resources</Text> <QuestionHelper className='ml-2' text='Mined resource, if your are owner, click claim to transfer to your asset.' />
                  </Flex>
                }
              >
                <MinedResources landId={landId} landTokenId={landTokenId} />
              </ContentWithHeader> */}

              {land.auction?.history && land.auction?.history.length > 0 ? (
                <ContentWithHeader title={t('land:Auction History')}>
                  <LandActionHistory landId={landId} history={land.auction?.history} />
                </ContentWithHeader>
              ) : null}

              <ContentWithHeader title={t('land:Apostle WorkSpace')}>
                <ApostleWorkSpace boxSize={nftBoxSize} isOwner={isOwner} operation={false} landTokenId={land?.land_data?.token_id} apostleList={land?.land_data?.apostle_worker || []} history={history} />
              </ContentWithHeader>

              {getIsSupportByModuleName(landId, 'DRILL') ? (
                <ContentWithHeader title={t('land:Drills WorkSpace')}>
                  <DrillWorkSpace isLandOwner={isOwner} operation landTokenId={land?.land_data?.token_id} drillList={land?.land_data?.drills || []} history={history} />
                </ContentWithHeader>
              ) : null}

              {land?.record && land?.record?.length > 0 ? (
                <ContentWithHeader title={t('land:History')}>
                  <LandFinalRecordHistory landId={landId} record={land?.record} />
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
