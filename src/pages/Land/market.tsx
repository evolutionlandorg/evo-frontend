// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Flex, Spinner, LandBox, LandFilter, Pagination, Box, EmptyView } from 'components';

import { useApi } from 'hooks/useApi';
import { useCurrentLand } from 'hooks/useRouterParams';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { GetLandsFilterType, GetLandsOrderType, GetLandsOrderFieldType, useGetLandsList, GetLandsFlagType } from 'hooks/backendApi';
import { navigateToDetail } from 'api/utils';
import { useQuery } from 'hooks/useSearch';
import type { Element } from 'types';
import { FILTER_PRICE_START, FILTER_PRICE_END, FILTER_RESOURCES, FILTER_FLAG } from 'components/Filter/Land/filter';
import { StyledPaneBox, StyledNftBoxList, StyledScrollY } from 'ui/styled';
import { getLandCoordinates } from 'utils/land';
import { MARKET_LIST_PAGE_SIZE } from 'config/constants';
import { SortFilter, LandStatusReadonly } from './component';

interface Props {
  data?: unknown;
  className?: string;
}

const Land: React.FC<Props> = (props) => {
  const { className } = props;
  const { i18n, t } = useTranslation(['land', 'common']);

  const categoryOptions = useMemo(
    () => [
      { label: t('land:category_All'), value: '' },
      { label: t('land:category_First Sale'), value: 'genesis' },
      { label: t('land:category_Resale'), value: 'secondhand' }
    ],
    [t]
  );

  const landId = useCurrentLand();
  const search = useQuery();
  const { url } = useRouteMatch();
  const [filter, setFilter] = useState<GetLandsFilterType>((search.get('filter') as GetLandsFilterType) === null ? 'genesis' : (search.get('filter') as GetLandsFilterType));
  const [order, setOrder] = useState<GetLandsOrderType>((search.get('order') as GetLandsOrderType) || 'asc');
  const [orderField, setOrderField] = useState<GetLandsOrderFieldType>((search.get('orderfield') as GetLandsOrderFieldType) || 'price');

  const api = useApi();
  const history = useHistory();

  const [pageSize, setPageSize] = useState<number>(parseInt(search.get('pagesize')) || MARKET_LIST_PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState<number>(parseInt(search.get('page')) || 1);
  const { data: landList, isLoading } = useGetLandsList({
    display: 'all',
    district: landId,
    filter,
    page: currentPage - 1,
    row: pageSize,
    order,
    orderField,
    landId,
    element: search.get(FILTER_RESOURCES) ? (search.get(FILTER_RESOURCES).split(',') as Element[]) : [],
    flag: search.get(FILTER_FLAG) ? (search.get(FILTER_FLAG).split(',') as GetLandsFlagType[]) : [],
    priceStart: search.get(FILTER_PRICE_START) || undefined,
    priceEnd: search.get(FILTER_PRICE_END) || undefined
  });

  function navigateToLand(tokenId: string) {
    navigateToDetail(history, landId, 'land', tokenId);
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

  const onChangePage = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);

    search.set('pagesize', size);
    search.set('page', page);
    history.push({ pathname: url, search: `?${search}` });
  };

  return (
    <StyledPaneBox className={className}>
      {/* <PopupHeader title='Land Market' color='backgroundBlue' /> */}
      <Flex flex='1' height='100%' overflow='hidden'>
        <LandFilter asyncSearch module={{ resources: true, price: true, flag: true }} />
        <StyledScrollY>
          <SortFilter categoryOptions={categoryOptions} onChangeCategoryFilter={onChangeFilter} categoryValue={filter} orderFieldValue={orderField} onChangeOrderField={onChangeOrderField} orderValue={order} onChangeOrder={onChangeOrder} />
          {isLoading ? (
            <Flex flex='1' height='450px' alignItems='center' justifyContent='center'>
              <Spinner size={128} />
            </Flex>
          ) : landList && landList.data && !!landList.data.length ? (
            <div>
              <StyledNftBoxList>
                {landList?.data?.map((land, index) => (
                  <div key={land.land_id}>
                    <LandBox className='LandMarket--landBox' number={`${land.land_id}`} subtitle={getLandCoordinates(land.lon, land.lat)} imageUrl={api.utils.landSticker(land.gx, land.gy, landId)} imageOnClick={() => navigateToLand(land.token_id)} land={land} hasTooltip footerNode={<LandStatusReadonly status={land.status} landId={landId} data={land} />} />
                  </div>
                ))}
              </StyledNftBoxList>
            </div>
          ) : (
            <EmptyView />
          )}
          <Flex justifyContent='center' mb={4}>
            <Pagination current={currentPage} onChange={onChangePage} pageSize={pageSize} total={landList?.count} />
          </Flex>
        </StyledScrollY>
      </Flex>
    </StyledPaneBox>
  );
};

export default React.memo<Props>(styled(Land)`
  display: flex;
  flex-direction: column;
`);
