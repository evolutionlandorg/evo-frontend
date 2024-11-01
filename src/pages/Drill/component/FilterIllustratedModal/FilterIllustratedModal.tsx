// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Flex, Spinner, ModalProps, Modal } from 'components';
import { CheckboxOptionType } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useGetIllustratedList, GetDrillFilterType, GetDrillOrderType, Illustrated } from 'hooks/backendApi';
import noop from 'lodash/noop';
import { StyledScrollY, StyledNftBoxList } from 'ui/styled';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { MarketApostleSortFilter } from '../Sort';
import { getDrillImage } from '../../utils';
import { IllustratedBox } from '../IllustratedBox';

interface Props extends ModalProps {
  className?: string;
  landId: SUPPORTED_LANDS_INDEX;
  categoryOptions?: CheckboxOptionType[];
  drillSelected?: (tokenId: string, illustrated: Illustrated) => void;
}

const FilterDrillModal: React.FC<Props> = ({ className, title, landId, onDismiss, categoryOptions, drillSelected = noop, ...props }) => {
  const { i18n, t } = useTranslation();

  const [filter, setFilter] = useState<GetDrillFilterType>('');
  const [order, setOrder] = useState<GetDrillOrderType>('desc');

  const { data: drillList, isLoading } = useGetIllustratedList({
    landId
    // row: pageSize
  });

  const onChangeFilter = (e) => {
    setFilter(e.target.value);
  };

  const onChangeOrder = (value) => {
    setOrder(value);
  };

  return (
    <Modal className={className} title={title} onDismiss={onDismiss} {...props}>
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
                {drillList?.data
                  ?.filter((item) => item.major_id)
                  ?.map((drill, index) => (
                    <div className='MyDrill-item' key={index}>
                      <IllustratedBox
                        landId={landId}
                        formulaId={drill.id}
                        className='MyDrill--landBox'
                        title={`${t(drill.name)}`}
                        subtitle=''
                        imageUrl={getDrillImage(drill.class, drill.grade)}
                        imageOnClick={() => {
                          drillSelected(drill.id, drill);
                          onDismiss();
                        }}
                      />
                    </div>
                  ))}
              </StyledNftBoxList>
            </div>
          )}
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
