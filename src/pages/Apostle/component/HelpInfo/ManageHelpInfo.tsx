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
      {t('The Apostles perform various work. Their genome decides its capabilities and productivities for each type of job or occupation. Cultivating and selecting the most suitable Apostles are not just fun. It gives you a better reward financially and might help you win a battle.')}
      <LinkExternal href='https://docs.evolution.land/getting-started/game-entities/apostle/gameplay'> Docs </LinkExternal>
    </>
  );
};

export default ManageHelpInfo;
