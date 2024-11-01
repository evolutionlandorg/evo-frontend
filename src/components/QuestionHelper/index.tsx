// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { useTooltip } from 'hooks/useTooltip';
import type { Placement } from 'hooks/useTooltip';
import styled from 'styled-components';
import { HelpIcon } from '../Svg';
import { Box, BoxProps } from '../Box';

interface Props extends BoxProps {
  text: string | React.ReactNode;
  placement?: Placement;
  size?: string;
}

const QuestionWrapper = styled.div`
  :hover,
  :focus {
    opacity: 0.7;
  }
`;

export const QuestionHelper: React.FC<Props> = ({ text, placement = 'auto', size = '16px', ...props }) => {
  const { targetRef, tooltip, tooltipVisible } = useTooltip(text, { placement, trigger: 'hover' });

  return (
    <Box {...props}>
      {tooltipVisible && tooltip}
      <QuestionWrapper ref={targetRef}>
        <HelpIcon color='textSubtle' width={size} />
      </QuestionWrapper>
    </Box>
  );
};
