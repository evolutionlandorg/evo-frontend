// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Flex, Spinner, Pagination, ModalProps, Modal } from 'components';
import { CheckboxOptionType } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useGetDrillList, GetDrillFilterType, GetDrillOrderType, GetDrillFormulaIdType, GetDrillClassType } from 'hooks/backendApi';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import noop from 'lodash/noop';
import { StyledScrollY, StyledNftBoxList } from 'ui/styled';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { MarketApostleSortFilter } from '../Sort';
import { getDrillImage } from '../../utils';
import { IllustratedBox } from '../IllustratedBox';

interface Props extends ModalProps {
  data?: unknown;
  className?: string;
  landId: SUPPORTED_LANDS_INDEX;
  formulaId?: GetDrillFormulaIdType;
  categoryOptions?: CheckboxOptionType[];
  initFilter?: GetDrillFilterType;
  drillSelected?: (tokenId: string, formulaId: number, onDismiss: any) => void | Promise<void>;
  drillClass?: GetDrillClassType[];
}

const FilterDrillModal: React.FC<Props> = ({ className, title, initFilter, landId, onDismiss, categoryOptions, drillSelected = noop, drillClass, formulaId, ...props }) => {
  const { account } = useActiveWeb3React(landId);

  const [filter, setFilter] = useState<GetDrillFilterType>(initFilter);
  const [order, setOrder] = useState<GetDrillOrderType>('desc');

  const [pageSize, setPageSize] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data: drillList, isLoading } = useGetDrillList({
    landId,
    address: account,
    page: currentPage - 1,
    row: pageSize,
    filter,
    order,
    formulaId,
    drillClass
  });

  const onChangeFilter = (e) => {
    setCurrentPage(1);
    setFilter(e.target.value);
  };

  const onChangeOrder = (value) => {
    setCurrentPage(1);
    setOrder(value);
  };

  return (
    <Modal className={className} title={title} bodyPadding='0' onDismiss={onDismiss} {...props}>
      <Flex flex='1' height='100%' overflow='hidden'>
        <StyledScrollY>
          <MarketApostleSortFilter categoryOptions={categoryOptions} onChangeCategoryFilter={onChangeFilter} categoryValue={filter} orderValue={order} onChangeOrder={onChangeOrder} />
          {isLoading ? (
            <Flex flex='1' height='450px' alignItems='center' justifyContent='center'>
              <Spinner size={128} />
            </Flex>
          ) : (
            <div>
              <StyledNftBoxList>
                {drillList?.data?.map((drill, index) => (
                  <div className='MyDrill-item' key={index}>
                    <IllustratedBox
                      className='MyDrill--landBox'
                      landId={landId}
                      formulaId={drill.formula_id}
                      subtitle=''
                      imageUrl={getDrillImage(drill.class, drill.grade)}
                      imageOnClick={() => {
                        // onDismiss();
                        drillSelected(drill.token_id, drill.formula_id, onDismiss);
                      }}
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
              total={drillList?.count}
            />
          </Flex>
        </StyledScrollY>
      </Flex>
    </Modal>
  );
};

export default React.memo<Props>(styled(FilterDrillModal)`
  display: flex;
  flex-direction: column;

  .MyDrill--landBox {
    width: 180px;
  }
`);
