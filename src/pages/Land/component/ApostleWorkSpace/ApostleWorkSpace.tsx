// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback } from 'react';
import { BareProps } from 'components/types';
import { Flex } from 'components';
import type { Apostle } from 'hooks/backendApi/types';
import { History } from 'history';
import ApostleSlot from './ApostleSlot';

export interface Props extends BareProps {
  apostleList: Apostle[];
  landTokenId: string;
  isOwner?: boolean;
  operation?: boolean;
  boxSize?: number;
  history: History;
}

const ApostleWorkSpace: React.FC<Props> = ({ className, apostleList, landTokenId, isOwner, operation, boxSize, history }) => {
  const showFooter = isOwner && operation;

  return (
    <Flex className={className} justifyContent='space-between' alignItems='stretch' overflowX='auto'>
      <ApostleSlot boxSize={boxSize} apostle={apostleList[0]} landTokenId={landTokenId} showFooter={showFooter} slotIndex='0' history={history} />
      <ApostleSlot boxSize={boxSize} apostle={apostleList[1]} landTokenId={landTokenId} showFooter={showFooter} slotIndex='1' history={history} />
      <ApostleSlot boxSize={boxSize} apostle={apostleList[2]} landTokenId={landTokenId} showFooter={showFooter} slotIndex='2' history={history} />
      <ApostleSlot boxSize={boxSize} apostle={apostleList[3]} landTokenId={landTokenId} showFooter={showFooter} slotIndex='3' history={history} />
      <ApostleSlot boxSize={boxSize} apostle={apostleList[4]} landTokenId={landTokenId} showFooter={showFooter} slotIndex='4' history={history} />
    </Flex>
  );
};

export default React.memo<Props>(ApostleWorkSpace);
