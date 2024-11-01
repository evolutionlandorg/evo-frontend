// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useState } from 'react';
import { BareProps } from 'components/types';
import useMatchBreakpoints from 'hooks/useMatchBreakpoints';
import { StyledFilterContainer, FilterIconBox } from './styled';
import { FilterIcon } from '../Svg';

export const FilterWapper: React.FC<BareProps> = ({ className, children }) => {
  const [opened, setOpened] = useState(false);
  const { isDesktop } = useMatchBreakpoints();

  const toggleFilter = useCallback(() => {
    setOpened(!opened);
  }, [opened]);

  return (
    <>
      {(opened || isDesktop) && <StyledFilterContainer className={className}>{children}</StyledFilterContainer>}
      {!isDesktop && (
        <FilterIconBox onClick={toggleFilter}>
          <FilterIcon color='textSubtle' />
        </FilterIconBox>
      )}
    </>
  );
};
