// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import { BareProps } from 'components/types';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { Text } from '../Text';
import { Flex } from '../Box';

export type Props = BareProps;

const StyledHarbergerTip = styled.div`
  align-items: left;
`;

const HarbergerTip: React.FC<Props> = ({ className }) => {
  return (
    <StyledHarbergerTip>
      <Text>If apostle is involved with work, breed or rental service, it will enter Harberger Tax Mode.</Text>
      <Text>Proceed?</Text>
      <Flex alignItems='center'>
        <Text mr='2'>What is Harberger Tax Mode?</Text>
        <Tooltip placement='topLeft' title="The life value in the Apostle's talent represents the time to survive (week / week) after entering the harberger mode. Beyond this time, the Apostle will be in a coma state, unable to carry out life activities such as childbirth and work. The master needs to price and pay a certain proportion of the harberger tax independently to maintain the Apostle's life activities. After the apostles are priced and taxed, they can be purchased at any time at a price higher than the fixed price, so the evaluation of the fixed price is particularly important." arrowPointAtCenter>
          <QuestionCircleOutlined />
        </Tooltip>
      </Flex>
    </StyledHarbergerTip>
  );
};

export default HarbergerTip;
