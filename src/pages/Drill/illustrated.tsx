// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { PopupWindow, PopupHeader } from 'components/PopupWindow';
import { Flex, Spinner, DrillBox } from 'components';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useGetIllustratedList } from 'hooks/backendApi';
import { useCurrentLand } from 'hooks/useRouterParams';
import { TotalStatus } from './component';
import { getDrillImage } from './utils';

interface Props {
  data?: unknown;
  className?: string;
}

const ScrollY = styled(Flex)`
  height: 100%;
  overflow-y: auto;
`;

const Illustrated: React.FC<Props> = (props) => {
  const { className } = props;
  const { i18n, t } = useTranslation();
  const landId = useCurrentLand();

  const [pageSize, setPageSize] = useState<number>(20);
  const { data: drillList, isLoading } = useGetIllustratedList({
    landId
    // row: pageSize
  });

  return (
    <PopupWindow className={className}>
      <PopupHeader title='Drill Map' />
      <Flex flex='1' height='100%' overflow='hidden'>
        <ScrollY flexDirection='column' flex='1'>
          {isLoading ? (
            <Flex flex='1' height='450px' alignItems='center' justifyContent='center'>
              <Spinner size={128} />
            </Flex>
          ) : (
            <div>
              <div className='Illustrated-items'>
                {drillList?.data?.map((drill, index) => (
                  <div className='Illustrated-item' key={index}>
                    <DrillBox className='Illustrated--landBox' title={`${drill.id}`} subtitle='' imageUrl={getDrillImage(drill.class, drill.grade, 'gif')} footerNode={<TotalStatus data={drill.issued} />} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </ScrollY>
      </Flex>
    </PopupWindow>
  );
};

export default React.memo<Props>(styled(Illustrated)`
  display: flex;
  flex-direction: column;

  .Illustrated-items {
    ${tw`mt-2 mb-8 overflow-y-auto grid grid-cols-5 content-start items-stretch gap-y-4 flex-1`}
  }

  .Illustrated--landBox {
    width: 180px;
  }

  .Illustrated-item {
    ${tw`flex justify-center`}
  }
`);
