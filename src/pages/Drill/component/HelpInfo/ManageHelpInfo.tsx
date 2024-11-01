// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { BareProps } from 'components/types';
import { LinkExternal } from 'components';
import { useTranslation } from 'react-i18next';

const ManageHelpInfo: React.FC<BareProps> = () => {
  const { t } = useTranslation();

  return (
    <>
      {t('A Drill can be set on the prop slot of a piece of land and used for mining a single resource. Unlike Apostles, Drills cannot obtain resources by themselves; they rely on Apostles who then obtain a bonus income.')}
      <LinkExternal href='https://docs.evolution.land/advanced/furnace'> Docs </LinkExternal>
    </>
  );
};

export default ManageHelpInfo;
