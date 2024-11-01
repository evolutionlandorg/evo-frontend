// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Flex, Spinner, LandBox, Pagination, StopPropagation, EmptyView } from 'components';
import { useApi } from 'hooks/useApi';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useGetLandsList } from 'hooks/backendApi';
import { navigateToDetail } from 'api/utils';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useCurrentLand } from 'hooks/useRouterParams';
import type { SUPPORTED_LANDS_INDEX } from 'types';
import { StyledNftBoxListInPage, StyledContentBox } from 'ui/styled';
import { getLandCoordinates } from 'utils/land';
import { ClaimLandResourceButton } from 'pages/Land/component';
import { useLandGetAvailableResources } from 'hooks/useLand';
import { BareProps } from 'components/types';
import { Checkbox } from 'antd';
import _ from 'lodash';
import { JSBI, LandConfig, TokenAmount } from '@evolutionland/evolution-js';
import { extendLandId } from 'utils';
import { BIG_ZERO } from 'utils/bigNumber';
import BigNumber from 'bignumber.js';
import { ResourceBox } from '../component/ResourceBox';
import { ResourceTotal } from '../component';
import { StyledFooterBox, StyledPageBox } from './styled';

interface Props {
  data?: unknown;
  className?: string;
}

interface LandMinedResourceProps extends BareProps {
  landId: SUPPORTED_LANDS_INDEX;
  tokenId: string;
  onCheckBoxChange: (a: any) => void;
  isChecked: boolean;
  resourceLoaded: (a: string, b: BigNumber[]) => void;
}

const FixedEmptyView = styled(EmptyView)`
  height: 450px;
`;

const ZERO_RESOURCE = [BIG_ZERO, BIG_ZERO, BIG_ZERO, BIG_ZERO, BIG_ZERO];

const LandMinedResource: React.FC<LandMinedResourceProps> = ({ className, landId, tokenId, isChecked, onCheckBoxChange, resourceLoaded }) => {
  const minedResources = useLandGetAvailableResources(landId, tokenId);

  const gold = minedResources[0].toString();
  const wood = minedResources[1].toString();
  const water = minedResources[2].toString();
  const fire = minedResources[3].toString();
  const soil = minedResources[4].toString();

  useEffect(() => {
    resourceLoaded && resourceLoaded(tokenId, [new BigNumber(gold), new BigNumber(wood), new BigNumber(water), new BigNumber(fire), new BigNumber(soil)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fire, gold, soil, tokenId, water, wood]);

  return (
    <>
      <ResourceBox landId={landId} minedResources={minedResources} />
      <StopPropagation>
        <Checkbox value={tokenId} checked={isChecked} onChange={onCheckBoxChange} />
      </StopPropagation>
    </>
  );
};

const Land: React.FC<Props> = ({ className }) => {
  const { i18n, t } = useTranslation();
  const landId = useCurrentLand();
  const { GOLD, WOOD, WATER, FIRE, SOIL } = LandConfig[extendLandId(landId)].tokens;
  const [resource, setResource] = useState<Record<string, BigNumber[]>>({});

  const { library, account, chainId } = useActiveWeb3React(landId);
  const { utils } = useApi();

  const history = useHistory();

  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data: landList, isLoading } = useGetLandsList({
    display: 'my',
    district: landId,
    filter: 'my',
    page: currentPage - 1,
    row: pageSize,
    order: 'desc',
    orderField: 'price',
    address: account,
    landId
  });

  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  const [checkedList, setCheckedList] = useState([]);

  const handleResourceLoaded = (tokenId, data) => {
    setResource((prev) => {
      return {
        ...prev,
        [tokenId]: data
      };
    });
  };

  const resourceTotal = useMemo(() => {
    const totolResource = [...ZERO_RESOURCE];
    checkedList.forEach((_tokenId) => {
      if (resource[_tokenId]) {
        totolResource[0] = totolResource[0].plus(resource[_tokenId][0]);
        totolResource[1] = totolResource[1].plus(resource[_tokenId][1]);
        totolResource[2] = totolResource[2].plus(resource[_tokenId][2]);
        totolResource[3] = totolResource[3].plus(resource[_tokenId][3]);
        totolResource[4] = totolResource[4].plus(resource[_tokenId][4]);
      }
    });
    return totolResource;
  }, [checkedList, resource]);

  const handleCheckBoxChange = useCallback(
    (e) => {
      let currentList = [];
      if (e.target.checked) {
        currentList = _.union(checkedList, [e.target.value]);
      } else {
        currentList = _.without(checkedList, e.target.value);
      }

      setCheckAll(landList?.data?.length === currentList.length);
      setIndeterminate(!!currentList.length && currentList.length < landList?.data.length);
      setCheckedList(currentList);
    },
    [checkedList, landList?.data?.length]
  );

  const handleCheckAllChange = useCallback(
    (e) => {
      setCheckedList(e.target.checked ? landList?.data.map((item) => item.token_id) : []);
      setIndeterminate(false);
      setCheckAll(e.target.checked);
    },
    [landList?.data]
  );

  const navigateToLand = useCallback(
    (tokenId: string) => {
      navigateToDetail(history, landId, 'land', tokenId, true);
    },
    [history, landId]
  );

  const handlerPaginationChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);

    setCheckAll(false);
    setIndeterminate(false);
    setCheckedList([]);
  };

  const hasLandList = useMemo(() => landList?.data && landList?.data.length > 0, [landList]);

  return (
    <>
      <StyledContentBox className={className}>
        <div>
          {isLoading ? (
            <Flex flex='1' height='450px' alignItems='center' justifyContent='center'>
              <Spinner size={128} />
            </Flex>
          ) : hasLandList ? (
            <StyledNftBoxListInPage>
              {landList?.data?.map((land) => {
                const status = [];
                land?.drills?.length > 0 && status.push('land-drillworking');
                land?.apostle_worker?.length > 0 && status.push('land-apostleworking');
                const isChecked = _.indexOf(checkedList, land.token_id) > -1;

                return (
                  <div key={land.land_id}>
                    <LandBox status={status} number={`${land.land_id}`} subtitle={getLandCoordinates(land.lon, land.lat)} imageUrl={utils.landSticker(land.gx, land.gy, landId)} imageOnClick={() => navigateToLand(land.token_id)} footerNode={<LandMinedResource landId={landId} tokenId={land.token_id} onCheckBoxChange={handleCheckBoxChange} resourceLoaded={handleResourceLoaded} isChecked={isChecked} />} hasTooltip land={land} />
                  </div>
                );
              })}
            </StyledNftBoxListInPage>
          ) : (
            <FixedEmptyView />
          )}

          {hasLandList && (
            <StyledPageBox my={4}>
              <Flex flex='1' />
              <Flex flex='3' justifyContent='center'>
                <Pagination current={currentPage} onChange={handlerPaginationChange} pageSize={pageSize} total={landList?.count} showSizeChanger={false} />
              </Flex>
              <Flex flex='1' justifyContent='flex-end' alignItems='center'>
                <Checkbox indeterminate={indeterminate} onChange={handleCheckAllChange} checked={checkAll}>
                  {t('Select all')}
                </Checkbox>
              </Flex>
            </StyledPageBox>
          )}
        </div>
      </StyledContentBox>

      <StyledFooterBox>
        <ResourceTotal amounts={[new TokenAmount(GOLD, JSBI.BigInt(resourceTotal[0].toString())), new TokenAmount(WOOD, JSBI.BigInt(resourceTotal[1].toString())), new TokenAmount(WATER, JSBI.BigInt(resourceTotal[2].toString())), new TokenAmount(FIRE, JSBI.BigInt(resourceTotal[3].toString())), new TokenAmount(SOIL, JSBI.BigInt(resourceTotal[4].toString()))]} />

        <ClaimLandResourceButton landId={landId} scale='sm' landTokenIds={checkedList}>
          {t('Harvest')}
        </ClaimLandResourceButton>
      </StyledFooterBox>
    </>
  );
};

export default React.memo<Props>(Land);
