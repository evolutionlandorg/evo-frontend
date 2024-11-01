// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Flex, Spinner, Pagination, EmptyView, Text } from 'components';
import React, { useCallback, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useGetDrillList, GetDrillFilterType, GetDrillOrderType } from 'hooks/backendApi';
import { navigateToDetail } from 'api/utils';
import { ApostleFilter } from 'components/Filter';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useCurrentLand } from 'hooks/useRouterParams';
import { StyledPaneBox, StyledNftBoxList, StyledScrollY } from 'ui/styled';
import { MARKET_LIST_PAGE_SIZE } from 'config/constants';
import { NFTStatus } from 'components/NFTBox/types';
import { useQuery } from 'hooks/useSearch';
import { IllustratedBox, MarketApostleSortFilter } from './component';
import { getDrillImage } from './utils';

interface Props {
  data?: unknown;
  className?: string;
}

const MyDrill: React.FC<Props> = (props) => {
  const { className } = props;
  const { i18n, t } = useTranslation();

  const categoryOptions = useMemo(
    () => [
      { label: t('category_All'), value: '' },
      { label: t('category_Idle'), value: 'fresh' },
      { label: t('category_Working'), value: 'working' }
    ],
    [t]
  );

  const history = useHistory();
  const landId = useCurrentLand();
  const search = useQuery();
  const { url } = useRouteMatch();
  const { account } = useActiveWeb3React(landId);

  const [filter, setFilter] = useState<GetDrillFilterType>('');
  const [order, setOrder] = useState<GetDrillOrderType | ''>(search.get('order') ? (search.get('order') as GetDrillOrderType) : '');

  const [pageSize, setPageSize] = useState<number>(MARKET_LIST_PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState<number>(parseInt(search.get('page')) || 1);

  const { data: drillList, isLoading } = useGetDrillList({
    landId,
    address: account,
    page: currentPage - 1,
    row: pageSize,
    filter,
    order
  });

  const navigateToDrill = useCallback(
    (tokenId: string) => {
      navigateToDetail(history, landId, 'drill', tokenId, true);
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

  const onChangePage = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);

    search.set('pagesize', size);
    search.set('page', page);
    history.push({ pathname: url, search: `?${search}` });
  };

  return (
    <StyledPaneBox className={className}>
      <Flex flex='1' height='100%' overflow='hidden'>
        <ApostleFilter />
        <StyledScrollY>
          <MarketApostleSortFilter categoryOptions={categoryOptions} onChangeCategoryFilter={onChangeFilter} categoryValue={filter} orderValue={order} onChangeOrder={onChangeOrder} />
          {isLoading ? (
            <Flex flex='1' height='450px' alignItems='center' justifyContent='center'>
              <Spinner size={128} />
            </Flex>
          ) : drillList && drillList.data && !!drillList.data.length ? (
            <div>
              <StyledNftBoxList>
                {drillList.data.map((drill, index) => {
                  const status: NFTStatus[] = [];
                  drill?.land_equip && status.push('land-drillworking');

                  return (
                    <div key={index}>
                      <IllustratedBox
                        landId={landId}
                        formulaId={drill.formula_id}
                        subtitle=''
                        imageUrl={getDrillImage(drill.class, drill.grade)}
                        imageOnClick={() => navigateToDrill(drill.token_id)}
                        status={status}
                        footerNode={
                          <Text small bold>
                            {drill?.land_equip ? t('Working') : t('Fresh')}
                          </Text>
                        }
                      />
                    </div>
                  );
                })}
              </StyledNftBoxList>
            </div>
          ) : (
            <EmptyView />
          )}
          <Flex justifyContent='center' my={4}>
            <Pagination current={currentPage} onChange={onChangePage} pageSize={pageSize} total={drillList?.count} />
          </Flex>
        </StyledScrollY>
      </Flex>
    </StyledPaneBox>
  );
};

export default React.memo<Props>(MyDrill);
