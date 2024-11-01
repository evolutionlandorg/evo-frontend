// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { DrillBox, DrillBoxMini } from 'components';
import { useIllustratedList } from 'store/illustrated/hooks';
import { DrillBoxProps } from 'components/NFTBox/types';
import { useTranslation } from 'react-i18next';
import { getIllustratedById, getDrillImage } from '../../utils';

export interface Props extends Partial<DrillBoxProps> {
  formulaId: number;
  mini?: boolean;
  landId: SUPPORTED_LANDS_INDEX;
  boxSize?: number;
}

const IllustratedBox: React.FC<Props> = ({ className, formulaId, mini, landId, boxSize, footerNode, ...rest }) => {
  const [illustratedList, fetchIllustratedList] = useIllustratedList();
  const { t } = useTranslation();

  const illustrated = getIllustratedById(illustratedList, formulaId);
  if (!illustrated) {
    return null;
  }
  return mini ? <DrillBoxMini boxSize={boxSize} className={className} title={t(`${illustrated.name}`)} subtitle='' imageUrl={getDrillImage(illustrated.class, illustrated.grade)} footerNode={footerNode} {...rest} /> : <DrillBox className={className} title={t(`${illustrated.name}`)} subtitle='' imageUrl={getDrillImage(illustrated.class, illustrated.grade)} footerNode={footerNode} {...rest} />;
};

export default IllustratedBox;
