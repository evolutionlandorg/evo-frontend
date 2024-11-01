// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Flex, Spinner, ApostleBox, Pagination, EmptyView } from 'components';
import React, { useCallback, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { useGetApostlesList, GetApostlesFilterType, GetApostlesOrderType, GetApostlesOrderFieldType } from 'hooks/backendApi';
import { navigateToDetail } from 'api/utils';
import { ApostleFilter } from 'components/Filter';
import { ContinentDistrictEnum } from 'config/continents';
import { useQuery } from 'hooks/useSearch';
import type { Element } from 'types';
import { FILTER_PRICE_START, FILTER_PRICE_END, FILTER_RESOURCES, FILTER_GENS_START, FILTER_GENS_END, FILTER_PROFESSION } from 'components/Filter/Apostle/filter';
import { StyledPaneBox, StyledNftBoxList, StyledScrollY } from 'ui/styled';
import { IMG_APOSTLE_EGG_GIF, MARKET_LIST_PAGE_SIZE } from 'config/constants';
import { MarketApostleSortFilter, ApostleStatusReadonly } from './component';

interface Props {
  data?: unknown;
  className?: string;
}

interface RouterParams {
  landId: ContinentDistrictEnum;
}

const Apostle: React.FC<Props> = (props) => {
  const { className } = props;
  const { t } = useTranslation();
  const history = useHistory();
  const search = useQuery();
  const { url } = useRouteMatch();
  const categoryOptions = useMemo(
    () => [
      { label: t('category_All'), value: '' },
      { label: t('category_On Sale'), value: 'onsell' },
      { label: t('category_For Breed'), value: 'fertility' },
      { label: t('category_Recruit'), value: 'rent' }
    ],
    [t]
  );

  const { landId } = useParams<RouterParams>();

  const [filter, setFilter] = useState<GetApostlesFilterType>((search.get('filter') as GetApostlesFilterType) === null ? 'onsell' : (search.get('filter') as GetApostlesFilterType));
  const [order, setOrder] = useState<GetApostlesOrderType>((search.get('order') as GetApostlesOrderType) || 'asc');
  const [orderField, setOrderField] = useState<GetApostlesOrderFieldType>((search.get('orderfield') as GetApostlesOrderFieldType) || 'price');

  const [pageSize, setPageSize] = useState<number>(parseInt(search.get('pagesize')) || MARKET_LIST_PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState<number>(parseInt(search.get('page')) || 1);
  const { data: apostleList, isLoading } = useGetApostlesList({
    landId,
    display: 'all',
    filter,
    order,
    orderField,
    district: landId,
    page: currentPage - 1,
    row: pageSize,
    element: search.get(FILTER_RESOURCES) ? (search.get(FILTER_RESOURCES).split(',') as Element[]) : [],
    priceStart: search.get(FILTER_PRICE_START) || undefined,
    priceEnd: search.get(FILTER_PRICE_END) || undefined,
    gensStart: search.get(FILTER_GENS_START) || undefined,
    occupational: search.has(FILTER_PROFESSION) ? search.get(FILTER_PROFESSION).split(',') : [],
    gensEnd: search.get(FILTER_GENS_END) || undefined
  });

  const navigateToApostle = useCallback(
    (tokenId: string) => {
      navigateToDetail(history, landId, 'apostle', tokenId);
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
      {/* <PopupHeader title='Apostle Market' color='backgroundPink' /> */}
      <Flex flex='1' height='100%' overflow='hidden'>
        <ApostleFilter asyncSearch module={{ resources: true, gens: true, price: true, professions: true }} />
        <StyledScrollY>
          <MarketApostleSortFilter categoryOptions={categoryOptions} onChangeCategoryFilter={onChangeFilter} categoryValue={filter} orderFieldValue={orderField} onChangeOrderField={onChangeOrderField} orderValue={order} onChangeOrder={onChangeOrder} />
          {isLoading ? (
            <Flex flex='1' height='450px' alignItems='center' justifyContent='center'>
              <Spinner size={128} />
            </Flex>
          ) : apostleList && apostleList.data && !!apostleList.data.length ? (
            <div>
              <StyledNftBoxList>
                {apostleList?.data?.map((apostle, index) => (
                  <div key={index}>
                    <ApostleBox className='ApostleMarket--landBox' number={`${apostle.token_index}`} subtitle={`${t('Gen')}: ${apostle.gen}`} imageUrl={apostle.apostle_picture || IMG_APOSTLE_EGG_GIF} imageOnClick={() => navigateToApostle(apostle.token_id)} footerNode={<ApostleStatusReadonly landId={landId} data={apostle} status={apostle.apostle_status} />} hasTooltip apostle={apostle} />
                  </div>
                ))}
              </StyledNftBoxList>
            </div>
          ) : (
            <EmptyView />
          )}
          <Flex justifyContent='center' my={4}>
            <Pagination current={currentPage} onChange={onChangePage} pageSize={pageSize} total={apostleList?.count} />
          </Flex>
        </StyledScrollY>
      </Flex>
    </StyledPaneBox>
  );
};

export default React.memo<Props>(Apostle);
