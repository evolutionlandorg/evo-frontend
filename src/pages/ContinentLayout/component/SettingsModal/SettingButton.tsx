// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { Flex, IconButton, CogIcon, useModal } from 'components';
import { useTranslation } from 'react-i18next';
import SettingsModal from './SettingsModal';

type Props = {
  color?: string;
  mr?: string;
};

const SettingButton = ({ color, mr = '8px' }: Props) => {
  const { t } = useTranslation();
  const [onPresentSettingsModal] = useModal(<SettingsModal title={t('Setting')} />);

  return (
    <Flex>
      <IconButton onClick={onPresentSettingsModal} variant='text' scale='sm' mr={mr} id='open-settings-dialog-button'>
        <CogIcon height={24} width={24} color={color || 'textSubtle'} />
      </IconButton>
    </Flex>
  );
};

export default SettingButton;
