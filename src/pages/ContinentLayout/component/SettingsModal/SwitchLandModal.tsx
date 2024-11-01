// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { Button, ModalProps, Flex, Box, Text } from 'components';
import { History } from 'history';
import { useTranslation } from 'react-i18next';
import styled, { useTheme } from 'styled-components';
import getThemeValue from 'utils/getThemeValue';
import { ModalBody, ModalCloseButton, ModalContainer, ModalHeader, ModalTitle } from 'components/Modal';
import { env } from 'config';

interface Props extends ModalProps {
  history: History;
}

const WalletWrapper = styled(Box)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
`;

const SwitchLandModal: React.FC<Props> = ({ onDismiss = () => null }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <ModalContainer minWidth='320px'>
      <ModalHeader background={getThemeValue('colors.gradients.bubblegum')(theme)}>
        <ModalTitle>
          <p>{t('Choose a continent')}</p>
        </ModalTitle>
        <ModalCloseButton onDismiss={onDismiss} />
      </ModalHeader>
      <ModalBody width={['320px', null, '340px']}>
        <WalletWrapper p='24px' maxHeight='453px' overflowY='auto'>
          <Flex className='space-y-3' flexDirection='column'>
            <Button as='a' variant='secondary' scale='sm' href='/land/1/my/token'>
              {env[1].NAME} ({env[1].RPC_INFO.chainName})
            </Button>

            <Button as='a' variant='secondary' scale='sm' href='/land/2/my/token'>
              {env[2].NAME} ({env[2].RPC_INFO.chainName})
            </Button>

            <Button as='a' variant='secondary' scale='sm' href='/land/3/my/token'>
              {env[3].NAME} ({env[3].RPC_INFO.chainName})
            </Button>

            <Button as='a' variant='secondary' scale='sm' href='/land/4/my/token'>
              {env[4].NAME} ({env[4].RPC_INFO.chainName})
            </Button>

            <Button as='a' variant='secondary' scale='sm' href='/land/5/my/token'>
              {env[5].NAME} ({env[5].RPC_INFO.chainName})
            </Button>
          </Flex>
        </WalletWrapper>
        <Box p='24px'>
          <Text textAlign='center' color='textSubtle' as='p' mb='16px'>
            {t('Haven’t got a tutorial yet?')}
          </Text>
          <Button as='a' target='_blank' rel='noopener noreferrer' href='https://docs.evolution.land/getting-started/choose-start-continent' variant='subtle' width='100%'>
            {t('How to Choose')}
          </Button>
        </Box>
      </ModalBody>
    </ModalContainer>
  );
};

export default SwitchLandModal;
