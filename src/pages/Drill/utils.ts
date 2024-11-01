// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Illustrated } from 'hooks/backendApi';

export const gegoIds = [4, 8, 256];

// drillClass: 阶, drillGrade: 级
export const getDrillImage = (drillClass, drillGrade, type: 'png' | 'gif' = 'png') => `/images/drill/class${drillClass}/lv${drillGrade}.${type}`;

export const getDrillEfficiencyText = (illustrated: Illustrated) => ({
  mining: `Mining Efficiency +${illustrated.productivity[0]}%`,
  miningSpecific: `Mining Efficiency +${illustrated.productivity[1]}%`,
  protection: `Initial Protection +${illustrated.protection_period} days`
});

export function getIllustratedById(list: Illustrated[], formulaId: number) {
  const result = list?.filter((illustrated) => illustrated.id === formulaId);

  if (result?.length > 0) {
    return result[0];
  }

  return null;
}
