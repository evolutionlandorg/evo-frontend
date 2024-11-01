// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Flex, Spinner, ApostleBox, Pagination, EmptyView } from 'components';
import React, { useCallback, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { useGetApostlesList, GetApostlesFilterType, GetApostlesOrderType, GetApostlesOrderFieldType } from 'hooks/backendApi';
import { navigateToDetail } from 'api/utils';
import { ApostleFilter } from 'components/Filter';
import { useCurrentLand } from 'hooks/useRouterParams';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useQuery } from 'hooks/useSearch';
import type { Element } from 'types';
import { FILTER_RESOURCES, FILTER_GENS_START, FILTER_GENS_END, FILTER_PROFESSION } from 'components/Filter/Apostle/filter';
import { StyledPaneBox, StyledNftBoxList, StyledScrollY } from 'ui/styled';
import { IMG_APOSTLE_EGG_GIF, MARKET_LIST_PAGE_SIZE } from 'config/constants';
import { MineApostleSortFilter, ApostleStatus } from './component';

interface Props {
  data?: unknown;
  className?: string;
}

const MyApostle: React.FC<Props> = (props) => {
  const { className } = props;
  const { t } = useTranslation();
  const landId = useCurrentLand();
  const search = useQuery();
  const { url } = useRouteMatch();
  const categoryOptions = useMemo(
    () => [
      { label: t('category_Mine'), value: 'my' },
      { label: t('category_On Sale'), value: 'onsell' },
      { label: t('category_For Breed'), value: 'fertility' },
      { label: t('category_Recruit'), value: 'rent' },
      { label: t('category_Bid'), value: 'bid' },
      { label: t('category_Unclaimed'), value: 'unclaimed' }
    ],
    [t]
  );

  const { library, account, chainId } = useActiveWeb3React(landId);

  const history = useHistory();

  const [filter, setFilter] = useState<GetApostlesFilterType>((search.get('filter') as GetApostlesFilterType) || 'my');
  const [order, setOrder] = useState<GetApostlesOrderType>((search.get('order') as GetApostlesOrderType) || 'asc');
  const [orderField, setOrderField] = useState<GetApostlesOrderFieldType>((search.get('orderfield') as GetApostlesOrderFieldType) || 'time');

  const [pageSize, setPageSize] = useState<number>(parseInt(search.get('pagesize')) || MARKET_LIST_PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState<number>(parseInt(search.get('page')) || 1);
  const { data: apostleList, isLoading } = useGetApostlesList({
    display: 'my',
    owner: account,
    filter,
    order,
    orderField,
    district: landId,
    page: currentPage - 1,
    row: pageSize,
    landId,
    element: search.get(FILTER_RESOURCES) ? (search.get(FILTER_RESOURCES).split(',') as Element[]) : [],
    occupational: search.has(FILTER_PROFESSION) ? search.get(FILTER_PROFESSION).split(',') : [],
    gensStart: search.get(FILTER_GENS_START) || undefined,
    gensEnd: search.get(FILTER_GENS_END) || undefined
  });

  const navigateToApostle = useCallback(
    (tokenId: string) => {
      if (tokenId) {
        navigateToDetail(history, landId, 'apostle', tokenId, true);
      }
    },
    [history, landId]
  );

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
      {/* <PopupHeader title='My Apostle' /> */}
      <Flex flex='1' height='100%' overflow='hidden'>
        <ApostleFilter asyncSearch module={{ resources: true, gens: true, professions: true }} />
        <StyledScrollY>
          <MineApostleSortFilter categoryOptions={categoryOptions} onChangeCategoryFilter={onChangeFilter} categoryValue={filter} orderFieldValue={orderField} onChangeOrderField={onChangeOrderField} orderValue={order} onChangeOrder={onChangeOrder} />
          {isLoading ? (
            <Flex flex='1' height='450px' alignItems='center' justifyContent='center'>
              <Spinner size={128} />
            </Flex>
          ) : apostleList && apostleList.data && !!apostleList.data.length ? (
            <div>
              <StyledNftBoxList>
                {apostleList?.data?.map((apostle, index) => {
                  const status = [];
                  apostle?.working_status === 'working' && status.push('apostle-mining');

                  const { cold_down_end: coldDownEnd } = apostle;

                  if (coldDownEnd && coldDownEnd > 0 && apostle?.apostle_status === 'fresh') {
                    status.push('apostle-breed');
                  }

                  return (
                    <div key={index}>
                      <ApostleBox className='LandMarket--landBox' number={`${apostle.token_index}`} subtitle={`${t('Gen')}: ${apostle.gen}`} imageUrl={apostle.apostle_picture || IMG_APOSTLE_EGG_GIF} imageOnClick={() => navigateToApostle(apostle.token_id)} status={status} footerNode={<ApostleStatus status={apostle.apostle_status} landId={landId} data={apostle} />} hasTooltip={!!apostle.token_id} apostle={apostle} />
                    </div>
                  );
                })}
              </StyledNftBoxList>
            </div>
          ) : (
            <EmptyView buttonText={t('Buy Apostle')} link={`/land/${landId}/market/apostle`} />
          )}
          <Flex justifyContent='center' my={4}>
            <Pagination current={currentPage} onChange={onChangePage} pageSize={pageSize} total={apostleList?.count} />
          </Flex>
        </StyledScrollY>
      </Flex>
    </StyledPaneBox>
  );
};

export default React.memo<Props>(MyApostle);
