// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Flex, Spinner, LandBox, LandFilter, Pagination, EmptyView } from 'components';
import { useApi } from 'hooks/useApi';
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { GetLandsFilterType, GetLandsOrderType, GetLandsOrderFieldType, useGetLandsList, GetLandsFlagType } from 'hooks/backendApi';
import { navigateToDetail } from 'api/utils';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useCurrentLand } from 'hooks/useRouterParams';
import { useQuery } from 'hooks/useSearch';
import type { Element } from 'types';
import { FILTER_RESOURCES, FILTER_FLAG } from 'components/Filter/Land/filter';
import { StyledPaneBox, StyledNftBoxList, StyledScrollY } from 'ui/styled';
import { getLandCoordinates } from 'utils/land';
import { MARKET_LIST_PAGE_SIZE } from 'config/constants';
import { SortFilter, LandStatus } from './component';

interface Props {
  data?: unknown;
  className?: string;
}

const Land: React.FC<Props> = (props) => {
  const { className } = props;
  const { i18n, t } = useTranslation();

  const categoryOptions = useMemo(
    () => [
      { label: t('land:category_Mine'), value: 'my' },
      { label: t('land:category_Bid'), value: 'bid' },
      { label: t('land:category_On Sale'), value: 'onsale' },
      { label: t('land:category_Unclaimed'), value: 'unclaimed' }
    ],
    [t]
  );

  const search = useQuery();
  const { url } = useRouteMatch();
  const landId = useCurrentLand();
  const { library, account, chainId } = useActiveWeb3React(landId);
  const [filter, setFilter] = useState<GetLandsFilterType>((search.get('filter') as GetLandsFilterType) || 'my');
  const [order, setOrder] = useState<GetLandsOrderType>((search.get('order') as GetLandsOrderType) || 'asc');
  const [orderField, setOrderField] = useState<GetLandsOrderFieldType>((search.get('orderfield') as GetLandsOrderFieldType) || 'price');

  const { utils } = useApi();

  const history = useHistory();

  const [pageSize, setPageSize] = useState<number>(parseInt(search.get('pagesize')) || MARKET_LIST_PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState<number>(parseInt(search.get('page')) || 1);

  const { data: landList, isLoading } = useGetLandsList({
    display: 'my',
    district: landId,
    filter,
    page: currentPage - 1,
    row: pageSize,
    order,
    orderField,
    address: account,
    landId,
    element: search.get(FILTER_RESOURCES) ? (search.get(FILTER_RESOURCES).split(',') as Element[]) : [],
    flag: search.get(FILTER_FLAG) ? (search.get(FILTER_FLAG).split(',') as GetLandsFlagType[]) : []
  });

  function navigateToLand(tokenId: string) {
    navigateToDetail(history, landId, 'land', tokenId, true);
  }

  const onChangeFilter = (e) => {
    setCurrentPage(1);
    setFilter(e.target.value);

    search.set('filter', e.target.value);
    search.set('page', '1');
    history.push({ pathname: url, search: `?${search}` });
  };

  const onChangeOrder = (value) => {
    setCurrentPage(1);
    setOrder(value);

    search.set('order', value);
    search.set('page', '1');
    history.push({ pathname: url, search: `?${search}` });
  };

  const onChangeOrderField = (value) => {
    setCurrentPage(1);
    setOrderField(value);

    search.set('orderfield', value);
    search.set('page', '1');
    history.push({ pathname: url, search: `?${search}` });
  };

  return (
    <StyledPaneBox className={className}>
      {/* <PopupHeader title='My Land' /> */}
      <Flex flex='1' height='100%' overflow='hidden'>
        <LandFilter asyncSearch module={{ resources: true, flag: true }} />
        <StyledScrollY>
          <SortFilter categoryOptions={categoryOptions} onChangeCategoryFilter={onChangeFilter} categoryValue={filter} orderFieldValue={orderField} onChangeOrderField={onChangeOrderField} orderValue={order} onChangeOrder={onChangeOrder} />
          {isLoading ? (
            <Flex flex='1' height='450px' alignItems='center' justifyContent='center'>
              <Spinner size={128} />
            </Flex>
          ) : landList && landList.data && !!landList.data.length ? (
            <div>
              <StyledNftBoxList>
                {landList?.data?.map((land, index) => {
                  const status = [];
                  land?.drills?.length > 0 && status.push('land-drillworking');
                  land?.apostle_worker?.length > 0 && status.push('land-apostleworking');

                  return (
                    <div key={land.land_id}>
                      <LandBox status={status} className='LandMarket--landBox' number={`${land.land_id}`} subtitle={getLandCoordinates(land.lon, land.lat)} imageUrl={utils.landSticker(land.gx, land.gy, landId)} imageOnClick={() => navigateToLand(land.token_id)} footerNode={<LandStatus status={land.status} landId={landId} data={land} />} hasTooltip land={land} />
                    </div>
                  );
                })}
              </StyledNftBoxList>
            </div>
          ) : (
            <EmptyView link={`/land/${landId}/market/land`} buttonText={t('Buy Land')} />
          )}
          <Flex justifyContent='center' my={4}>
            <Pagination
              current={currentPage}
              onChange={(page, size) => {
                setCurrentPage(page);
                setPageSize(size);
              }}
              pageSize={pageSize}
              total={landList?.count}
            />
          </Flex>
        </StyledScrollY>
      </Flex>
    </StyledPaneBox>
  );
};

export default React.memo<Props>(Land);
