// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useEffect, useState } from 'react';
import { Modal, Button, useModal, ModalProps, Flex, Box, Text } from 'components';
import styled from 'styled-components';
import useTheme from 'hooks/useTheme';
import { useTranslation } from 'react-i18next';
import ThemeSwitcher from '../ThemeSwitcher';
import LanguageSelect from './LanguageSelect';

const ScrollableContainer = styled(Flex)`
  flex-direction: column;
  max-height: 400px;
  ${({ theme }) => theme.mediaQueries.sm} {
    max-height: none;
  }
`;

const SettingsModal: React.FC<ModalProps> = ({ title, onDismiss, ...props }) => {
  const { theme, isDark, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <Modal title={title} onDismiss={onDismiss} {...props}>
      <ScrollableContainer>
        <Flex pb='24px' flexDirection='column'>
          <Text bold textTransform='uppercase' fontSize='12px' fontWeight='bold' color='secondary' mb='24px'>
            {t('Global')}
          </Text>
          {/* <Flex justifyContent='space-between'>
            <Text mb='20px'>Dark mode</Text>
            <ThemeSwitcher isDark={isDark} toggleTheme={toggleTheme} />
          </Flex> */}
          <Flex justifyContent='space-between'>
            <Text mb='20px'>{t('Language')}</Text>
            <LanguageSelect />
          </Flex>
        </Flex>
      </ScrollableContainer>
    </Modal>
  );
};

export default React.memo<ModalProps>(styled(SettingsModal)``);
