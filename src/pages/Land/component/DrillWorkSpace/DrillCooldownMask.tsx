// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import { LockerIcon, Text } from 'components';
import { BareProps } from 'components/types';
import dayjs from 'dayjs';
import { relativeTime } from 'utils/time';
import { useDrillInCooldown } from 'hooks/useDrill';

export interface Props extends BareProps {
  equipTime?: number; // in second
  formulaId: number;
  small?: boolean;
}

const StyledDrillCooldownMask = styled.div`
  align-items: center;
  position: relative;
`;

const StyledMask = styled.div`
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  position: absolute;
  top: 0;
  width: 100%;
`;

const DrillCooldownMask: React.FC<Props> = ({ className, equipTime, formulaId, small, children }) => {
  const now = dayjs();
  const { protectionPeriodEndTime, isInCooldown } = useDrillInCooldown(equipTime, formulaId);

  if (!isInCooldown) {
    return <>{children}</>;
  }

  return (
    <StyledDrillCooldownMask className={className}>
      {children}
      <StyledMask>
        <LockerIcon width={small ? 20 : 40} height={small ? 20 : 40} />
        <Text small bold>
          {relativeTime(protectionPeriodEndTime.subtract(now.unix(), 'second'))}
        </Text>
      </StyledMask>
    </StyledDrillCooldownMask>
  );
};

export default DrillCooldownMask;
