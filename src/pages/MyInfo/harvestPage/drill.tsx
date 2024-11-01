// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Flex, Spinner, Pagination, StopPropagation, ScaleFlex, EmptyView } from 'components';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useGetDrillList } from 'hooks/backendApi';
import { navigateToDetail } from 'api/utils';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useCurrentLand } from 'hooks/useRouterParams';
import type { SUPPORTED_LANDS_INDEX } from 'types';
import { StyledNftBoxListInPage, StyledContentBox } from 'ui/styled';
import { useLandGetAvailableItemResources } from 'hooks/useLand';
import { BareProps } from 'components/types';
import { Checkbox } from 'antd';
import _ from 'lodash';
import { JSBI, LandConfig, TokenAmount } from '@evolutionland/evolution-js';
import { extendLandId } from 'utils';
import { BIG_ZERO } from 'utils/bigNumber';
import BigNumber from 'bignumber.js';
import { ClaimDrillResourceButton, IllustratedBox } from 'pages/Drill/component';
import { getDrillImage } from 'pages/Drill/utils';
import styled from 'styled-components';
import { ResourceBox } from '../component/ResourceBox';
import { ResourceTotal } from '../component';
import { StyledFooterBox, StyledPageBox } from './styled';

interface Props {
  data?: unknown;
  className?: string;
}

interface DrillMinedResourceProps extends BareProps {
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

const DrillMinedResource: React.FC<DrillMinedResourceProps> = ({ landId, tokenId, isChecked, onCheckBoxChange, resourceLoaded }) => {
  const minedResources = useLandGetAvailableItemResources(landId, tokenId);

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

const Drill: React.FC<Props> = ({ className }) => {
  const { t } = useTranslation();

  const landId = useCurrentLand();
  const { GOLD, WOOD, WATER, FIRE, SOIL } = LandConfig[extendLandId(landId)].tokens;
  const [resource, setResource] = useState<Record<string, BigNumber[]>>({});

  const { account } = useActiveWeb3React(landId);

  const history = useHistory();

  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data: drillList, isLoading } = useGetDrillList({
    landId,
    address: account,
    page: currentPage - 1,
    row: pageSize,
    order: 'desc'
  });

  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  const [checkedList, setCheckedList] = useState<string[]>([]);

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

      setCheckAll(drillList?.data?.length === currentList.length);
      setIndeterminate(!!currentList.length && currentList.length < drillList?.data.length);
      setCheckedList(currentList);
    },
    [checkedList, drillList?.data?.length]
  );

  const handleCheckAllChange = useCallback(
    (e) => {
      setCheckedList(e.target.checked ? drillList.data.map((item) => item.token_id) : []);
      setIndeterminate(false);
      setCheckAll(e.target.checked);
    },
    [drillList?.data]
  );

  const navigateToDrill = useCallback(
    (tokenId: string) => {
      navigateToDetail(history, landId, 'drill', tokenId, true);
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

  const hasDrillList = useMemo(() => drillList?.data && drillList?.data?.length > 0, [drillList]);

  return (
    <>
      <StyledContentBox className={className}>
        <div>
          {isLoading ? (
            <Flex flex='1' height='450px' alignItems='center' justifyContent='center'>
              <Spinner size={128} />
            </Flex>
          ) : hasDrillList ? (
            <StyledNftBoxListInPage>
              {drillList?.data?.map((drill) => {
                const status = [];
                drill?.land_equip && status.push('land-drillworking');

                const isChecked = _.indexOf(checkedList, drill.token_id) > -1;

                return (
                  <div key={drill.token_id}>
                    <IllustratedBox landId={landId} formulaId={drill.formula_id} subtitle='' imageUrl={getDrillImage(drill.class, drill.grade)} imageOnClick={() => navigateToDrill(drill.token_id)} status={status} footerNode={<DrillMinedResource landId={landId} tokenId={drill.token_id} onCheckBoxChange={handleCheckBoxChange} resourceLoaded={handleResourceLoaded} isChecked={isChecked} />} />
                  </div>
                );
              })}
            </StyledNftBoxListInPage>
          ) : (
            <FixedEmptyView />
          )}

          {hasDrillList && (
            <StyledPageBox my={4}>
              <Flex flex='1' />
              <Flex flex='3' my='1rem' justifyContent='center'>
                <Pagination current={currentPage} onChange={handlerPaginationChange} pageSize={pageSize} total={drillList?.count} showSizeChanger={false} />
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

        <ClaimDrillResourceButton width='100%' landId={landId} scale='sm' drillTokenIds={checkedList}>
          {t('Harvest')}
        </ClaimDrillResourceButton>
      </StyledFooterBox>
    </>
  );
};

export default React.memo<Props>(Drill);
