// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { BareProps } from 'components/types';
import { Flex } from 'components';
import type { DrillLandEquip } from 'hooks/backendApi/types';
import { History } from 'history';
import DrillSlot from './DrillSlot';

export interface Props extends BareProps {
  drillList: DrillLandEquip[];
  landTokenId: string;
  isLandOwner?: boolean;
  operation?: boolean;
  boxSize?: number;
  history: History;
}

const DrillWorkSpace: React.FC<Props> = ({ className, drillList, landTokenId, isLandOwner, operation, boxSize, history }) => {
  const showFooter = operation;

  return (
    <Flex className={className} justifyContent='space-between' alignItems='stretch' overflowX='auto'>
      <DrillSlot isLandOwner={isLandOwner} boxSize={boxSize} drill={drillList.find((o) => o.index === 0)} landTokenId={landTokenId} showFooter={showFooter} slotIndex={0} history={history} />
      <DrillSlot isLandOwner={isLandOwner} boxSize={boxSize} drill={drillList.find((o) => o.index === 1)} landTokenId={landTokenId} showFooter={showFooter} slotIndex={1} history={history} />
      <DrillSlot isLandOwner={isLandOwner} boxSize={boxSize} drill={drillList.find((o) => o.index === 2)} landTokenId={landTokenId} showFooter={showFooter} slotIndex={2} history={history} />
      <DrillSlot isLandOwner={isLandOwner} boxSize={boxSize} drill={drillList.find((o) => o.index === 3)} landTokenId={landTokenId} showFooter={showFooter} slotIndex={3} history={history} />
      <DrillSlot isLandOwner={isLandOwner} boxSize={boxSize} drill={drillList.find((o) => o.index === 4)} landTokenId={landTokenId} showFooter={showFooter} slotIndex={4} history={history} />
    </Flex>
  );
};

export default React.memo<Props>(DrillWorkSpace);
