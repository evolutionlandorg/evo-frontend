// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Flex, Spinner, LandBox, Pagination, ModalProps, Modal, LandFilter } from 'components';
import { useApi } from 'hooks/useApi';
import { CheckboxOptionType } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';
import { GetLandsFilterType, GetLandsOrderType, GetLandsOrderFieldType, useGetLandsList, GetLandsListRequest } from 'hooks/backendApi';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { ContinentDistrictEnum } from 'config/continents';
import { Location } from 'history';
import noop from 'lodash/noop';
import { StyledNftBoxList, StyledScrollY } from 'ui/styled';
import SortFilter from '../Sort';

interface Props extends ModalProps {
  data?: unknown;
  className?: string;
  landId: ContinentDistrictEnum;
  location: Location;
  fetchLandParams?: Partial<GetLandsListRequest>;
  initFilter?: GetLandsFilterType;
  initOrder?: GetLandsOrderType;
  initOrderField?: GetLandsOrderFieldType;
  categoryOptions?: CheckboxOptionType[];
  landSelected?: (tokenId: string) => void;
}

const MyLand: React.FC<Props> = ({ className, title, landId, onDismiss, location, fetchLandParams, initFilter = 'my', initOrder = 'asc', initOrderField = 'price', categoryOptions, landSelected = noop, ...props }) => {
  const { library, account, chainId } = useActiveWeb3React(landId);
  const [filter, setFilter] = useState<GetLandsFilterType>(initFilter);
  const [order, setOrder] = useState<GetLandsOrderType>(initOrder);
  const [orderField, setOrderField] = useState<GetLandsOrderFieldType>(initOrderField);

  const api = useApi();

  const { i18n, t } = useTranslation();

  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

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
    element: [],
    flag: []
  });

  const onChangeFilter = (e) => {
    setCurrentPage(1);
    setFilter(e.target.value);
  };

  const onChangeOrder = (value) => {
    setCurrentPage(1);
    setOrder(value);
  };

  const onChangeOrderField = (value) => {
    setCurrentPage(1);
    setOrderField(value);
  };

  return (
    <Modal className={className} title={title} bodyPadding='0' onDismiss={onDismiss} {...props}>
      <Router>
        <Flex flex='1' height='100%' overflow='hidden'>
          <LandFilter module={{ resources: true, flag: true }} />
          <StyledScrollY>
            <SortFilter categoryOptions={categoryOptions} onChangeCategoryFilter={onChangeFilter} categoryValue={filter} orderFieldValue={orderField} onChangeOrderField={onChangeOrderField} orderValue={order} onChangeOrder={onChangeOrder} />
            {isLoading ? (
              <Flex flex='1' height='450px' alignItems='center' justifyContent='center'>
                <Spinner size={128} />
              </Flex>
            ) : (
              <div>
                <StyledNftBoxList>
                  {landList?.data?.map((land, index) => (
                    <div key={land.land_id}>
                      <LandBox className='LandMarket--landBox' number={`${land.land_id}`} subtitle='37,-123' imageUrl={api.utils.landSticker(land.gx, land.gy, landId)} imageOnClick={() => landSelected(land.token_id)} />
                    </div>
                  ))}
                </StyledNftBoxList>
              </div>
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
      </Router>
    </Modal>
  );
};

export default React.memo<Props>(styled(MyLand)`
  display: flex;
  flex-direction: column;

  .LandMarket--landBox {
    width: 180px;
  }
`);
