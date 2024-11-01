// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback } from 'react';
import styled from 'styled-components';
import { BareProps } from 'components/types';
import { Text, Flex, Modal, ModalProps, useModal, EmptyView, RankIcon, Collapse, RankingSignageIcon, DemoLandIcon, LandBoxMini } from 'components';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { useGetLandRank } from 'hooks/backendApi/useGetLandRank';
import { LandRank } from 'hooks/backendApi/types';
import CopyToClipboard from 'components/WalletModal/CopyToClipboard';
import { bundleApi } from 'api';
import { toShortAddress } from 'utils/address';
import { useGetLandsList } from 'hooks/backendApi';
import { landSticker, navigateToDetail } from 'api/utils';
import useMatchBreakpoints from 'hooks/useMatchBreakpoints';
import { History } from 'history';
import { StyledLegendIconBox } from '../../styled';

export interface Props extends BareProps {
  number?: string;
  landId: SUPPORTED_LANDS_INDEX;
  history: History;
}

export interface BillboardModal extends ModalProps {
  landId: SUPPORTED_LANDS_INDEX;
  history: History;
}

const StyledBillboardList = styled.div`
  height: 70vh;
  overflow-y: auto;
  padding: 20px;

  ${({ theme }) => theme.mediaQueries.md} {
    width: 700px;
  }
`;

const StyledLandRankItem = styled(Flex)`
  align-items: center;
  border-radius: 10px;
  padding: 0 1rem;
  ${({ theme }) => theme.mediaQueries.md} {
    border-radius: 20px;
  }
`;

const StyledProjectIconBox = styled.div`
  position: relative;

  svg {
    position: absolute;
    z-index: 5;
  }
`;

const RankingSignageIconIndex = styled.p`
  position: relative;
  text-align: center;
  top: -2px;
  width: 20px;
  z-index: 10;
`;

const StyledLandListBox = styled(Flex)`
  padding: 10px 0 10px 10px;

  & > div {
    padding: 5px 10px 5px 0;
  }
`;

const BillboardItem: React.FC<{ project: LandRank; rank: number; landId: SUPPORTED_LANDS_INDEX; history: History; callback?: () => void }> = ({ project, rank, landId, history, callback }) => {
  const { isMobile } = useMatchBreakpoints();

  const { toDisplayAddress } = bundleApi[landId];
  const { data, isLoading } = useGetLandsList({
    landId,
    display: 'my',
    district: landId,
    filter: 'my',
    page: 0,
    row: project.count,
    order: 'desc',
    orderField: 'price',
    address: project.owner
  });
  const landList = data.data || [];

  const navigateToLand = useCallback(
    (tokenId: string) => {
      callback && callback();
      navigateToDetail(history, landId, 'land', tokenId);
    },
    [callback, history, landId]
  );

  return (
    <Collapse
      header={
        <StyledLandRankItem>
          <StyledProjectIconBox>
            <RankingSignageIcon />
            <RankingSignageIconIndex>{rank}</RankingSignageIconIndex>
          </StyledProjectIconBox>
          <Flex flex={1} ml={20}>
            <CopyToClipboard color='textSubtle' toCopy={toDisplayAddress(project.owner)}>
              {isMobile ? toShortAddress(toDisplayAddress(project.owner), 4) : toDisplayAddress(project.owner)}
            </CopyToClipboard>
          </Flex>
          <Flex alignItems='center'>
            <DemoLandIcon width='30px' />
            <Text small bold ml='5px' minWidth='30px'>
              x{project.count}
            </Text>
          </Flex>
        </StyledLandRankItem>
      }
    >
      <StyledLandListBox flexWrap='wrap'>
        {landList.map((land) => (
          <LandBoxMini
            pointer
            boxSize={isMobile ? 40 : 70}
            number={land.token_id}
            imageUrl={landSticker(land?.gx, land?.gy, landId)}
            imageOnClick={() => navigateToLand(land.token_id)}
            footerNode={
              <Text className='cursor-pointer' center small color='textSubtle' onClick={() => navigateToLand(land.token_id)}>
                {land.gx},{land.gy}
              </Text>
            }
          />
        ))}
      </StyledLandListBox>
    </Collapse>
  );
};

export const LandRankModal: React.FC<BillboardModal> = ({ landId, title, history, onDismiss, ...props }) => {
  const { data, isLoading } = useGetLandRank({ landId });

  return (
    <Modal bodyPadding='0' title={title} onDismiss={onDismiss} {...props}>
      {data.length === 0 ? (
        <EmptyView className='p-6' />
      ) : (
        <StyledBillboardList>
          {data.map((item, index) => (
            <BillboardItem project={item} rank={index + 1} landId={landId} history={history} callback={onDismiss} />
          ))}
        </StyledBillboardList>
      )}
    </Modal>
  );
};

const Rank: React.FC<Props> = ({ className, landId, history }) => {
  const { t } = useTranslation();
  const [onClickLandRank] = useModal(<LandRankModal title={t('Ranking')} landId={landId} history={history} />);

  return (
    <StyledLegendIconBox className={className} onClick={onClickLandRank}>
      <RankIcon color='textSubtle' />
    </StyledLegendIconBox>
  );
};

export default Rank;
