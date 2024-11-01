// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Flex, Spinner, ApostleBox, Pagination, ModalProps, Modal } from 'components';
import { CheckboxOptionType } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';
import { useGetApostlesList, GetApostlesFilterType, GetApostlesOrderType, GetApostlesOrderFieldType, GetApostlesListRequest, Apostle } from 'hooks/backendApi';
import { ApostleFilter } from 'components/Filter';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { Location } from 'history';
import noop from 'lodash/noop';
import type { Element, SUPPORTED_LANDS_INDEX } from 'types';
import { StyledNftBoxList, StyledScrollY } from 'ui/styled';
import { MineApostleSortFilter } from '../Sort';
import { ApostleStatus } from '../Status';

interface Props extends ModalProps {
  data?: unknown;
  className?: string;
  landId: SUPPORTED_LANDS_INDEX;
  fetchApstoleParams?: Partial<GetApostlesListRequest>;
  initFilter?: GetApostlesFilterType;
  initOrder?: GetApostlesOrderType;
  initOrderField?: GetApostlesOrderFieldType;
  categoryOptions?: CheckboxOptionType[];
  apostleSelected?: (tokenId: string, apostle: Apostle) => void;
}

const MyApostle: React.FC<Props> = ({ className, title, landId, onDismiss, fetchApstoleParams, initFilter = 'my', initOrder = 'desc', initOrderField = 'time', categoryOptions, apostleSelected = noop, ...props }) => {
  const { library, account, chainId } = useActiveWeb3React(landId);

  const history = useHistory();
  const { i18n, t } = useTranslation();

  const [filter, setFilter] = useState<GetApostlesFilterType>(initFilter);
  const [order, setOrder] = useState<GetApostlesOrderType>(initOrder);
  const [orderField, setOrderField] = useState<GetApostlesOrderFieldType>(initOrderField);

  const [pageSize, setPageSize] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [resources, setResources] = useState<Element[]>([]);
  const [gens, setGens] = useState<number[]>([]);

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
    element: resources,
    gensStart: gens[0]?.toString(),
    gensEnd: gens[1]?.toString(),
    ...fetchApstoleParams
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

  const onChangeResource = (value) => {
    setResources(value);
  };

  const onChangeGens = (value) => {
    setGens(value);
  };

  return (
    <Modal className={className} title={title} bodyPadding='0' onDismiss={onDismiss} {...props}>
      <Router>
        <Flex flex='1' height='100%' overflow='hidden'>
          <ApostleFilter module={{ resources: true, gens: true }} onChangeResources={onChangeResource} onChangeGens={onChangeGens} />
          <StyledScrollY>
            <MineApostleSortFilter categoryOptions={categoryOptions} onChangeCategoryFilter={onChangeFilter} categoryValue={filter} orderFieldValue={orderField} onChangeOrderField={onChangeOrderField} orderValue={order} onChangeOrder={onChangeOrder} />
            {isLoading ? (
              <Flex flex='1' height='450px' alignItems='center' justifyContent='center'>
                <Spinner size={128} />
              </Flex>
            ) : (
              <div>
                <StyledNftBoxList>
                  {apostleList?.data?.map((apostle, index) => (
                    <div key={index}>
                      <ApostleBox
                        className='LandMarket--landBox'
                        number={`${apostle.token_index}`}
                        subtitle={`${t('Gen')}: ${apostle.gen}`}
                        imageUrl={apostle.apostle_picture}
                        footerNode={<ApostleStatus status={apostle.apostle_status} landId={landId} data={apostle} />}
                        imageOnClick={() => {
                          onDismiss();
                          apostleSelected(apostle.token_id, apostle);
                        }}
                        hasTooltip
                        apostle={apostle}
                      />
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
                total={apostleList?.count}
              />
            </Flex>
          </StyledScrollY>
        </Flex>
      </Router>
    </Modal>
  );
};

export default React.memo<Props>(styled(MyApostle)`
  display: flex;
  flex-direction: column;

  .LandMarket--landBox {
    width: 180px;
  }
`);
